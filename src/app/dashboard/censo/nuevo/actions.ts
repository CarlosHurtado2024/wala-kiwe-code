"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function registrarComunero(formData: FormData) {
    console.log(">>> Iniciando registrarComunero server action");

    try {
        const supabase = await createClient();
        console.log(">>> Cliente Supabase creado");

        const rawData = {
            primerNombre: formData.get("primerNombre") as string,
            segundoNombre: formData.get("segundoNombre") as string,
            primerApellido: formData.get("primerApellido") as string,
            segundoApellido: formData.get("segundoApellido") as string,
            tipoDocumento: formData.get("tipoDocumento") as string,
            numeroDocumento: formData.get("numeroDocumento") as string,
            fechaNacimiento: formData.get("fechaNacimiento") as string,
            genero: formData.get("genero") as string,
            nivelEscolaridad: formData.get("nivelEscolaridad") as string,
            ocupacion: formData.get("ocupacion") as string,
            estadoCivil: formData.get("estadoCivil") as string,
            direccion: formData.get("direccion") as string,
            regimenSalud: formData.get("regimenSalud") as string,
            eps: formData.get("eps") as string,
            haSidoAutoridad: formData.get("haSidoAutoridad") === "true",
            esAutoridadActualmente: formData.get("esAutoridadActualmente") === "true",
            cargoAutoridad: formData.get("cargoAutoridad") as string,
            hablaNasayuwe: formData.get("hablaNasayuwe") as string,
            discapacidades: JSON.parse(formData.get("discapacidades") as string || "[]"),
            tieneDiscapacidad: formData.get("tieneDiscapacidad") === "true",
        };

        console.log(">>> Datos procesados:", { ...rawData, numeroDocumento: '***' });

        const folderName = `${rawData.tipoDocumento}_${rawData.numeroDocumento}`;
        const photo = formData.get("foto") as File;
        const docs = formData.getAll("documentos") as File[];

        console.log(`>>> Archivos: Foto present? ${!!photo && photo.size > 0}, Docs count: ${docs.length}`);

        // 1. Upload Photo
        let fotoUrl = null;
        if (photo && photo.size > 0) {
            console.log(`>>> Subiendo foto... ${photo.name}`);
            const { data: photoData, error: photoError } = await supabase.storage
                .from("censo")
                .upload(`${folderName}/foto_perfil_${photo.name}`, photo, {
                    upsert: true
                });

            if (photoError) {
                console.error(">>> Error subiendo foto:", photoError);
                throw photoError;
            }
            fotoUrl = photoData?.path || null;
            console.log(">>> Foto subida con éxito:", fotoUrl);
        }

        // 2. Upload Documents
        for (const doc of docs) {
            if (doc && doc.size > 0) {
                console.log(`>>> Subiendo documento... ${doc.name}`);
                const { error: docError } = await supabase.storage
                    .from("censo")
                    .upload(`${folderName}/documentos/${doc.name}`, doc, {
                        upsert: true
                    });
                if (docError) {
                    console.error(">>> Error subiendo documento:", doc.name, docError);
                    throw docError;
                }
            }
        }
        console.log(">>> Todos los documentos subidos");

        // 3. Insert into Database
        console.log(">>> Insertando en base de datos...");
        const { error: dbError } = await (supabase.from("comuneros") as any).insert({
            primer_nombre: rawData.primerNombre,
            segundo_nombre: rawData.segundoNombre,
            primer_apellido: rawData.primerApellido,
            segundo_apellido: rawData.segundoApellido,
            tipo_documento: rawData.tipoDocumento,
            numero_documento: rawData.numeroDocumento,
            fecha_nacimiento: rawData.fechaNacimiento,
            genero: rawData.genero,
            nivel_escolaridad: rawData.nivelEscolaridad,
            ocupacion: rawData.ocupacion,
            estado_civil: rawData.estadoCivil,
            direccion_actual: rawData.direccion,
            regimen_salud: rawData.regimenSalud,
            eps: rawData.eps,
            ha_sido_autoridad: rawData.haSidoAutoridad,
            es_autoridad_actualmente: rawData.esAutoridadActualmente,
            cargo_autoridad: rawData.cargoAutoridad,
            habla_nasayuwe: rawData.hablaNasayuwe,
            tiene_discapacidad: rawData.tieneDiscapacidad,
            discapacidades: rawData.discapacidades,
            foto_url: fotoUrl,
            familia_id: null // Explicitly setting to null for now, as requested
        });

        if (dbError) {
            console.error(">>> Error en base de datos:", dbError);
            throw dbError;
        }
        console.log(">>> Registro completado en base de datos");

        revalidatePath("/dashboard/censo");
        console.log(">>> Path revalidado. Fin exitoso.");
        return { success: true };
    } catch (error: any) {
        console.error(">>> ERROR CRÍTICO EN SERVER ACTION:", error);
        return { success: false, error: error.message || "Error desconocido en el servidor" };
    }
}
