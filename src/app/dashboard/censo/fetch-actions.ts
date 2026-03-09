
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
