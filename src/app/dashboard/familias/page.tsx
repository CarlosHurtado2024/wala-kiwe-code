"use client";

import React, { useState } from 'react';
import {
    GitBranch,
    Search,
    Plus,
    Users,
    Home,
    MapPin,
    MoreVertical,
    Edit,
    Trash,
    User,
    ArrowRight,
    TrendingUp,
    LayoutGrid,
    List as ListIcon,
    ChevronRight,
    ShieldCheck,
    FileText
} from "lucide-react";

export default function FamiliasPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [viewType, setViewType] = useState('grid');

    const stats = [
        { label: "Total Familias", value: "312", trend: "+5 este trimestre", icon: Home, color: "text-primary-300" },
        { label: "Promedio Integrantes", value: "4.2", trend: "Datos Censo", icon: Users, color: "text-blue-400" },
        { label: "Familias Nuevas", value: "12", trend: "Último año", icon: TrendingUp, color: "text-emerald-400" },
        { label: "Veredas Cubiertas", value: "8", trend: "Todo el Territorio", icon: MapPin, color: "text-amber-400" },
    ];

    const families = [
        {
            id: "WK-F001",
            name: "Familia Valencia",
            head: "Feliciano Valencia",
            members: 4,
            vereda: "El Centro",
            status: "Registrada",
            lastUpdate: "hace 2 días"
        },
        {
            id: "WK-F002",
            name: "Familia Guejia",
            head: "Rosa Elvira Guejia",
            members: 5,
            vereda: "La Montaña",
            status: "Registrada",
            lastUpdate: "hace 1 semana"
        },
        {
            id: "WK-F003",
            name: "Familia Tunubalá",
            head: "Humberto Tunubalá",
            members: 3,
            vereda: "El Río",
            status: "Pendiente Revisión",
            lastUpdate: "hace 3 días"
        },
        {
            id: "WK-F004",
            name: "Familia Vitonás",
            head: "Juan Carlos Vitonás",
            members: 6,
            vereda: "El Centro",
            status: "Registrada",
            lastUpdate: "hoy"
        },
    ];

    return (
        <div className="flex-1 flex flex-col min-h-0 bg-transparent">
            {/* Dynamic Header */}
            <header className="h-24 shrink-0 border-b border-white/10 flex items-center justify-between px-8 bg-white/5 backdrop-blur-md sticky top-0 z-20">
                <div className="flex items-center gap-5">
                    <div className="bg-primary/20 p-3 rounded-2xl border border-primary/30 shadow-[0_0_15px_rgba(var(--primary)/10)]">
                        <GitBranch className="w-7 h-7 text-primary-300" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tight drop-shadow-md">Gestión de Familias</h2>
                        <p className="text-xs text-white/40 font-bold uppercase tracking-widest mt-0.5">Módulo de Organización Territorial</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group overflow-hidden rounded-2xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 group-focus-within:text-white transition-all" />
                        <input
                            type="text"
                            placeholder="Buscar por apellido o código..."
                            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl pl-11 pr-5 py-3 text-sm w-80 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white/15 transition-all text-white placeholder-white/20 backdrop-blur-xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-2xl text-sm font-black flex items-center gap-2 transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 border border-primary/20">
                        <Plus className="w-5 h-5 font-black" />
                        <span>Crear Familia</span>
                    </button>
                </div>
            </header>

            {/* Main Container */}
            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                {/* KPI Stats section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="group relative bg-white/5 backdrop-blur-[40px] border border-white/10 p-7 rounded-[2.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/10 transition-all duration-500 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-primary/10 transition-colors"></div>
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-4 rounded-2xl bg-black/20 border border-white/10 ${stat.color} shadow-inner`}>
                                    <stat.icon className="w-7 h-7" />
                                </div>
                                <ShieldCheck className="w-4 h-4 text-white/20 group-hover:text-primary-300 transition-colors" />
                            </div>
                            <div>
                                <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                                <p className="text-4xl font-black text-white drop-shadow-sm">{stat.value}</p>
                                <div className="mt-4 flex items-center gap-2">
                                    <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className={`h-full bg-primary/40 w-full animate-pulse-slow`}></div>
                                    </div>
                                    <span className="text-[10px] font-black text-emerald-400 drop-shadow-sm">{stat.trend}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters and View Management */}
                <section className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute left-[-2rem] top-[-2rem] w-48 h-48 bg-primary/5 rounded-full blur-[80px]" />

                    <div className="flex items-center gap-8 relative z-10">
                        <div className="flex flex-col gap-1.5">
                            <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Filtro Territorial</span>
                            <select className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-xs font-bold focus:ring-2 focus:ring-primary/40 outline-none text-white/80 cursor-pointer hover:bg-white/10 transition-all">
                                <option className="bg-slate-900">Todas las Veredas</option>
                                <option className="bg-slate-900">Vereda El Centro</option>
                                <option className="bg-slate-900">Vereda La Montaña</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Estado Registro</span>
                            <div className="flex gap-2">
                                {['Todos', 'Vigentes', 'Incompletos'].map(f => (
                                    <button key={f} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all border ${f === 'Todos' ? 'bg-primary/20 text-white border-primary/30' : 'text-white/30 border-white/5 hover:border-white/20'}`}>{f}</button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 relative z-10">
                        <div className="flex bg-black/30 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
                            <button
                                onClick={() => setViewType('grid')}
                                className={`p-2.5 rounded-xl transition-all ${viewType === 'grid' ? 'bg-primary shadow-lg text-white' : 'text-white/30 hover:text-white'}`}>
                                <LayoutGrid className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewType('list')}
                                className={`p-2.5 rounded-xl transition-all ${viewType === 'list' ? 'bg-primary shadow-lg text-white' : 'text-white/30 hover:text-white'}`}>
                                <ListIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Families Grid/List View */}
                <div className={viewType === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10" : "flex flex-col gap-4 pb-10"}>
                    {families.map((family) => (
                        <div key={family.id} className={`group relative ${viewType === 'grid' ? 'bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl hover:bg-white/10 transition-all duration-500' : 'bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all'}`}>
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className={viewType === 'grid' ? "flex flex-col h-full" : "flex items-center gap-8 w-full"}>
                                <div className={viewType === 'grid' ? "flex justify-between items-start mb-6" : "flex items-center gap-5 w-48 shrink-0"}>
                                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center font-black text-primary-300 shadow-xl">
                                        {family.id.split('-')[1]}
                                    </div>
                                    {viewType === 'grid' && (
                                        <button className="text-white/20 hover:text-white transition-colors">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>

                                <div className={viewType === 'grid' ? "flex-1" : "flex-1 flex items-center justify-between gap-10"}>
                                    <div className={viewType === 'grid' ? "mb-6" : ""}>
                                        <h4 className="text-xl font-black text-white mb-1 group-hover:text-primary-300 transition-colors uppercase tracking-tight">{family.name}</h4>
                                        <p className="text-xs text-white/50 font-bold flex items-center gap-2">
                                            <User className="w-3 h-3 text-primary-400" />
                                            Cabeza: <span className="text-white/70">{family.head}</span>
                                        </p>
                                    </div>

                                    <div className={viewType === 'grid' ? "grid grid-cols-2 gap-4 mt-auto" : "flex items-center gap-12"}>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Integrantes</span>
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4 text-blue-400" />
                                                <span className="text-sm font-black text-white">{family.members}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Ubicación</span>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-amber-400" />
                                                <span className="text-sm font-bold text-white/70">{family.vereda}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={viewType === 'grid' ? "mt-8 pt-6 border-t border-white/5 flex items-center justify-between" : "flex items-center gap-4 shrink-0"}>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${family.status.includes('Registrada') ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`} />
                                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{family.status}</span>
                                    </div>
                                    <button className="p-3 rounded-xl bg-white/5 hover:bg-primary/20 text-white/40 hover:text-white transition-all border border-transparent hover:border-primary/20">
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Action Hint */}
            <div className="fixed bottom-8 right-8 z-30">
                <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-[0_15px_35px_rgba(var(--primary)/40)] flex items-center gap-3 active:scale-95 transition-all border-2 border-white/20 backdrop-blur-md">
                    <FileText className="w-5 h-5" />
                    <span>Emitir Certificados Grupales</span>
                </button>
            </div>
        </div>
    );
}
