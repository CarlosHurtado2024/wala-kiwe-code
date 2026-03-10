export async function parseQueryToFilters(query: string) {
    const key = process.env.GROQ_API_KEY?.trim();
    if (!key) return {};

    try {
        const prompt = `Actúa como un analizador de bases de datos. Analiza la siguiente consulta de búsqueda del usuario sobre un censo comunitario y extrae filtros exactos en formato JSON si es posible. Si no hay filtros obvios, retorna un JSON vacío {}. Solo debes retornar código JSON puro entre llaves.
        
        Campos disponibles para filtrar y sus reglas lógicas:
        - genero: Si la consulta dice algo como "hombres", "masculino", "hombres y niños", retorna "M". Si dice "mujeres", "femenino", "niñas", retorna "F".
        - es_autoridad_actualmente: boolean. Si dicen "solo autoridades" o "quienes sean autoridad" -> true. "que no sean autoridad" -> false.
        - ha_sido_autoridad: boolean. Si dicen "ex autoridades" o "ya fueron autoridad" -> true.

        NOTA: Para términos abstractos o de profesiones (ej. "profesores", "agricultores", "personas en el pomar"), NO crees filtros JSON. Deja que la búsqueda semántica vectorial haga ese trabajo. SOLO crea filtros JSON para los campos listados arriba cuando sea explicito.
        
        Consulta del usuario: "${query}"`;

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${key}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.1-70b-versatile",
                messages: [
                    { role: "system", content: "Retorna solo JSON válido." },
                    { role: "user", content: prompt }
                ],
                temperature: 0,
                response_format: { type: "json_object" }
            })
        });

        if (!response.ok) {
            const err = await response.json();
            console.error("Groq filter error:", err);
            return {};
        }

        const data = await response.json();
        const text = data.choices[0]?.message?.content || "{}";
        return JSON.parse(text);

    } catch (e) {
        console.error("AI filter extraction failed (continuing without hard filters):", e);
        return {};
    }
}
