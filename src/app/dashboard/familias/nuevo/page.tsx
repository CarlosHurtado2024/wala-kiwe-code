"use client";

import React, { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { createFamiliaAction } from './actions';
import {
    Bell,
    Search,
    X,
    CheckCircle,
    Save
} from 'lucide-react';

// Type definition based on standard comunero
type Comunero = {
    id: string;
    nombres: string;
    apellidos: string;
    documento_identidad: string;
    vereda?: string; // or residence if available
};

export default function NuevaFamiliaGuiadaPage() {
    const router = useRouter();
    const supabase = createClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<Comunero[]>([]);
    const [selectedMembers, setSelectedMembers] = useState<Comunero[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleSave = () => {
        if (selectedMembers.length === 0) return;
        
        startTransition(async () => {
            const memberIds = selectedMembers.map(m => m.id);
            const firstName = `${selectedMembers[0].nombres} ${selectedMembers[0].apellidos}`;
            const vereda = selectedMembers[0].vereda;
            
            const result = await createFamiliaAction(memberIds, firstName, vereda);
            
            if (result.success) {
                // Return to families and refresh
                router.push('/dashboard/familias');
                router.refresh();
            } else {
                alert(result.error || "Ocurrió un error al guardar la familia");
            }
        });
    };

    // Effect for searching
    useEffect(() => {
        const fetchResults = async () => {
            if (searchTerm.trim().length < 2) {
                setResults([]);
                return;
            }
            setIsSearching(true);
            const { data, error } = await supabase
                .from('comuneros')
                .select('*')
                .or(`nombres.ilike.%${searchTerm}%,apellidos.ilike.%${searchTerm}%,documento_identidad.ilike.%${searchTerm}%`)
                .limit(10);
            
            if (!error && data) {
                setResults(data as Comunero[]);
            }
            setIsSearching(false);
        };

        const timerInfo = setTimeout(fetchResults, 300);
        return () => clearTimeout(timerInfo);
    }, [searchTerm, supabase]);

    const handleSelect = (member: Comunero) => {
        if (!selectedMembers.some(m => m.id === member.id)) {
            setSelectedMembers([...selectedMembers, member]);
        }
    };

    const handleRemove = (id: string) => {
        setSelectedMembers(selectedMembers.filter(m => m.id !== id));
    };

    return (
        <div className="relative flex h-auto min-h-full w-full flex-col bg-background overflow-x-hidden">
            <div className="flex h-full grow flex-col">
                {/* Top Navigation */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border px-6 md:px-10 py-3 bg-background sticky top-0 z-50">
                    <div className="flex items-center gap-4 text-foreground">
                        <div className="w-6 h-6 text-primary">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
                            </svg>
                        </div>
                        <h2 className="text-foreground text-lg font-bold leading-tight tracking-[-0.015em]">Wala Kiwe</h2>
                    </div>
                    <div className="flex flex-1 justify-end gap-4 md:gap-8">
                        <nav className="hidden md:flex items-center gap-9">
                            <Link href="/dashboard/censo" className="text-foreground text-sm font-medium hover:text-primary transition-colors">Censo</Link>
                            <Link href="/dashboard/familias" className="text-foreground text-sm font-medium hover:text-primary transition-colors">Familias</Link>
                        </nav>
                        <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-secondary text-foreground hover:bg-secondary/80 transition-colors">
                            <Bell className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                <main className="flex flex-1 justify-center py-8">
                    <div className="flex flex-col w-full max-w-[800px] px-4 md:px-0">
                        {/* Header */}
                        <div className="flex flex-col gap-6 p-4">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-foreground text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Crear Familia</h1>
                                <p className="text-muted-foreground text-base font-medium">Busca el núcleo y añade los integrantes</p>
                            </div>
                        </div>

                        {/* Search and Select */}
                        <div className="flex flex-col gap-6 p-4">
                            <div className="flex flex-col gap-4">
                                <label className="flex flex-col w-full group">
                                    <div className="flex w-full items-stretch rounded-xl h-14 bg-secondary border-2 border-transparent focus-within:border-primary/30 transition-all shadow-sm">
                                        <div className="text-muted-foreground flex items-center justify-center pl-4 pr-1">
                                            <Search className="w-5 h-5" />
                                        </div>
                                        <input
                                            className="flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 text-foreground placeholder:text-muted-foreground px-4 text-base outline-none"
                                            placeholder="Buscar por nombre, apellido o Identificación (Ej: 1054...)"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </label>
                                
                                {/* Selected Members Chips */}
                                <div className="flex flex-wrap gap-2 min-h-[40px] items-center">
                                    <span className="text-sm font-medium text-muted-foreground mr-2">
                                        Integrantes listos para agrupar:
                                    </span>
                                    {selectedMembers.length === 0 && (
                                        <span className="text-xs italic text-muted-foreground opacity-60">Ninguno todavía...</span>
                                    )}
                                    {selectedMembers.map((member) => (
                                        <div key={member.id} className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full pl-3 pr-1 py-1 shadow-sm">
                                            <span className="text-xs font-bold text-primary">{member.nombres} {member.apellidos}</span>
                                            <button 
                                                onClick={() => handleRemove(member.id)}
                                                className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-primary/20 text-primary transition-colors"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Search Results List */}
                            {searchTerm.length >= 2 && (
                                <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="border-b border-border px-4 py-3 bg-secondary/50 flex justify-between items-center">
                                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">
                                            {isSearching ? 'Buscando Comuneros...' : 'Resultados de Búsqueda'}
                                        </h3>
                                        {!isSearching && (
                                            <span className="text-xs text-muted-foreground">{results.length} encontrados</span>
                                        )}
                                    </div>
                                    
                                    <div className="divide-y divide-border">
                                        {!isSearching && results.length === 0 ? (
                                            <div className="p-6 text-center text-muted-foreground font-medium">
                                                No se encontraron registros activos bajo esos criterios.
                                            </div>
                                        ) : (
                                            results.map((r) => {
                                                const isSelected = selectedMembers.some(sm => sm.id === r.id);
                                                return (
                                                    <div key={r.id} className={`flex items-center justify-between p-4 transition-colors cursor-pointer group ${isSelected ? 'bg-primary/10' : 'hover:bg-secondary/30'}`}>
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-12 h-12 rounded-full overflow-hidden shrink-0 flex items-center justify-center text-lg font-bold uppercase
                                                                ${isSelected ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-900' : 'bg-secondary text-muted-foreground'}
                                                            `}>
                                                                {r.nombres.charAt(0)}{r.apellidos.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <p className="text-base font-bold text-foreground">{r.nombres} {r.apellidos}</p>
                                                                <p className="text-sm text-muted-foreground">Doc: {r.documento_identidad || 'Sin ID'} • {r.vereda || 'Vereda no reportada'}</p>
                                                            </div>
                                                        </div>

                                                        {isSelected ? (
                                                            <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                                                <CheckCircle className="w-5 h-5" />
                                                                Seleccionado
                                                            </div>
                                                        ) : (
                                                            <button 
                                                                onClick={() => handleSelect(r)}
                                                                className="flex items-center justify-center rounded-lg h-9 px-4 border-2 border-primary text-primary font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-all"
                                                            >
                                                                Agregar
                                                            </button>
                                                        )}
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Footer */}
                        <div className="flex items-center justify-between p-6 mt-4 border-t border-border">
                            <Link href="/dashboard/familias" className="flex items-center justify-center gap-2 px-6 h-12 rounded-xl text-muted-foreground font-bold hover:bg-secondary transition-colors">
                                Volver atrás
                            </Link>
                            <button 
                                onClick={handleSave}
                                disabled={selectedMembers.length === 0 || isPending}
                                className="flex items-center gap-2 px-8 h-12 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:shadow-none disabled:hover:bg-primary"
                            >
                                <Save className="w-5 h-5" />
                                {isPending ? 'Guardando...' : 'Guardar Familia'}
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
