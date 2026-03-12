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
import { getComuneros, searchComunerosAI } from './fetch-actions';
import { updateComunero } from './update-actions';
import { syncComunerosAI } from './sync-actions';
import { exportToExcel } from '@/utils/excel';
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
    Check,
    Send,
    Sparkles,
    Loader2,
    FileSpreadsheet,
    RefreshCw
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
    const [aiQuery, setAiQuery] = useState("");
    const [aiAnswer, setAiAnswer] = useState("");
    const [isAiSearching, setIsAiSearching] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [searchMode, setSearchMode] = useState<"standard" | "ai">("standard");

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
    const handleAiSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!aiQuery.trim()) {
            setSearchMode("standard");
            await loadData();
            return;
        }

        setIsAiSearching(true);
        setSearchMode("ai");
        setAiAnswer("");
        try {
            const { results, answer } = await searchComunerosAI(aiQuery);
            setComuneros(results);
            setAiAnswer(answer);
        } catch (error) {
            console.error(error);
            alert("Error en la búsqueda con IA. Verifica la GEMINI_API_KEY.");
        } finally {
            setIsAiSearching(false);
        }
    };

    const handleExport = () => {
        exportToExcel(filteredComuneros, `Censo_Comunitario_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const handleSyncAI = async () => {
        setIsSyncing(true);
        try {
            const result = await syncComunerosAI();
            alert(result.message);
            await loadData();
        } catch (error) {
            console.error(error);
            alert("Error al sincronizar");
        } finally {
            setIsSyncing(false);
        }
    };

    const filteredComuneros = comuneros.filter(c => {
        const searchStr = searchTerm.toLowerCase();
        const fullName = `${c.primer_nombre || ''} ${c.segundo_nombre || ''} ${c.primer_apellido || ''} ${c.segundo_apellido || ''}`.toLowerCase();
        const legacyName = `${c.nombres || ''} ${c.apellidos || ''}`.toLowerCase();
        const docNumber = (c.numero_documento || "").toLowerCase();

        return fullName.includes(searchStr) ||
            legacyName.includes(searchStr) ||
            docNumber.includes(searchStr);
    });

    return (
        <div className="flex-1 flex flex-col min-h-0 bg-background">
            {/* Header */}
            <header className="h-20 shrink-0 border-b border-border flex items-center justify-between px-8 bg-card sticky top-0 z-20 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-xl border border-primary/20">
                        <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-foreground">Módulo de Censo</h2>
                        <p className="text-xs text-muted-foreground font-medium">Gestión y registro de la comunidad</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Buscar comunero..."
                            className="bg-secondary border border-border rounded-xl pl-10 pr-4 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-foreground placeholder:text-muted-foreground"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Link href="/dashboard/censo/nuevo" className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm hover:scale-[1.02] active:scale-95">
                        <UserPlus className="w-4 h-4" />
                        <span>Nuevo Comunero</span>
                    </Link>
                    <button
                        onClick={handleSyncAI}
                        disabled={isSyncing}
                        title="Sincronizar datos con la IA"
                        className="p-2.5 rounded-xl bg-secondary border border-border text-foreground hover:bg-muted transition-colors disabled:opacity-50"
                    >
                        <RefreshCw className={`w-5 h-5 ${isSyncing ? 'animate-spin' : ''}`} />
                    </button>
                    <button className="p-2.5 rounded-xl bg-secondary border border-border text-foreground hover:bg-muted transition-colors">
                        <Bell className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth custom-scrollbar">

                {/* Main Content Grid: Table + Detail Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* List View (Table) */}
                    <div className="lg:col-span-12 flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <h3 className="text-xl font-bold text-foreground">Nómina de Comuneros</h3>
                                <span className="bg-accent/20 text-accent-foreground text-[10px] px-3 py-1 rounded-full border border-accent/30 font-bold uppercase tracking-wider">
                                    {filteredComuneros.length} Registros {searchMode === "ai" ? "(Filtrados por IA)" : ""}
                                </span>
                            </div>
                            <button
                                onClick={handleExport}
                                className="bg-accent/20 hover:bg-accent/30 text-accent-foreground text-sm font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition-all group border border-accent/30"
                            >
                                <FileSpreadsheet className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span>Exportar a Excel</span>
                            </button>
                        </div>

                        <div className="bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-border bg-secondary/50">
                                        <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Comunero</th>
                                        <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Documento</th>
                                        <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground text-center">Género</th>
                                        <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground text-center">Edad</th>
                                        <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Ubicación</th>
                                        <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Ocupación / Rol</th>
                                        <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Estado</th>
                                        <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={8} className="px-6 py-10 text-center text-muted-foreground font-bold uppercase tracking-widest text-xs">
                                                Cargando comuneros...
                                            </td>
                                        </tr>
                                    ) : filteredComuneros.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="px-6 py-10 text-center text-muted-foreground font-bold uppercase tracking-widest text-xs">
                                                No se encontraron registros
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredComuneros.map((person) => (
                                            <tr
                                                key={person.id}
                                                onClick={() => handleRowClick(person)}
                                                className="hover:bg-secondary/50 transition-all group cursor-pointer"
                                            >
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                                            <User className="w-5 h-5 text-primary" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                                                {person.nombres} {person.apellidos}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-xs font-bold text-foreground/80">
                                                    <span className="text-[10px] text-muted-foreground mr-1.5">{person.tipo_documento}</span>
                                                    {person.numero_documento}
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${person.genero === 'M' ? 'bg-blue-500/10 text-blue-600' : person.genero === 'F' ? 'bg-pink-500/10 text-pink-600' : 'bg-secondary text-muted-foreground'}`}>
                                                        {person.genero || '-'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-center text-xs font-bold text-foreground">
                                                    {person.fecha_nacimiento ? `${new Date().getFullYear() - new Date(person.fecha_nacimiento).getFullYear()}` : '-'}
                                                </td>
                                                <td className="px-6 py-5 text-xs text-muted-foreground">
                                                    <div className="flex items-center gap-2 max-w-[150px]">
                                                        <MapPin className="w-3 h-3 shrink-0" />
                                                        <span className="truncate">{person.direccion_actual || 'No registrada'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className="text-[10px] px-3 py-1.5 rounded-xl bg-secondary text-muted-foreground font-black uppercase border border-border tracking-widest group-hover:border-primary/30 transition-colors">
                                                        {person.cargo_autoridad || person.ocupacion || 'Comunero'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                                                        <span className="text-[10px] font-black uppercase text-accent-foreground tracking-widest">Activo</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex justify-end gap-2">
                                                        <button className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all shadow-sm" title="Certificado">
                                                            <Award className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 rounded-xl bg-secondary text-muted-foreground border border-border hover:bg-muted hover:text-foreground transition-all shadow-sm" title="Editar">
                                                            <Edit className="w-4 h-4" />
                                                        </button>

                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>

                            <div className="p-6 bg-secondary/50 border-t border-border flex items-center justify-between">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Página 1 de 125</p>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all bg-card">
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-2xl bg-primary text-white font-black shadow-sm border border-primary/20 text-xs translate-y-[-2px]">
                                        1
                                    </button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all text-xs font-bold bg-card">
                                        2
                                    </button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all bg-card">
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
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !isSaving && setIsEditModalOpen(false)}></div>

                    <div className="bg-card border border-border w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col z-10 animate-in zoom-in-95 duration-300">
                        {/* Modal Header */}
                        <div className="p-8 border-b border-border flex items-center justify-between sticky top-0 bg-card/90 backdrop-blur-xl z-20">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                    <User className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-foreground tracking-tight">
                                        {editData.primer_nombre} {editData.primer_apellido}
                                    </h3>
                                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em] mt-1">
                                        Ficha Técnica de Información
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="p-3 rounded-2xl bg-secondary border border-border text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
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
                                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Documento</label>
                                                <div className="bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground/80 flex gap-2">
                                                    <span className="font-black text-primary">{editData.tipo_documento}</span>
                                                    <span>{editData.numero_documento}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Fecha Nacimiento</label>
                                                <div className="bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground/80">
                                                    {editData.fecha_nacimiento}
                                                </div>
                                            </div>
                                        </div>
                                    </ModalSection>

                                    <ModalSection title="Ubicación y Vida Social" icon={MapPin}>
                                        <div className="space-y-4">
                                            <ModalInput label="Dirección Actual" value={editData.direccion_actual} onChange={val => setEditData({ ...editData, direccion_actual: val })} disabled={!isEditing} />
                                            <div className="flex flex-col gap-2">
                                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Estado Civil</label>
                                                <select
                                                    disabled={!isEditing}
                                                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50"
                                                    value={editData.estado_civil}
                                                    onChange={e => setEditData({ ...editData, estado_civil: e.target.value })}
                                                >
                                                    <option value="Soltero/a" className="bg-card">Soltero/a</option>
                                                    <option value="Casado/a" className="bg-card">Casado/a</option>
                                                    <option value="Unión Libre" className="bg-card">Unión Libre</option>
                                                    <option value="Viudo/a" className="bg-card">Viudo/a</option>
                                                    <option value="Menor" className="bg-card">Menor</option>
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
                                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Escolaridad</label>
                                                <select
                                                    disabled={!isEditing}
                                                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50"
                                                    value={editData.nivel_escolaridad}
                                                    onChange={e => setEditData({ ...editData, nivel_escolaridad: e.target.value })}
                                                >
                                                    <option className="bg-card">Sin escolaridad</option>
                                                    <option className="bg-card">Preescolar</option>
                                                    <option className="bg-card">Primaria</option>
                                                    <option className="bg-card">Secundaria</option>
                                                    <option className="bg-card">Técnico/Tecnólogo</option>
                                                    <option className="bg-card">Universitario</option>
                                                </select>
                                            </div>
                                            <ModalInput label="Ocupación" value={editData.ocupacion} onChange={val => setEditData({ ...editData, ocupacion: val })} disabled={!isEditing} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Régimen Salud</label>
                                                <select
                                                    disabled={!isEditing}
                                                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50"
                                                    value={editData.regimen_salud}
                                                    onChange={e => setEditData({ ...editData, regimen_salud: e.target.value })}
                                                >
                                                    <option className="bg-card">Subsidiado</option>
                                                    <option className="bg-card">Contributivo</option>
                                                    <option className="bg-card">Otro</option>
                                                </select>
                                            </div>
                                            <ModalInput label="EPS" value={editData.eps} onChange={val => setEditData({ ...editData, eps: val })} disabled={!isEditing} />
                                        </div>
                                    </ModalSection>

                                    <ModalSection title="Autoridad y Cultura" icon={ShieldCheck}>
                                        <div className="space-y-4">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Nasayuwe</label>
                                                <select
                                                    disabled={!isEditing}
                                                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50"
                                                    value={editData.habla_nasayuwe}
                                                    onChange={e => setEditData({ ...editData, habla_nasayuwe: e.target.value })}
                                                >
                                                    <option className="bg-card">Lo habla fluidamente</option>
                                                    <option className="bg-card">Lo habla poco</option>
                                                    <option className="bg-card">Lo entiende pero no habla</option>
                                                    <option className="bg-card">No habla ni entiende</option>
                                                </select>
                                            </div>

                                            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20 flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-bold text-foreground">Autoridad Activa</p>
                                                    <p className="text-[9px] text-muted-foreground uppercase font-black">Actualmente ejerce cargo</p>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    disabled={!isEditing}
                                                    checked={editData.es_autoridad_actualmente}
                                                    onChange={e => setEditData({ ...editData, es_autoridad_actualmente: e.target.checked })}
                                                    className="w-8 h-5 rounded-full bg-muted border-border text-primary transition-all disabled:opacity-50 cursor-pointer"
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
                        <div className="p-8 border-t border-border flex justify-end gap-4 bg-card/90 backdrop-blur-xl z-20">
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-10 py-4 rounded-2xl bg-secondary border border-border text-foreground font-black text-xs uppercase tracking-widest hover:bg-muted transition-all flex items-center gap-3 shadow-sm"
                                >
                                    <Edit className="w-5 h-5 text-primary" />
                                    <span>Actualizar Datos</span>
                                </button>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => { setIsEditing(false); setEditData({ ...selectedComunero }); }}
                                        className="px-8 py-4 rounded-2xl border border-border text-muted-foreground font-black text-xs uppercase tracking-widest hover:bg-muted transition-all bg-card"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleUpdate}
                                        disabled={isSaving}
                                        className="px-10 py-4 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-3 border-b-4 border-primary/60 disabled:opacity-50"
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
                    <Icon className="w-4 h-4 text-primary" />
                </div>
                <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{title}</h4>
            </div>
            {children}
        </div>
    );
}

function ModalInput({ label, value, onChange, disabled, placeholder }: { label: string, value: string, onChange: (val: string) => void, disabled?: boolean, placeholder?: string }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">{label}</label>
            <input
                type="text"
                value={value || ""}
                onChange={e => onChange(e.target.value)}
                disabled={disabled}
                placeholder={placeholder}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all placeholder:text-muted-foreground/50 disabled:opacity-50 disabled:cursor-not-allowed"
            />
        </div>
    );
}
