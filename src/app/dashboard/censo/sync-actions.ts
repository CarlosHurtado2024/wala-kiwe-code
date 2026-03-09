"use server";

import { createClient } from "@/utils/supabase/server";
import { generateEmbedding, prepareComuneroText } from "@/utils/embeddings";
import { revalidatePath } from "next/cache";

export async function syncComunerosAI() {
    const supabase = await createClient();

    // 1. Fetch all members without embeddings
    const { data: comuneros, error: fetchError } = await supabase
        .from("comuneros")
        .select("*")
        .is("embedding", null);

    if (fetchError) {
        return { success: false, error: fetchError.message };
    }

    if (!comuneros || comuneros.length === 0) {
        return { success: true, message: "Todos los comuneros ya están sincronizados." };
    }

    console.log(`>>> Sincronizando ${comuneros.length} comuneros con IA...`);

    let successCount = 0;
    let errorCount = 0;

    for (const c of comuneros) {
        try {
            const text = await prepareComuneroText(c);
            const embedding = await generateEmbedding(text);

            const { error: updateError } = await (supabase.from("comuneros") as any)
                .from("comuneros")
                .update({ embedding })
                .eq("id", c.id);

            if (updateError) {
                console.error(`Error actualizando ID ${c.id}:`, updateError);
                errorCount++;
            } else {
                successCount++;
            }
        } catch (err) {
            console.error(`Error procesando ID ${c.id}:`, err);
            errorCount++;
        }
    }

    revalidatePath("/dashboard/censo");
    return {
        success: true,
        message: `Sincronización completada. Éxito: ${successCount}, Errores: ${errorCount}`
    };
}
