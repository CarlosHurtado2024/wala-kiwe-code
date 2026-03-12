import React from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import {
    Search,
    MapPin,
    Users,
    CheckCircle,
    Filter,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    UserPlus,
    Inbox
} from 'lucide-react';

export default async function FamiliasDirectoryPage() {
    const supabase = await createClient();

    // Fetch familias along with the count of comuneros belonging to each familia
    const { data: familiasData, error } = await supabase
        .from('familias')
        .select('*, comuneros(id)')
        .order('created_at', { ascending: false });

    // Format the fetched data for the table
    const familias = familiasData?.map((f) => {
        // Generate initials
        const nameParts = (f.nombre_cabeza_familia || 'Sin Nombre').trim().split(' ');
        let initials = nameParts[0]?.[0] || '';
        if (nameParts.length > 1) {
            initials += nameParts[nameParts.length - 1][0];
        }

        return {
            id: f.id,
            code: f.codigo_familia || 'WK-0000',
            rep: f.nombre_cabeza_familia || 'Sin Representante',
            initials: initials.toUpperCase(),
            members: f.comuneros ? f.comuneros.length : 0,
            location: f.vereda_comunidad || 'No Asignada',
            status: "Registrado", // You can update this based on logic later
            statusColor: "emerald"
        };
    }) || [];


    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-background">
            {/* Header */}
            <header className="h-auto px-6 lg:px-8 py-10 flex flex-col gap-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Directorio de Familias del Territorio</h1>
                        <p className="text-muted-foreground mt-1">Gestión y censo de hogares en el resguardo indígena Wala Kiwe.</p>
                    </div>
                    <Link href="/dashboard/familias/nuevo" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2.5 px-5 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-primary/20 shrink-0">
                        <UserPlus className="w-5 h-5" />
                        <span>Nueva Familia</span>
                    </Link>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <input
                            className="w-full pl-11 pr-4 py-2.5 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm transition-all text-foreground outline-none"
                            placeholder="Buscar por representante o ID familiar..."
                            type="text"
                        />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-lg text-sm font-medium text-muted-foreground hover:border-primary hover:text-foreground transition-all whitespace-nowrap">
                            <MapPin className="w-4 h-4" />
                            Vereda: Todas
                            <ChevronDown className="w-4 h-4 opacity-70" />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-lg text-sm font-medium text-muted-foreground hover:border-primary hover:text-foreground transition-all whitespace-nowrap">
                            <Users className="w-4 h-4" />
                            Integrantes
                            <ChevronDown className="w-4 h-4 opacity-70" />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-lg text-sm font-medium text-muted-foreground hover:border-primary hover:text-foreground transition-all whitespace-nowrap">
                            <CheckCircle className="w-4 h-4" />
                            Estado: Todos
                            <ChevronDown className="w-4 h-4 opacity-70" />
                        </button>
                        <div className="hidden lg:block w-[1px] h-8 bg-border mx-2"></div>
                        <button className="p-2.5 bg-card border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary transition-colors shrink-0">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-auto px-6 lg:px-8 pb-8">
                {familias.length === 0 ? (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center p-12 bg-card border border-border rounded-2xl shadow-sm h-full max-h-[400px]">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                            <Inbox className="w-10 h-10 text-primary opacity-80" />
                        </div>
                        <h2 className="text-xl font-bold text-foreground mb-2">No se encontraron familias</h2>
                        <p className="text-muted-foreground text-center max-w-md mb-8">
                            Aún no hay familias registradas en el territorio o los filtros actuales no arrojaron resultados. Añade la primera familia para comenzar a gestionar sus datos.
                        </p>
                        <Link href="/dashboard/familias/nuevo" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2.5 px-6 rounded-lg transition-all shadow-md flex items-center gap-2">
                            <UserPlus className="w-5 h-5" />
                            Registrar Primera Familia
                        </Link>
                    </div>
                ) : (
                    /* Table Section */
                    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse whitespace-nowrap min-w-[800px]">
                                <thead className="bg-secondary/50 border-b border-border">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Representante (Jefe de Hogar)</th>
                                        <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">ID Familiar</th>
                                        <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Integrantes</th>
                                        <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Vereda / Sector</th>
                                        <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Estado de Predio</th>
                                        <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {familias.map((familia, idx) => (
                                        <tr key={idx} className="hover:bg-secondary/30 transition-colors">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                                                        {familia.initials}
                                                    </div>
                                                    <span className="text-sm font-semibold text-foreground">{familia.rep}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <code className="text-xs bg-secondary px-2 py-1 rounded text-primary font-mono font-medium">
                                                    {familia.code}
                                                </code>
                                            </td>
                                            <td className="px-6 py-5 text-sm text-muted-foreground">{familia.members} miembros</td>
                                            <td className="px-6 py-5 text-sm text-muted-foreground">{familia.location}</td>
                                            <td className="px-6 py-5">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                                                    familia.statusColor === 'emerald' 
                                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                                }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${familia.statusColor === 'emerald' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                                                    {familia.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <Link href={`/dashboard/familias/${familia.id}`} className="text-primary hover:underline text-sm font-bold">
                                                    Abrir Ficha
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination */}
                        <div className="px-6 py-4 bg-secondary/30 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border">
                            <span className="text-xs text-muted-foreground font-medium">Mostrando {familias.length} de 128 familias</span>
                            <div className="flex items-center gap-2">
                                <button className="p-1 rounded hover:bg-secondary text-muted-foreground disabled:opacity-30 transition-colors" disabled>
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button className="px-2.5 py-1 text-xs font-bold rounded bg-primary text-primary-foreground shadow-sm">1</button>
                                <button className="px-2.5 py-1 text-xs font-medium rounded hover:bg-secondary text-muted-foreground transition-colors">2</button>
                                <button className="px-2.5 py-1 text-xs font-medium rounded hover:bg-secondary text-muted-foreground transition-colors">3</button>
                                <span className="text-muted-foreground px-1">...</span>
                                <button className="p-1 rounded hover:bg-secondary text-muted-foreground transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
