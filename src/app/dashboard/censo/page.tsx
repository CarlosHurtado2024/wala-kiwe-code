"use client";

import React, { useState, useEffect } from 'react';
import {
    Users,
    Search,
    UserPlus,
    Bell,
    User,
    Filter,
    Download,
    Edit,
    Award,
    ChevronLeft,
    ChevronRight,
    MapPin,
    HeartPulse
} from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { getComuneros } from './fetch-actions';

export default function CensoPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [comuneros, setComuneros] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedComunero, setSelectedComunero] = useState<any>(null);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            const data = await getComuneros();
            setComuneros(data);
            if (data.length > 0) {
                setSelectedComunero(data[0]);
            }
            setLoading(false);
        }
        loadData();
    }, []);


    const filteredComuneros = comuneros.filter(c =>
        (c.nombres?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (c.apellidos?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (c.numero_documento?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex-1 flex flex-col min-h-0 bg-transparent">
            {/* Header (Glassmorphism) */}
            <header className="h-20 shrink-0 border-b border-white/10 flex items-center justify-between px-8 bg-white/5 backdrop-blur-md sticky top-0 z-20">
                <div className="flex items-center gap-4">
                    <div className="bg-primary/20 p-2 rounded-xl border border-primary/30">
                        <Users className="w-6 h-6 text-primary-300" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white drop-shadow-sm">Módulo de Censo</h2>
                        <p className="text-xs text-white/50 font-medium">Gestión y registro de la comunidad</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-primary-300 transition-colors w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Buscar comunero..."
                            className="bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-white placeholder-white/30 backdrop-blur-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Link href="/dashboard/censo/nuevo" className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95">
                        <UserPlus className="w-4 h-4" />
                        <span>Nuevo Comunero</span>
                    </Link>
                    <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors">
                        <Bell className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth custom-scrollbar">

                {/* Filters Section (Glassmorphism) */}
                <section className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="flex items-center gap-3 mb-6 relative z-10">
                        <Filter className="w-5 h-5 text-primary-300" />
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Filtros Avanzados</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                        {[
                            { label: "Vereda / Localidad", options: ["Todas las Veredas", "El Centro", "La Montaña", "El Río"] },
                            { label: "Rango de Edad", options: ["Cualquier edad", "0-12", "13-17", "18-60", "60+"] },
                            { label: "Estado de Autoridad", options: ["Todos", "Autoridad Activa", "Ex-Autoridad", "Base"] },
                        ].map((filter, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest ml-1">{filter.label}</label>
                                <select className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-primary/50 outline-none text-white/80 cursor-pointer hover:bg-white/10 transition-colors backdrop-blur-sm">
                                    {filter.options.map(opt => <option key={opt} className="bg-slate-900 border-none">{opt}</option>)}
                                </select>
                            </div>
                        ))}

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest ml-1">Género</label>
                            <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                                <button className="flex-1 bg-primary/40 text-white rounded-lg py-1.5 text-[10px] font-black uppercase shadow-lg border border-primary/20">Todos</button>
                                <button className="flex-1 text-white/40 rounded-lg py-1.5 text-[10px] font-black uppercase hover:bg-white/10 transition-all">H</button>
                                <button className="flex-1 text-white/40 rounded-lg py-1.5 text-[10px] font-black uppercase hover:bg-white/10 transition-all">M</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content Grid: Table + Detail Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* List View (Table) */}
                    <div className="lg:col-span-12 flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <h3 className="text-xl font-bold text-white drop-shadow-md">Nómina de Comuneros</h3>
                                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-3 py-1 rounded-full border border-emerald-500/20 font-bold uppercase tracking-wider">
                                    1,252 Registros
                                </span>
                            </div>
                            <button className="text-primary-300 text-sm font-bold flex items-center gap-2 hover:text-white transition-all group">
                                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                                <span>Exportar Reporte</span>
                            </button>
                        </div>

                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/5">
                                        <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Comunero</th>
                                        <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Documento</th>
                                        <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 text-center">Género</th>
                                        <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 text-center">Edad</th>
                                        <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Ubicación</th>
                                        <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Ocupación / Rol</th>
                                        <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Estado</th>
                                        <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-10 text-center text-white/40 font-bold uppercase tracking-widest text-xs">
                                                Cargando comuneros...
                                            </td>
                                        </tr>
                                    ) : filteredComuneros.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-10 text-center text-white/40 font-bold uppercase tracking-widest text-xs">
                                                No se encontraron registros
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredComuneros.map((person) => (
                                            <tr
                                                key={person.id}
                                                className="hover:bg-white/5 transition-all group cursor-pointer"
                                            >
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                                            <User className="w-5 h-5 text-primary-300" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-sm text-white group-hover:text-primary-200 transition-colors line-clamp-1">
                                                                {person.nombres} {person.apellidos}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-xs font-bold text-white/70">
                                                    <span className="text-[10px] text-white/30 mr-1.5">{person.tipo_documento}</span>
                                                    {person.numero_documento}
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${person.genero === 'M' ? 'bg-blue-500/10 text-blue-400' : person.genero === 'F' ? 'bg-pink-500/10 text-pink-400' : 'bg-white/5 text-white/40'}`}>
                                                        {person.genero || '-'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-center text-xs font-bold text-white/80">
                                                    {person.fecha_nacimiento ? `${new Date().getFullYear() - new Date(person.fecha_nacimiento).getFullYear()}` : '-'}
                                                </td>
                                                <td className="px-6 py-5 text-xs text-white/60">
                                                    <div className="flex items-center gap-2 max-w-[150px]">
                                                        <MapPin className="w-3 h-3 shrink-0" />
                                                        <span className="truncate">{person.direccion_actual || 'No registrada'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className="text-[10px] px-3 py-1.5 rounded-xl bg-white/5 text-white/60 font-black uppercase border border-white/10 tracking-widest group-hover:border-primary/30 transition-colors">
                                                        {person.cargo_autoridad || person.ocupacion || 'Comunero'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                                        <span className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Activo</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex justify-end gap-2">
                                                        <button className="p-2 rounded-xl bg-primary/10 text-primary-300 border border-primary/20 hover:bg-primary hover:text-white transition-all shadow-lg shadow-primary/5" title="Certificado">
                                                            <Award className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 rounded-xl bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white transition-all shadow-lg" title="Editar">
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>

                            <div className="p-6 bg-white/5 border-t border-white/5 flex items-center justify-between">
                                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Página 1 de 125</p>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-white/10 text-white/20 hover:text-white hover:bg-white/10 transition-all">
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-2xl bg-primary text-white font-black shadow-xl shadow-primary/30 border border-primary/20 text-xs translate-y-[-2px]">
                                        1
                                    </button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all text-xs font-bold">
                                        2
                                    </button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-white/10 text-white/20 hover:text-white hover:bg-white/10 transition-all">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
