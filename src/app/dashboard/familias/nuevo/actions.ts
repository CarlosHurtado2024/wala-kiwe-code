"use server";

import { createClient } from "@/utils/supabase/server";
import fs from "fs";
import path from "path";

function logDebug(msg: string) {
    try {
        const logPath = path.join(process.cwd(), "debug-familia.log");
        fs.appendFileSync(logPath, new Date().toISOString() + " - " + msg + "\n");
        console.log("DEBUG-FAMILIA:", msg);
    } catch (e) { }
}

export async function createFamiliaAction(selectedMemberIds: string[], firstMemberName: string, vereda?: string, jefeId?: string) {
    try {
        const supabase = await createClient();

        logDebug("--- START ACTION ---");
        logDebug("Members: " + selectedMemberIds.join(", "));

        // 1. Generate a Code WK-XXXX
        const { data: lastFamilies } = await supabase
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
            const { count } = await supabase.from('familias').select('*', { count: 'exact', head: true });
            nextNumber = (count || 0) + 1;
        }

        const padded = nextNumber.toString().padStart(4, '0');
        let newCode = `WK-${padded}`;

        logDebug("Attempting with code: " + newCode);

        // 2. Create Familia record
        const { data: membersData } = await (supabase.from('comuneros') as any)
            .select('primer_apellido')
            .in('id', selectedMemberIds);

        const surnames = Array.from(new Set((membersData || []).map((m: any) => m.primer_apellido).filter(Boolean))).slice(0, 2).join(' ');
        const familyName = surnames ? `Familia ${surnames}` : firstMemberName;

        const familiaPayload = {
            codigo_familia: newCode,
            nombre_familia: familyName,
            vereda_comunidad: vereda || 'Vereda no reportada'
        };

        const { data: nuevaFamilia, error: errorFamilia } = await supabase
            .from('familias')
            .insert(familiaPayload)
            .select();

        if (errorFamilia) {
            logDebug("Error inserting familia: " + JSON.stringify(errorFamilia));
            if (errorFamilia.code === '23505') {
                const randomCode = `WK-${Math.floor(Math.random() * 9000) + 1000}`;
                logDebug("Unique violation, retrying with random code: " + randomCode);
                const { data: retryData, error: retryError } = await supabase.from('familias').insert({
                    ...familiaPayload,
                    codigo_familia: randomCode
                }).select();

                if (retryError) {
                    return { success: false, error: `Error DB Familia (Retry): ${retryError.message}` };
                }

                if (retryData && retryData.length > 0) {
                    await processMembers(supabase, retryData[0].id, selectedMemberIds, jefeId);
                    return { success: true, familiaId: retryData[0].id };
                }
            }
            return { success: false, error: `Error DB Familia: ${errorFamilia.message}` };
        }

        if (!nuevaFamilia || nuevaFamilia.length === 0) {
            logDebug("Insert succeeded but returned no data");
            return { success: false, error: "La familia fue creada pero no se pudo recuperar el ID." };
        }

        const id = nuevaFamilia[0].id;
        logDebug("Created familia ID: " + id);

        // 3. Update all selected members
        await processMembers(supabase, id, selectedMemberIds, jefeId);

        logDebug("Success!");
        return { success: true, familiaId: id };
    } catch (e: any) {
        logDebug("Exception: " + e.message);
        return { success: false, error: `Error de servidor: ${e.message}` };
    }
}

async function processMembers(supabase: any, familiaId: string, memberIds: string[], jefeId?: string) {
    for (const memberId of memberIds) {
        const updatePayload: any = { familia_id: familiaId };
        if (memberId === jefeId) {
            updatePayload.parentezco_cabeza = 'Cabeza de familia';
        }

        const { error: errorUpdate } = await supabase.from('comuneros').update(updatePayload).eq('id', memberId);

        if (errorUpdate) {
            logDebug(`Error updating member ${memberId}: ${errorUpdate.message}`);
        } else {
            logDebug(`Member ${memberId} updated.`);
        }
    }
}
