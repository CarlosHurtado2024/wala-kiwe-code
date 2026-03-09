// Tipos para estructurar las carpetas del bucket walakiwe_documentos
export const BUCKET_NAME = "walakiwe_documentos";

/**
 * Utilidades para generar las "carpetas" (prefijos de path) estandarizadas 
 * dentro de Supabase Storage para WalaKiwe, de forma que el código se mantenga ordenado.
 */
export const StoragePaths = {
    // 1. CARPETAS PARA COMUNEROS INDIVIDUALES
    comunero: {
        base: (comuneroId: string) => `comuneros/${comuneroId}`,

        identidad: (comuneroId: string, filename: string) =>
            `comuneros/${comuneroId}/identidad/${filename}`,

        salud: (comuneroId: string, filename: string) =>
            `comuneros/${comuneroId}/salud/${filename}`,

        justicia: (comuneroId: string, filename: string) =>
            `comuneros/${comuneroId}/justicia/${filename}`,
    },

    // 2. CARPETAS PARA TIERRAS Y PREDIOS
    predio: {
        base: (predioId: string) => `predios/${predioId}`,

        adjudicaciones: (predioId: string, filename: string) =>
            `predios/${predioId}/adjudicaciones/${filename}`,

        mapas: (predioId: string, filename: string) =>
            `predios/${predioId}/mapas/${filename}`,
    },

    // 3. CARPETAS COMUNITARIAS Y OFICIALES DEL RESGUARDO
    resguardo: {
        actasAsamblea: (year: string, filename: string) =>
            `resguardo/actas_asamblea/${year}/${filename}`,

        normativaLegal: (filename: string) =>
            `resguardo/normativa/${filename}`, // Para el IA/RAG

        resolucionesCabildo: (year: string, filename: string) =>
            `resguardo/resoluciones/${year}/${filename}`,
    },

    // 4. GESTIÓN FINANCIERA
    finanzas: {
        base: (presupuestoId: string) => `finanzas/${presupuestoId}`,

        comprobantes: (presupuestoId: string, filename: string) =>
            `finanzas/${presupuestoId}/comprobantes/${filename}`,

        informes: (presupuestoId: string, filename: string) =>
            `finanzas/${presupuestoId}/informes/${filename}`,
    }
};
