"use server";

export async function generateEmbedding(text: string) {
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
        throw new Error("GEMINI_API_KEY no está configurada");
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: "models/gemini-embedding-001",
            content: { parts: [{ text: text }] }
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Error de Gemini: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.embedding.values;
}

export async function prepareComuneroText(c: any) {
    const generoTexto = c.genero === 'M' ? 'Masculino, Hombre' : c.genero === 'F' ? 'Femenino, Mujer' : c.genero;
    return `Comunero: ${c.primer_nombre} ${c.segundo_nombre || ''} ${c.primer_apellido} ${c.segundo_apellido}. 
    Documento: ${c.tipo_documento} ${c.numero_documento}.
    Ubicación: ${c.direccion_actual || 'No registrada'}.
    Ocupación: ${c.ocupacion || 'Comunero'}.
    Escolaridad: ${c.nivel_escolaridad}.
    Salud: Régimen ${c.regimen_salud}, EPS ${c.eps || 'No registrada'}.
    Cultura: Nasayuwe ${c.habla_nasayuwe}.
    Autoridad: ${c.ha_sido_autoridad ? 'Ha sido autoridad' : 'No ha sido autoridad'}. ${c.es_autoridad_actualmente ? 'Es autoridad actualmente como ' + c.cargo_autoridad : ''}.
    Género: ${generoTexto}. Edad aproximada: ${c.fecha_nacimiento ? (new Date().getFullYear() - new Date(c.fecha_nacimiento).getFullYear()) : 'Desconocida'}.`.replace(/\s+/g, ' ').trim();
}
