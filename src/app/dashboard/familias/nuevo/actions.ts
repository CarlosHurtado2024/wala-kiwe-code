"use server";

import { createClient } from "@/utils/supabase/server";
import fs from "fs";
import path from "path";

function logDebug(msg: string) {
    try {
        const logPath = path.join(process.cwd(), "debug-familia.log");
        fs.appendFileSync(logPath, new Date().toISOString() + " - " + msg + "\n");
        console.log("DEBUG-FAMILIA:", msg);
    } catch(e) {}
}

export async function createFamiliaAction(selectedMemberIds: string[], firstMemberName: string, vereda?: string) {
    try {
        const supabase = await createClient();

        logDebug("--- START ACTION ---");
        logDebug("Members: " + selectedMemberIds.join(", "));

        // 1. Generate a Code WK-XXXX
        // We TRY to get the total count, but if RLS is on, this is unreliable.
        // Let's try to find the maximum existing code or just use a random salt if it fails.
        const { data: lastFamilies, error: countError } = await supabase
            .from('familias')
            .select('codigo_familia')
            .order('codigo_familia', { ascending: false })
            .limit(1);

        let nextNumber = 1;
        if (lastFamilies && lastFamilies.length > 0) {
            const matches = lastFamilies[0].codigo_familia.match(/\d+/);
            if (matches) {
                nextNumber = parseInt(matches[0]) + 1;
            }
        } else {
            // If we find 0, maybe it's RLS. Let's try to count all to be sure if possible
            const { count } = await supabase.from('familias').select('*', { count: 'exact', head: true });
            nextNumber = (count || 0) + 1;
        }
        
        // Safety: If we keep failing with unique constraint, we'll need a different approach.
        // For now, let's just try to insert.
        const padded = nextNumber.toString().padStart(4, '0');
        let newCode = `WK-${padded}`;
        
        logDebug("Attempting with code: " + newCode);

        // 2. Create Familia record
        // Important: If RLS allows insert but not select, .single() fails.
        // We'll try to insert and if we can't select, we might have to use a different strategy.
        const { data: nuevaFamilia, error: errorFamilia } = await supabase.from('familias').insert({
            codigo_familia: newCode,
            nombre_cabeza_familia: firstMemberName,
            vereda_comunidad: vereda || 'Vereda no reportada'
        }).select(); // Removed .single() to see if we get an array

        if (errorFamilia) {
            logDebug("Error inserting familia: " + JSON.stringify(errorFamilia));
            // If it's a unique constraint violation, try with a random number as fallback for now to verify
            if (errorFamilia.code === '23505') {
                 const randomCode = `WK-${Math.floor(Math.random() * 9000) + 1000}`;
                 logDebug("Unique violation, retrying with random code: " + randomCode);
                 const { data: retryData, error: retryError } = await supabase.from('familias').insert({
                    codigo_familia: randomCode,
                    nombre_cabeza_familia: firstMemberName,
                    vereda_comunidad: vereda || 'Vereda no reportada'
                }).select();
                if (retryError) {
                    return { success: false, error: `Error DB Familia (Retry): ${retryError.message}` };
                }
                // Continue with retryData
                if (retryData && retryData.length > 0) {
                    processMembers(supabase, retryData[0].id, selectedMemberIds);
                    return { success: true, familiaId: retryData[0].id };
                }
            }
            return { success: false, error: `Error DB Familia: ${errorFamilia.message} (Code: ${errorFamilia.code})` };
        }

        if (!nuevaFamilia || nuevaFamilia.length === 0) {
            logDebug("Insert succeeded but returned no data (likely RLS policy)");
            return { success: false, error: "La familia fue creada pero no se pudo recuperar el ID. Verifique permisos de SELECT en la tabla familias." };
        }

        const id = nuevaFamilia[0].id;
        logDebug("Created familia ID: " + id);

        // 3. Update all selected members
        await processMembers(supabase, id, selectedMemberIds);

        logDebug("Success!");
        return { success: true, familiaId: id };
    } catch (e: any) {
        logDebug("Exception: " + e.message);
        return { success: false, error: `Error de servidor: ${e.message}` };
    }
}

async function processMembers(supabase: any, familiaId: string, memberIds: string[]) {
    for (const memberId of memberIds) {
        const { error: errorUpdate } = await supabase.from('comuneros').update({
            familia_id: familiaId
        }).eq('id', memberId);
        
        if (errorUpdate) {
            logDebug(`Error updating member ${memberId}: ${errorUpdate.message}`);
        } else {
            logDebug(`Member ${memberId} updated.`);
        }
    }
}
