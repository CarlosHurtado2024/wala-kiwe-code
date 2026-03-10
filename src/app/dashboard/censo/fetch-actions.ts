"use server";

import { createClient } from "@/utils/supabase/server";
import { parseQueryToFilters } from "@/utils/aiFilters";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function callGeminiRAG(prompt: string, context: string) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error("GEMINI_API_KEY no está configurada");

    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = `Eres un asistente experto del Módulo de Censo de la comunidad indígena Wala Kiwe.
REGLA DE ORO: Responde conversacionalmente de forma estricta basándote en la información de los comuneros proporcionada en el contexto. Si no hay información, di que no se encontraron registros. Sé claro, profesional y directo. Muestra totales si es relevante.`;

    const fullPrompt = `${systemPrompt}\n\n--- CONTEXTO RECUPERADO DE LA BASE DE DATOS ---\n${context}\n--- FIN DEL CONTEXTO ---\n\nConsulta del usuario: "${prompt}"\n\nRespuesta:`;

    const result = await model.generateContent(fullPrompt);
    return result.response.text();
}
export async function getComuneros() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("comuneros")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error al obtener comuneros:", error);
        return [];
    }

    return data;
}

export async function searchComunerosAI(query: string) {
    const supabase = await createClient();

    // 1. Get embedding for the query using Gemini
    // For now, we assume GEMINI_API_KEY is in process.env
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
        throw new Error("GEMINI_API_KEY no está configurada");
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${geminiApiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: "models/gemini-embedding-001",
                content: { parts: [{ text: query }] }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Gemini Error:", errorData);
            return { results: [], answer: "Error conectando con la IA de búsqueda." };
        }

        const embeddingData = await response.json();
        if (!embeddingData.embedding || !embeddingData.embedding.values) {
            console.error("Unexpected embedding format:", embeddingData);
            return { results: [], answer: "Formato de embedding inesperado desde la IA." };
        }

        const queryEmbedding = embeddingData.embedding.values;

        // 2. Search in Supabase using the match_comuneros function
        // Extraemos filtros precisos usando LLM rápido
        const strictFilters = await parseQueryToFilters(query);
        console.log("Filtros estrictos aplicados:", strictFilters);

        let queryBuilder = (supabase as any).rpc('match_comuneros', {
            query_embedding: queryEmbedding,
            match_threshold: 0.1, // Un umbral bajo porque los filtros estrictos pueden quitar casos pero aún queremos ordenar por similitud
            match_count: 50
        });

        // Aplicamos dinámicamente cualquier filtro
        if (strictFilters.genero) {
            queryBuilder = queryBuilder.eq('genero', strictFilters.genero);
        }
        if (typeof strictFilters.es_autoridad_actualmente === 'boolean') {
            queryBuilder = queryBuilder.eq('es_autoridad_actualmente', strictFilters.es_autoridad_actualmente);
        }
        if (typeof strictFilters.ha_sido_autoridad === 'boolean') {
            queryBuilder = queryBuilder.eq('ha_sido_autoridad', strictFilters.ha_sido_autoridad);
        }

        const { data, error } = await queryBuilder;

        if (error) {
            console.error("Error searching in Supabase:", error);
            return { results: [], answer: "Hubo un error al consultar la base de datos." };
        }

        let contextText = "No se encontraron registros.";
        if (data && data.length > 0) {
            // Pasamos solo campos relevantes al LLM para no gastar tokens
            contextText = data.map((c: any) => `- ${c.primer_nombre} ${c.primer_apellido}, Doc: ${c.numero_documento}, Rol/Ocupación: ${c.cargo_autoridad || c.ocupacion || 'Comunero'}, Género: ${c.genero}, Residencia: ${c.direccion_actual}`).join("\n");
        }

        let answer = "";
        try {
            answer = await callGeminiRAG(query, contextText);
        } catch (e) {
            console.error("RAG Error:", e);
            answer = "No pude generar un resumen conversacional, pero aquí están los resultados tabulados.";
        }

        return { results: data || [], answer };
    } catch (error) {
        console.error("AI Search Error:", error);
        return { results: [], answer: "Error inesperado al ejecutar la búsqueda inteligente." };
    }
}
