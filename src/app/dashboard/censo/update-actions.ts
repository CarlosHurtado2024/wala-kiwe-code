"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateComunero(id: string, formData: FormData) {
    const supabase = await createClient();

    // Pick only fields that are safe to update (don't break relational indices if they were linked, though currently familia_id is null)
    // We exclude core IDs and sensitive system fields
    const updates = {
        primer_nombre: formData.get("primerNombre")?.toString(),
        segundo_nombre: formData.get("segundoNombre")?.toString(),
        primer_apellido: formData.get("primerApellido")?.toString(),
        segundo_apellido: formData.get("segundoApellido")?.toString(),
        direccion_actual: formData.get("direccion")?.toString(),
        nivel_escolaridad: formData.get("nivelEscolaridad")?.toString(),
        ocupacion: formData.get("ocupacion")?.toString(),
        regimen_salud: formData.get("regimenSalud")?.toString(),
        eps: formData.get("eps")?.toString(),
        habla_nasayuwe: formData.get("hablaNasayuwe")?.toString(),
        ha_sido_autoridad: formData.get("haSidoAutoridad") === "true",
        es_autoridad_actualmente: formData.get("esAutoridadActualmente") === "true",
        cargo_autoridad: formData.get("cargoAutoridad")?.toString() || null,
        estado_civil: formData.get("estadoCivil")?.toString(),
        tiene_discapacidad: formData.get("tieneDiscapacidad") === "true",
        discapacidades: JSON.parse(formData.get("discapacidades")?.toString() || "[]"),

        // Legacy columns for compatibility
        nombres: `${formData.get("primerNombre")} ${formData.get("segundoNombre") || ""}`.trim(),
        apellidos: `${formData.get("primerApellido")} ${formData.get("segundoApellido")}`.trim(),
    };

    const { error } = await supabase
        .from("comuneros")
        .update(updates)
        .eq("id", id);

    if (error) {
        console.error("Error updating comunero:", error);
        return { success: false, error: error.message };
    }

    revalidatePath("/dashboard/censo");
    return { success: true };
}
