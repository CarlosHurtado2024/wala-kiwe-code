"use server";

import { createClient } from "@/utils/supabase/server";

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
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${geminiApiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: "models/text-embedding-004",
                content: { parts: [{ text: query }] }
            })
        });

        const embeddingData = await response.json();
        const queryEmbedding = embeddingData.embedding.values;

        // 2. Search in Supabase using the match_comuneros function
        const { data, error } = await (supabase as any).rpc('match_comuneros', {
            query_embedding: queryEmbedding,
            match_threshold: 0.3, // Adjust based on needs
            match_count: 50
        });

        if (error) {
            console.error("Error searching in Supabase:", error);
            return [];
        }

        return data;
    } catch (error) {
        console.error("AI Search Error:", error);
        return [];
    }
}
