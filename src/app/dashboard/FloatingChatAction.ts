"use server";

import { createClient } from "@/utils/supabase/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const DB_SCHEMA = `
Tablas en la base de datos (PostgreSQL):

1. familias (id, codigo_familia, nombre_familia, vereda_comunidad)
2. predios (id, nombre_predio, area_hectareas, linderos)
3. comuneros (id, familia_id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, tipo_documento, numero_documento, fecha_nacimiento, genero, nivel_escolaridad, ocupacion, estado_civil, direccion_actual, ha_sido_autoridad, es_autoridad_actualmente, cargo_autoridad, es_guardia_indigena, tiene_discapacidad)

REGLAS DE GÉNERO:
- La columna 'genero' contiene 'M' (masculino/hombres) o 'F' (femenino/mujeres).

INSTRUCCIONES PARA EL ASISTENTE (PASO 1):
- Tu objetivo es generar una consulta SQL para obtener los datos necesarios.
- Solo retorna JSON puro:
{
    "sql_query": "SELECT ...",
    "necesita_tabla": boolean // Solo true si el usuario pidió explícitamente "tabla", "lista", "cuadro" o "ver todos".
}
`;

export async function askFloatingKomi(question: string) {
    const supabase = await createClient();
    const key = process.env.GROQ_API_KEY?.trim();

    if (!key) {
        return { answer: "⚠️ El módulo de IA no está configurado (Falta GROQ_API_KEY).", tableData: null, error: true };
    }

    try {
        // --- PASO 1: Generar SQL ---
        const firstResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: DB_SCHEMA },
                    { role: "user", content: `Pregunta: ${question}\n\nAnaliza la pregunta y genera el JSON con la SQL query.` }
                ],
                temperature: 0,
                response_format: { type: "json_object" }
            })
        });

        if (!firstResponse.ok) {
            const err = await firstResponse.json();
            throw new Error(`Error en Paso 1 (SQL): ${err.error?.message || firstResponse.statusText}`);
        }

        const firstData = await firstResponse.json();
        const firstContent = firstData.choices?.[0]?.message?.content || "{}";
        const aiAnalysis = JSON.parse(firstContent);

        let dbResults = null;
        if (aiAnalysis.sql_query) {
            const cleanSql = aiAnalysis.sql_query.replace(/;/g, '').trim();
            const { data: dbData, error: dbError } = await (supabase as any).rpc('execute_read_only_sql', { query_text: cleanSql });
            if (!dbError) dbResults = dbData;
        }

        // --- PASO 2: Generar respuesta amigable con datos reales ---
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
                        3. Si el usuario pregunta por una persona específica, describe sus datos más relevantes (edad, ocupación, vereda, si es autoridad) en un párrafo o lista amigable.
                        4. Responde basándote ÚNICAMENTE en estos datos de la base de datos: ${JSON.stringify(dbResults || "No hay resultados")}.
                        5. Si no hay datos, explica amablemente que no encontraste registros.`
                    },
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

        return {
            answer: answer,
            tableData: aiAnalysis.necesita_tabla ? dbResults : null,
            error: false
        };

    } catch (e: any) {
        console.error("AskFloatingKomi error:", e);
        return { answer: `Ocurrió un error inesperado conectando con el asistente: ${e.message}`, tableData: null, error: true };
    }
}
