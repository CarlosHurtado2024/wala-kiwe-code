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
import { getComuneros } from './fetch-actions';
import { updateComunero } from './update-actions';
import Link from 'next/link';
import {
    X,
    Save,
    Calendar,
    IdCard,
    GraduationCap,
    Accessibility,
    ShieldCheck,
    Languages,
    Briefcase,
    Type,
    Check
} from "lucide-react";

export default function CensoPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [comuneros, setComuneros] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedComunero, setSelectedComunero] = useState<any>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editData, setEditData] = useState<any>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const data = await getComuneros();
        setComuneros(data);
        setLoading(false);
    };

    const handleRowClick = (person: any) => {
        setSelectedComunero(person);
        setEditData({ ...person });
        setIsEditModalOpen(true);
        setIsEditing(false);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editData) return;

        setIsSaving(true);
        try {
            const formData = new FormData();
            // Map the flat data back to the structure expected by updateComunero
            // Note: primerNombre in update-actions comes from primer_nombre in DB
            formData.append("primerNombre", editData.primer_nombre || "");
            formData.append("segundoNombre", editData.segundo_nombre || "");
            formData.append("primerApellido", editData.primer_apellido || "");
            formData.append("segundoApellido", editData.segundo_apellido || "");
            formData.append("direccion", editData.direccion_actual || "");
            formData.append("nivelEscolaridad", editData.nivel_escolaridad || "Sin escolaridad");
            formData.append("ocupacion", editData.ocupacion || "Agricultor");
            formData.append("regimenSalud", editData.regimen_salud || "Subsidiado");
            formData.append("eps", editData.eps || "");
            formData.append("hablaNasayuwe", editData.habla_nasayuwe || "No habla ni entiende");
            formData.append("haSidoAutoridad", editData.ha_sido_autoridad ? "true" : "false");
            formData.append("esAutoridadActualmente", editData.es_autoridad_actualmente ? "true" : "false");
            formData.append("cargoAutoridad", editData.cargo_autoridad || "");
            formData.append("estadoCivil", editData.estado_civil || "Soltero/a");
            formData.append("tieneDiscapacidad", editData.tiene_discapacidad ? "true" : "false");
            formData.append("discapacidades", JSON.stringify(editData.discapacidades || []));

            const result = await updateComunero(editData.id, formData);
            if (result.success) {
                await loadData();
                setIsEditing(false);
                setIsEditModalOpen(false);
                alert("Datos actualizados correctamente");
            } else {
                alert("Error al actualizar: " + result.error);
            }
        } catch (error) {
            console.error(error);
            alert("Error inesperado al actualizar");
        } finally {
            setIsSaving(false);
        }
    };


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
                                                onClick={() => handleRowClick(person)}
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
            {/* Detail & Edit Modal */}
            {isEditModalOpen && editData && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => !isSaving && setIsEditModalOpen(false)}></div>

                    <div className="bg-slate-900/90 border border-white/10 w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col z-10 animate-in zoom-in-95 duration-300">
                        {/* Modal Header */}
                        <div className="p-8 border-b border-white/10 flex items-center justify-between sticky top-0 bg-slate-900/50 backdrop-blur-xl z-20">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                                    <User className="w-8 h-8 text-primary-300" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white tracking-tight">
                                        {editData.primer_nombre} {editData.primer_apellido}
                                    </h3>
                                    <p className="text-[10px] text-white/40 uppercase font-black tracking-[0.2em] mt-1">
                                        Ficha Técnica de Información
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-red-500/20 hover:border-red-500/30 transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 overflow-y-auto p-8 lg:p-10 custom-scrollbar">
                            <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                {/* Left Column: Identity & Contact */}
                                <div className="space-y-10">
                                    <ModalSection title="Identidad de Persona" icon={Type}>
                                        <div className="grid grid-cols-2 gap-4">
                                            <ModalInput label="Primer Nombre" value={editData.primer_nombre} onChange={val => setEditData({ ...editData, primer_nombre: val })} disabled={!isEditing} />
                                            <ModalInput label="Segundo Nombre" value={editData.segundo_nombre} onChange={val => setEditData({ ...editData, segundo_nombre: val })} disabled={!isEditing} />
                                            <ModalInput label="Primer Apellido" value={editData.primer_apellido} onChange={val => setEditData({ ...editData, primer_apellido: val })} disabled={!isEditing} />
                                            <ModalInput label="Segundo Apellido" value={editData.segundo_apellido} onChange={val => setEditData({ ...editData, segundo_apellido: val })} disabled={!isEditing} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-1">Documento</label>
                                                <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white/50 flex gap-2">
                                                    <span className="font-black text-primary-400">{editData.tipo_documento}</span>
                                                    <span>{editData.numero_documento}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-1">Fecha Nacimiento</label>
                                                <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white/50">
                                                    {editData.fecha_nacimiento}
                                                </div>
                                            </div>
                                        </div>
                                    </ModalSection>

                                    <ModalSection title="Ubicación y Vida Social" icon={MapPin}>
                                        <div className="space-y-4">
                                            <ModalInput label="Dirección Actual" value={editData.direccion_actual} onChange={val => setEditData({ ...editData, direccion_actual: val })} disabled={!isEditing} />
                                            <div className="flex flex-col gap-2">
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-1">Estado Civil</label>
                                                <select
                                                    disabled={!isEditing}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50"
                                                    value={editData.estado_civil}
                                                    onChange={e => setEditData({ ...editData, estado_civil: e.target.value })}
                                                >
                                                    <option value="Soltero/a" className="bg-slate-900">Soltero/a</option>
                                                    <option value="Casado/a" className="bg-slate-900">Casado/a</option>
                                                    <option value="Unión Libre" className="bg-slate-900">Unión Libre</option>
                                                    <option value="Viudo/a" className="bg-slate-900">Viudo/a</option>
                                                    <option value="Menor" className="bg-slate-900">Menor</option>
                                                </select>
                                            </div>
                                        </div>
                                    </ModalSection>
                                </div>

                                {/* Right Column: Tech & Culture */}
                                <div className="space-y-10">
                                    <ModalSection title="Formación y Salud" icon={HeartPulse}>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-1">Escolaridad</label>
                                                <select
                                                    disabled={!isEditing}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50"
                                                    value={editData.nivel_escolaridad}
                                                    onChange={e => setEditData({ ...editData, nivel_escolaridad: e.target.value })}
                                                >
                                                    <option className="bg-slate-900">Sin escolaridad</option>
                                                    <option className="bg-slate-900">Preescolar</option>
                                                    <option className="bg-slate-900">Primaria</option>
                                                    <option className="bg-slate-900">Secundaria</option>
                                                    <option className="bg-slate-900">Técnico/Tecnólogo</option>
                                                    <option className="bg-slate-900">Universitario</option>
                                                </select>
                                            </div>
                                            <ModalInput label="Ocupación" value={editData.ocupacion} onChange={val => setEditData({ ...editData, ocupacion: val })} disabled={!isEditing} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-1">Régimen Salud</label>
                                                <select
                                                    disabled={!isEditing}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50"
                                                    value={editData.regimen_salud}
                                                    onChange={e => setEditData({ ...editData, regimen_salud: e.target.value })}
                                                >
                                                    <option className="bg-slate-900">Subsidiado</option>
                                                    <option className="bg-slate-900">Contributivo</option>
                                                    <option className="bg-slate-900">Otro</option>
                                                </select>
                                            </div>
                                            <ModalInput label="EPS" value={editData.eps} onChange={val => setEditData({ ...editData, eps: val })} disabled={!isEditing} />
                                        </div>
                                    </ModalSection>

                                    <ModalSection title="Autoridad y Cultura" icon={ShieldCheck}>
                                        <div className="space-y-4">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-1">Nasayuwe</label>
                                                <select
                                                    disabled={!isEditing}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50"
                                                    value={editData.habla_nasayuwe}
                                                    onChange={e => setEditData({ ...editData, habla_nasayuwe: e.target.value })}
                                                >
                                                    <option className="bg-slate-900">Lo habla fluidamente</option>
                                                    <option className="bg-slate-900">Lo habla poco</option>
                                                    <option className="bg-slate-900">Lo entiende pero no habla</option>
                                                    <option className="bg-slate-900">No habla ni entiende</option>
                                                </select>
                                            </div>

                                            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-bold text-white">Autoridad Activa</p>
                                                    <p className="text-[9px] text-white/40 uppercase font-black">Actualmente ejerce cargo</p>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    disabled={!isEditing}
                                                    checked={editData.es_autoridad_actualmente}
                                                    onChange={e => setEditData({ ...editData, es_autoridad_actualmente: e.target.checked })}
                                                    className="w-8 h-5 rounded-full bg-slate-800 border-white/10 text-primary transition-all disabled:opacity-50 cursor-pointer"
                                                />
                                            </div>

                                            {editData.es_autoridad_actualmente && (
                                                <ModalInput label="Cargo Actual" value={editData.cargo_autoridad} onChange={val => setEditData({ ...editData, cargo_autoridad: val })} disabled={!isEditing} />
                                            )}
                                        </div>
                                    </ModalSection>
                                </div>
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-8 border-t border-white/10 flex justify-end gap-4 bg-slate-900/50 backdrop-blur-xl z-20">
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 hover:border-primary/40 transition-all flex items-center gap-3 shadow-xl"
                                >
                                    <Edit className="w-5 h-5 text-primary-400" />
                                    <span>Actualizar Datos</span>
                                </button>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => { setIsEditing(false); setEditData({ ...selectedComunero }); }}
                                        className="px-8 py-4 rounded-2xl border border-white/10 text-white/40 font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleUpdate}
                                        disabled={isSaving}
                                        className="px-10 py-4 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 border-b-4 border-primary/60 disabled:opacity-50"
                                    >
                                        {isSaving ? (
                                            <>Cargando...</>
                                        ) : (
                                            <>
                                                <Check className="w-5 h-5" />
                                                <span>Guardar Cambios</span>
                                            </>
                                        )}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Subcomponents for Modal
function ModalSection({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) {
    return (
        <div className="relative">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-2 rounded-xl border border-primary/20">
                    <Icon className="w-4 h-4 text-primary-300" />
                </div>
                <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{title}</h4>
            </div>
            {children}
        </div>
    );
}

function ModalInput({ label, value, onChange, disabled, placeholder }: { label: string, value: string, onChange: (val: string) => void, disabled?: boolean, placeholder?: string }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-1">{label}</label>
            <input
                type="text"
                value={value || ""}
                onChange={e => onChange(e.target.value)}
                disabled={disabled}
                placeholder={placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all placeholder:text-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
            />
        </div>
    );
}
