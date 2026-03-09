"use client";

import React, { useState, useEffect } from 'react';
import {
    Users,
    Search,
    UserPlus,
    Bell,
    TrendingUp,
    Baby,
    User,
    Sun,
    Filter,
    MoreHorizontal,
    Download,
    Edit,
    Award,
    ChevronLeft,
    ChevronRight,
    GitBranch,
    MapPin,
    CheckCircle2,
    XCircle,
    Clock,
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

    const stats = [
        { label: "Total Población", value: comuneros.length.toString(), trend: "Registrados en BD", icon: Users, color: "text-white" },
        {
            label: "Niños & Jóvenes", value: comuneros.filter(c => {
                if (!c.fecha_nacimiento) return false;
                const age = new Date().getFullYear() - new Date(c.fecha_nacimiento).getFullYear();
                return age < 18;
            }).length.toString(), trend: "Menores de 18", icon: Baby, color: "text-blue-400"
        },
        {
            label: "Adultos", value: comuneros.filter(c => {
                if (!c.fecha_nacimiento) return false;
                const age = new Date().getFullYear() - new Date(c.fecha_nacimiento).getFullYear();
                return age >= 18 && age < 60;
            }).length.toString(), trend: "Entre 18 y 60", icon: User, color: "text-emerald-400"
        },
        {
            label: "Mayores (Sabedores)", value: comuneros.filter(c => {
                if (!c.fecha_nacimiento) return false;
                const age = new Date().getFullYear() - new Date(c.fecha_nacimiento).getFullYear();
                return age >= 60;
            }).length.toString(), trend: "Mayores de 60", icon: Sun, color: "text-amber-400"
        },
    ];

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
                {/* Top Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="group bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] shadow-xl hover:bg-white/10 transition-all flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${stat.color} shadow-inner`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                {i === 0 && <TrendingUp className="w-4 h-4 text-emerald-400" />}
                            </div>
                            <div>
                                <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                                <p className="text-3xl font-black text-white">{stat.value}</p>
                                <div className="mt-4 flex items-center gap-2">
                                    <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary/40 w-2/3"></div>
                                    </div>
                                    <span className="text-[10px] font-bold text-white/60">{stat.trend}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

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
                    <div className="lg:col-span-8 flex flex-col gap-6">
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
                                        <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Rol / Cargo</th>
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
                                                onClick={() => setSelectedComunero(person)}
                                                className={`hover:bg-white/5 transition-all group cursor-pointer ${selectedComunero?.id === person.id ? 'bg-white/10' : ''}`}
                                            >
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-xl border-2 border-white/10 group-hover:border-primary/40 transition-colors bg-white/5 flex items-center justify-center">
                                                            {person.foto_url ? (
                                                                <Image
                                                                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/censo/${person.foto_url}`}
                                                                    alt={person.nombres}
                                                                    width={48}
                                                                    height={48}
                                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                                    unoptimized
                                                                />
                                                            ) : (
                                                                <User className="w-6 h-6 text-white/20" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-sm text-white group-hover:text-primary-200 transition-colors">
                                                                {person.nombres} {person.apellidos}
                                                            </p>
                                                            <div className="flex items-center gap-2 text-[11px] text-white/40 mt-1">
                                                                <MapPin className="w-3 h-3" />
                                                                <span>{person.direccion_actual || 'Sin ubicación'} • {person.fecha_nacimiento ? `${new Date().getFullYear() - new Date(person.fecha_nacimiento).getFullYear()} años` : 'N/A'}</span>
                                                            </div>
                                                        </div>
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

                    {/* Right Detail Panel (Ficha Familiar) */}
                    <div className="lg:col-span-4 flex flex-col gap-8">
                        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                            {/* Decorative radial gradient */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="bg-primary/20 p-2 rounded-xl">
                                        <GitBranch className="w-5 h-5 text-primary-300" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white tracking-tight">Ficha Familiar</h3>
                                </div>

                                {selectedComunero ? (
                                    <>
                                        <div className="flex flex-col items-center mb-10 group">
                                            <div className="w-32 h-32 rounded-full p-1.5 border-2 border-dashed border-primary/50 mb-4 group-hover:rotate-6 transition-transform duration-500 bg-white/5 flex items-center justify-center">
                                                <div className="w-full h-full rounded-full border-4 border-primary shadow-2xl overflow-hidden">
                                                    {selectedComunero.foto_url ? (
                                                        <Image
                                                            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/censo/${selectedComunero.foto_url}`}
                                                            alt={selectedComunero.nombres}
                                                            width={128}
                                                            height={128}
                                                            className="w-full h-full object-cover"
                                                            unoptimized
                                                        />
                                                    ) : (
                                                        <User className="w-16 h-16 text-white/10" />
                                                    )}
                                                </div>
                                            </div>
                                            <h4 className="text-2xl font-black text-white text-center">
                                                {selectedComunero.primer_nombre} {selectedComunero.primer_apellido}
                                            </h4>
                                            <p className="text-[10px] text-primary-300 font-black uppercase tracking-[0.3em] mt-2 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 shadow-inner">
                                                {selectedComunero.cargo_autoridad || 'Comunero'}
                                            </p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 shadow-inner">
                                                <p className="text-[10px] text-white/30 uppercase font-black mb-4 tracking-[0.2em] flex items-center gap-2">
                                                    <HeartPulse className="w-3 h-3" /> Información Básica
                                                </p>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between text-xs font-bold">
                                                        <span className="text-white/40 uppercase">Documento</span>
                                                        <span className="text-white">{selectedComunero.tipo_documento} {selectedComunero.numero_documento}</span>
                                                    </div>
                                                    <div className="flex justify-between text-xs font-bold">
                                                        <span className="text-white/40 uppercase">Ocupación</span>
                                                        <span className="text-white">{selectedComunero.ocupacion}</span>
                                                    </div>
                                                    <div className="flex justify-between text-xs font-bold">
                                                        <span className="text-white/40 uppercase">Salud</span>
                                                        <span className="text-white">{selectedComunero.regimen_salud}</span>
                                                    </div>
                                                    <div className="flex justify-between text-xs font-bold">
                                                        <span className="text-white/40 uppercase">Nasayuwe</span>
                                                        <span className="text-white">{selectedComunero.habla_nasayuwe}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-white/5 p-4 rounded-3xl border border-white/5 shadow-inner text-center">
                                                    <p className="text-[9px] text-white/30 uppercase font-black mb-1 tracking-widest">Escolaridad</p>
                                                    <p className="text-[10px] text-white font-bold truncate">{selectedComunero.nivel_escolaridad}</p>
                                                </div>
                                                <div className="bg-white/5 p-4 rounded-3xl border border-white/5 shadow-inner text-center">
                                                    <p className="text-[9px] text-white/30 uppercase font-black mb-1 tracking-widest">Estado Civil</p>
                                                    <p className="text-[10px] text-white font-bold">{selectedComunero.estado_civil}</p>
                                                </div>
                                            </div>

                                            <button className="w-full bg-primary text-white py-4 rounded-[1.5rem] text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-primary/80 transition-all mt-4 shadow-2xl shadow-primary/40 hover:scale-[1.02] active:scale-95 border border-primary/20">
                                                <Award className="w-5 h-5" />
                                                <span>Certificado Pertenencia</span>
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                                        <Users className="w-16 h-16 text-white/5 mb-4" />
                                        <p className="text-white/20 text-xs font-bold uppercase tracking-widest">Selecciona un comunero para ver detalles</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Map Mini Preview */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 h-64 overflow-hidden relative shadow-2xl group cursor-pointer">
                            <div className="absolute inset-0 grayscale contrast-125 opacity-40 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAkHQ-XobgnHAULzTnyR_z7skjJ9J4_3HarVSuNRZxhMxH_enWtkuuSb1QIudn-JjMTCiJpBhtFBvV6fu4wpDo7XynwLr6BDhKOfhgstvHp_h9bn6orY9ulPHeXOoG738MQ4xtepjEXmgkqFS_99LQjpl7Sv_aN5DZK9URhtR7d-oH6HptBQsD5QpUktPhRWTEkG_B3BetLEhM9yiDsMfBPnEAgFjSBzHGwR9znr4mEUdeAkvEF8MG-iZQdmvvlvmibBfage-2-kZ0')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 drop-shadow-lg">Ubicación Geo-Referenciada</p>
                                <div className="flex items-center gap-3 text-white">
                                    <div className="relative">
                                        <div className="absolute -inset-4 bg-primary/40 rounded-full animate-ping opacity-50"></div>
                                        <MapPin className="w-10 h-10 text-primary drop-shadow-[0_0_15px_rgba(25,122,230,0.8)] relative z-10" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg drop-shadow-lg leading-none">Resguardo Wala Kiwe</p>
                                        <p className="text-xs text-white/60 font-medium">Zona Norte del Cauca</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
