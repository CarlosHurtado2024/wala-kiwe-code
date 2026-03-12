"use server";

import { createClient } from "@/utils/supabase/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const DB_SCHEMA = `
Tablas en la base de datos (PostgreSQL):

1. familias (id, codigo_familia, nombre_familia, vereda_comunidad, created_at)
2. predios (id, nombre_predio, area_hectareas, linderos)
3. comuneros (id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, tipo_documento, numero_documento, fecha_nacimiento, genero, direccion_actual, nivel_escolaridad, ocupacion, estado_civil, regimen_salud, eps, habla_nasayuwe, ha_sido_autoridad, es_autoridad_actualmente, cargo_autoridad, tiene_discapacidad, discapacidades, familia_id, parentezco_cabeza, created_at)
4. adjudicaciones (id, comunero_id, predio_id, observaciones)
5. expedientes_justicia (id, codigo_expediente, fecha_apertura, descripcion_hechos, estado, resolucion_final)
6. comuneros_implicados (comunero_id, expediente_id, rol_implicado, estado_sancion, sancion_impuesta)
7. fichas_salud (id, comunero_id, fecha_visita, diagnostico_occidental, diagnostico_tradicional, requiere_seguimiento, remedios_recetados)
8. presupuestos_sgp (id, monto_asignado, monto_ejecutado, rubro, vigencia_fiscal)
9. transacciones_sgp (id, presupuesto_id, monto, descripcion, tipo, fecha)

RELACIONES Y CLAVES FORÁNEAS:
- comuneros.familia_id -> familias.id
- El jefe de familia se identifica cuando comuneros.parentezco_cabeza = 'Cabeza de familia'
- adjudicaciones.comunero_id -> comuneros.id
- adjudicaciones.predio_id -> predios.id
- comuneros_implicados.comunero_id -> comuneros.id
- comuneros_implicados.expediente_id -> expedientes_justicia.id
- fichas_salud.comunero_id -> comuneros.id
- transacciones_sgp.presupuesto_id -> presupuestos_sgp.id

REGLAS DE NOMBRES:
- Para obtener el nombre completo: primer_nombre || ' ' || primer_apellido (o incluyendo segundo_nombre y segundo_apellido si se necesitan).
- Para buscar por nombre: primer_nombre ILIKE '%texto%' OR primer_apellido ILIKE '%texto%'.

REGLAS DE GÉNERO Y EDAD:
- La columna 'genero' contiene 'M' (masculino/hombres) o 'F' (femenino/mujeres).
- La columna 'fecha_nacimiento' es de tipo date. Para calcular edades usa: EXTRACT(YEAR FROM age(fecha_nacimiento)).

BÚSQUEDAS DE TEXTO Y LÍMITES:
- Si vas a buscar por textos como nombres, veredas, o diagnósticos, SIEMPRE usa ILIKE para ignorar mayúsculas y minúsculas (ej: primer_nombre ILIKE '%juan%').
- Para evitar sobrecargar la interfaz, si la consulta retorna múltiples filas y el usuario no especificó una cantidad, agrega un LIMIT 100.

INSTRUCCIONES PARA EL ASISTENTE (PASO 1):
- Tu objetivo es generar una consulta SQL válida de solo lectura (SELECT) para obtener los datos necesarios.
- Si el usuario pregunta "¿Cuántos...?", probablemente necesites usar un COUNT.
- PERO, si el usuario hace una pregunta de seguimiento como "¿Cuáles de esos...?", "¿Quiénes son...?", "¿Cómo se llaman...?", debes hacer un SELECT de los nombres y apellidos (y datos relevantes), NO un COUNT, para poder mostrarlos.
- Retorna ÚNICAMENTE un JSON puro, sin bloques de código markdown:
{
    "sql_query": "SELECT ...",
    "necesita_tabla": boolean // Solo true si el usuario pidió explícitamente "tabla", "lista", "cuadro" o "ver todos".
}
`;

const queryCache = new Map<string, any>(); // Caché temporal en memoria del servidor

export async function askFloatingKomi(
    question: string,
    history: { role: string; content: string }[] = []
) {
    // 1. Revisar caché para responder de forma instantánea a consultas idénticas
    const cacheKey = JSON.stringify({ question, history });
    if (queryCache.has(cacheKey)) {
        console.log("Servido desde caché de IA ⚡");
        return queryCache.get(cacheKey);
    }

    const supabase = await createClient();
    const key = process.env.GROQ_API_KEY?.trim();
    console.log("DEBUG: GROQ_API_KEY status:", key ? "Present" : "Missing");
    console.log("DEBUG: GROQ_API_KEY length:", key?.length || 0);

    if (!key) {
        console.error("DEBUG: GROQ_API_KEY is missing from environment variables.");
        return { answer: "⚠️ El módulo de IA no está configurado (Falta GROQ_API_KEY).", tableData: null, error: true };
    }

    try {
        // 2. Pre-procesar historial para darle contexto al LLM (máximo 4 mensajes para optimizar tokens)
        const recentHistory = history.slice(-4).map(h => ({
            role: h.role === "assistant" ? "assistant" : "user",
            content: h.content
        }));

        // --- PASO 1: Generar SQL ---
        console.log("DEBUG: Initiating Step 1 fetch to Groq...");
        const firstResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: DB_SCHEMA },
                    ...recentHistory,
                    { role: "user", content: `Nueva pregunta: ${question}\n\nAnaliza la pregunta actual teniendo en cuenta el contexto de la conversación, si la referencian, usa esos datos. Genera el JSON con la SQL query.` }
                ],
                temperature: 0,
                response_format: { type: "json_object" }
            })
        });

        console.log("DEBUG: Step 1 fetch completed. Status:", firstResponse.status);

        if (!firstResponse.ok) {
            const err = await firstResponse.json();
            throw new Error(`Error en Paso 1 (SQL): ${err.error?.message || firstResponse.statusText}`);
        }

        const firstData = await firstResponse.json();
        const firstContent = firstData.choices?.[0]?.message?.content || "{}";
        
        let aiAnalysis: any = {};
        try {
            const cleanedContent = firstContent.replace(/```json/g, '').replace(/```/g, '').trim();
            aiAnalysis = JSON.parse(cleanedContent);
        } catch (e) {
            console.error("Error parseando JSON del Paso 1:", firstContent);
            return { answer: "Lo siento, no pude procesar la estructura de la consulta. Por favor, intenta de nuevo.", tableData: null, error: true };
        }

        let dbResults = null;
        let dbErrorMsg = null;
        if (aiAnalysis.sql_query) {
            console.log("DEBUG: Executing SQL:", aiAnalysis.sql_query);
            const cleanSql = aiAnalysis.sql_query.replace(/;/g, '').trim();
            const { data: dbData, error: dbError } = await (supabase as any).rpc('execute_read_only_sql', { query_text: cleanSql });
            if (dbError) {
                console.error("SQL Error generado por AI:", dbError);
                dbErrorMsg = dbError.message;
            } else {
                dbResults = dbData;
            }
        }

        // --- PASO 2: Generar respuesta amigable con datos reales ---
        console.log("DEBUG: Initiating Step 2 fetch to Groq...");
        const finalResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: `Eres Komi, el asistente experto de la comunidad indígena Wala Kiwe. 
                        REGLAS DE RESPUESTA:
                        1. Sé muy amable, profesional y culturalmente respetuoso.
                        2. Usa Markdown para resaltar nombres (**Negrita**), cifras o listas.
                        3. Si el usuario pregunta por una persona específica, describe sus datos más relevantes en un párrafo o lista amigable.
                        4. Responde de forma NATURAL y conversacional basándote ÚNICAMENTE en los siguientes datos: 
                        ${dbErrorMsg ? "ERROR TÉCNICO: " + dbErrorMsg : JSON.stringify(dbResults || "No hay resultados")}
                        5. REGLA DE ORO: NUNCA uses lenguaje técnico como "count", "JSON", "array", "SQL" o "base de datos". 
                           - Si recibes \`[{"count": 0}]\` o datos vacíos, simplemente di que "Actualmente no existen registros" o "No encontré a nadie con esas características".
                           - Si recibes \`[{"count": 25}]\`, responde algo como "Actualmente contamos con 25 registros de...".
                        6. Si recibes un "ERROR TÉCNICO", discúlpate amablemente y di que hubo un pequeño inconveniente leyendo la información, sin ahondar en detalles de código.`
                    },
                    ...recentHistory,
                    { role: "user", content: question }
                ],
                temperature: 0.2
            })
        });

        if (!finalResponse.ok) {
            const err = await finalResponse.json();
            throw new Error(`Error en Paso 2 (Chat): ${err.error?.message || finalResponse.statusText}`);
        }

        const finalData = await finalResponse.json();
        const answer = finalData.choices?.[0]?.message?.content || "No pude generar una respuesta.";

        const finalOutput = {
            answer: answer,
            tableData: aiAnalysis.necesita_tabla ? dbResults : null,
            sql: aiAnalysis.sql_query || null,
            error: false
        };

        // Guardamos en el caché la respuesta en caso de que vuelvan a preguntar lo mismo en el mismo contexto
        queryCache.set(cacheKey, finalOutput);

        return finalOutput;

    } catch (e: any) {
        console.error("DEBUG: AskFloatingKomi error caught:", e);
        if (e.cause) console.error("DEBUG: Error cause:", e.cause);
        console.error("AskFloatingKomi error:", e);
        return { answer: `Ocurrió un error inesperado conectando con el asistente: ${e.message}`, tableData: null, error: true };
    }
}
