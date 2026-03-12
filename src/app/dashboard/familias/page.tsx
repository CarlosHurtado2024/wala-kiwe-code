import React from 'react';
import { Users, Search, UserPlus, MapPin, ChevronRight, User, Hash } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function FamiliasPage() {
    const supabase = await createClient();

    // Fetch familias along with the count of comuneros and the head of family info
    const { data: familiasData, error } = await supabase
        .from('familias')
        .select(`
            *,
            comuneros(id, primer_nombre, primer_apellido, parentezco_cabeza)
        `)
        .order('created_at', { ascending: false });

    const familias = (familiasData || []).map((f: any) => {
        const jefe = f.comuneros?.find((c: any) => 
            c.parentezco_cabeza === 'Cabeza de familia' || 
            c.parentezco_cabeza === 'Jefe de Hogar' ||
            c.parentezco_cabeza === 'Padre' ||
            c.parentezco_cabeza === 'Madre'
        ) || f.comuneros?.[0];

        return {
            id: f.id,
            codigoFamilia: f.codigo_familia || `FAM-${f.id?.slice(0, 6)}`,
            nombreFamilia: f.nombre_familia || 'Sin nombre',
            vereda: f.vereda_comunidad || 'Sin ubicación',
            numIntegrantes: Array.isArray(f.comuneros) ? f.comuneros.length : 0,
            representante: jefe
                ? `${jefe.primer_nombre || ''} ${jefe.primer_apellido || ''}`.trim() || 'Sin representante'
                : 'Sin representante'
        };
    });

    return (
        <div className="flex-1 flex flex-col min-h-0 bg-background">
            {/* Header */}
            <header className="h-16 shrink-0 border-b border-border flex items-center justify-between px-6 lg:px-8 bg-card/80 backdrop-blur-sm sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-xl border border-primary/20">
                        <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-foreground leading-tight">Directorio de Familias</h2>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Núcleos familiares del resguardo</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/dashboard/familias/nuevo" className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm hover:shadow-md active:scale-95">
                        <UserPlus className="w-4 h-4" />
                        <span className="hidden sm:inline">Nueva Familia</span>
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6 custom-scrollbar">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-foreground">Familias Registradas</h3>
                        <span className="bg-primary/10 text-primary text-[10px] px-3 py-1 rounded-full border border-primary/20 font-bold uppercase tracking-wider">
                            {familias.length} familias
                        </span>
                    </div>
                </div>

                {error && (
                    <div className="bg-destructive/10 text-destructive border border-destructive/30 rounded-xl p-4 text-sm">
                        Error al cargar las familias: {error.message}
                    </div>
                )}

                {familias.length === 0 && !error ? (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 mb-4">
                            <Users className="w-8 h-8 text-primary/40" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">Sin familias registradas</h3>
                        <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                            Aún no se han creado núcleos familiares. Comience agregando la primera familia del territorio.
                        </p>
                        <Link href="/dashboard/familias/nuevo" className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-2 hover:bg-primary/90 transition-all shadow-sm">
                            <UserPlus className="w-4 h-4" />
                            Registrar Primera Familia
                        </Link>
                    </div>
                ) : (
                    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[700px]">
                                <thead>
                                    <tr className="border-b border-border bg-secondary/50">
                                        <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Familia</th>
                                        <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Representante</th>
                                        <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Ubicación</th>
                                        <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground text-center">Integrantes</th>
                                        <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {familias.map((familia: any) => (
                                        <tr key={familia.id} className="hover:bg-primary/[0.03] transition-colors group">
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                                                        <Users className="w-4 h-4 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{familia.nombreFamilia}</p>
                                                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                                            <Hash className="w-2.5 h-2.5" />
                                                            <span>{familia.codigoFamilia}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                                                    <span className="text-sm text-foreground/80">{familia.representante}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                    <MapPin className="w-3 h-3 shrink-0" />
                                                    <span className="truncate max-w-[150px]">{familia.vereda}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 text-center">
                                                <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${familia.numIntegrantes > 0 ? 'bg-accent/15 text-accent' : 'bg-secondary text-muted-foreground'}`}>
                                                    {familia.numIntegrantes}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-right">
                                                <Link href={`/dashboard/familias/${familia.id}`} className="text-primary text-xs font-bold hover:underline flex items-center gap-1 justify-end">
                                                    Ver Ficha <ChevronRight className="w-3 h-3" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
