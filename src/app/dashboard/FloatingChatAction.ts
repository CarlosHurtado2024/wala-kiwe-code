"use server";

import { createClient } from "@/utils/supabase/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const DB_SCHEMA = `
Tablas en la base de datos (PostgreSQL):
1. familias
- id (uuid, primary key)
- codigo_familia (varchar)
- nombre_familia (varchar)
- vereda_comunidad (varchar)
- created_at (timestamp)

2. predios
- id (uuid, primary key)
- nombre_predio (varchar)
- area_hectareas (numeric)
- linderos (USER-DEFINED TYPE con nte, sur, est, ote, etc)
- created_at (timestamp)

3. comuneros (Personas de la comunidad que pueden formar familias)
- id (uuid, primary key)
- familia_id (uuid, foreign key a familias.id)
- nombres, apellidos (varchar)
- primer_nombre, segundo_nombre, primer_apellido, segundo_apellido (text)
- tipo_documento, numero_documento (text)
- fecha_nacimiento (date)
- genero (varchar, usualmente 'M' o 'F')
- nivel_escolaridad, ocupacion, estado_civil, direccion_actual (text)
- ha_sido_autoridad, es_autoridad_actualmente, es_guardia_indigena (boolean)
- descripcion_cargo o cargo_autoridad (text)
- tiene_discapacidad (boolean)

Instrucciones para la Inteligencia Artificial (Text-to-SQL):
- El usuario te hará preguntas complejas sobre los datos. Debes razonar sobre qué tabla consultar y qué relaciones aplicar (JOINs, agrupaciones, promedios, max/min, etc).
- Si el usuario dice "muéstrame toda la información relacionada" o "filtra" asegúrate de que tu query retorne filas completas (SELECT *) o las columnas principales (primer_nombre, apellidos, documento, genero, etc.) en lugar de solo contar (COUNT).
- Retorna tu respuesta en formato JSON estrictamente como lo indico a continuación, sin explicaciones ni markdown envolvente. Solo código JSON puro y válido:

{
    "answer": "Tu explicación en lenguaje natural. Sé amable y conversacional. Ejemplo: 'Encontré 3 familias con menores de 5 años. Aquí tienes la lista de los pequeños...'",
    "sql_query": "SELECT comuneros.primer_nombre, comuneros.apellidos, comuneros.fecha_nacimiento, familias.nombre_familia FROM comuneros JOIN familias ON comuneros.familia_id = familias.id WHERE comuneros.fecha_nacimiento >= CURRENT_DATE - INTERVAL '5 years'",
    "necesita_tabla": true // o false si el usuario solo hizo una pregunta general no relacionada a la base de datos.
}
`;

export async function askFloatingKomi(question: string) {
    const supabase = await createClient();
    const key = process.env.GEMINI_API_KEY;

    if (!key) {
        return { answer: "⚠️ El módulo de IA no está configurado (Falta GEMINI_API_KEY).", tableData: null, error: true };
    }

    try {
        const genAI = new GoogleGenerativeAI(key);
        // Using "gemini-2.5-flash" to avoid quota exhausted issues from gemini-2.0-flash
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `${DB_SCHEMA}\nPregunta del usuario: "${question}"\nRespuesta JSON pura:\n`;
        const result = await model.generateContent(prompt);
        const textResponse = result.response.text();

        // Extract JSON safely
        const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            return { answer: "Hubo un error interpretando tu solicitud. Por favor intenta ser más específico.", tableData: null, error: true };
        }

        const aiData = JSON.parse(jsonMatch[0]);

        if (aiData.necesita_tabla && aiData.sql_query && typeof aiData.sql_query === 'string') {
            const cleanSql = aiData.sql_query.replace(/;/g, '').trim(); // Remove semicolon for safety execution

            // Execute dynamic read_only SQL via Supabase RPC
            const { data: dbData, error: dbError } = await (supabase as any).rpc('execute_read_only_sql', { query_text: cleanSql });

            if (dbError) {
                console.error("SQL Error:", dbError);
                return {
                    answer: "🚫 El asistente generó una consulta interna que la base de datos no pudo procesar correctamente. Intenta formular la pregunta de otra manera.",
                    tableData: null,
                    error: true
                };
            }

            return {
                answer: aiData.answer,
                tableData: dbData || [],
                error: false
            };
        } else {
            // Just theoretical / no table needed
            return { answer: aiData.answer, tableData: null, error: false };
        }

    } catch (e: any) {
        console.error("AskFloatingKomi error:", e);
        return { answer: `Ocurrió un error inesperado conectando con el asistente: ${e.message}`, tableData: null, error: true };
    }
}
