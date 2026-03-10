export async function parseQueryToFilters(query: string) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) return {};

    try {
        const prompt = `Actúa como un analizador de bases de datos. Analiza la siguiente consulta de búsqueda del usuario sobre un censo comunitario y extrae filtros exactos en formato JSON si es posible. Si no hay filtros obvios, retorna un JSON vacío {}. Solo debes retornar código JSON puro entre llaves.
        
        Campos disponibles para filtrar y sus reglas lógicas:
        - genero: Si la consulta dice algo como "hombres", "masculino", "hombres y niños", retorna "M". Si dice "mujeres", "femenino", "niñas", retorna "F".
        - es_autoridad_actualmente: boolean. Si dicen "solo autoridades" o "quienes sean autoridad" -> true. "que no sean autoridad" -> false.
        - ha_sido_autoridad: boolean. Si dicen "ex autoridades" o "ya fueron autoridad" -> true.

        NOTA: Para términos abstractos o de profesiones (ej. "profesores", "agricultores", "personas en el pomar"), NO crees filtros JSON. Deja que la búsqueda semántica vectorial haga ese trabajo. SOLO crea filtros JSON para los campos listados arriba cuando sea explicito.
        
        Consulta del usuario: "${query}"
        
        Salida esperada (solo JSON):`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });
        const result = await response.json();

        if (!response.ok) {
            console.error("Fetch API error Gemini:", result);
            return {};
        }

        const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const jsonMatch = text.match(/\{[\s\S]*\}/);

        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        return {};
    } catch (e) {
        console.error("AI filter extraction failed (continuing without hard filters):", e);
        return {};
    }
}
