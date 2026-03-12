"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
    Users,
    Search,
    UserPlus,
    User,
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
    RefreshCw,
    CheckCircle,
    AlertCircle
} from "lucide-react";

// Toast Component
function Toast({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`toast ${type === 'success' ? 'toast-success' : 'toast-error'}`}>
            {type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{message}</span>
            <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100 transition-opacity">
                <X className="w-3.5 h-3.5" />
            </button>
        </div>
    );
}

const PAGE_SIZE = 15;

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
    const [currentPage, setCurrentPage] = useState(1);
    const [toasts, setToasts] = useState<{ id: number, message: string, type: 'success' | 'error' }[]>([]);

    let toastId = 0;
    const showToast = (message: string, type: 'success' | 'error') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
    };
    const removeToast = (id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

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
                showToast("Datos actualizados correctamente", "success");
            } else {
                showToast("Error al actualizar: " + result.error, "error");
            }
        } catch (error) {
            console.error(error);
            showToast("Error inesperado al actualizar", "error");
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
            showToast("Error en la búsqueda con IA", "error");
        } finally {
            setIsAiSearching(false);
        }
    };

    const handleExport = () => {
        exportToExcel(filteredComuneros, `Censo_Comunitario_${new Date().toISOString().split('T')[0]}.xlsx`);
        showToast("Archivo Excel exportado correctamente", "success");
    };

    const handleSyncAI = async () => {
        setIsSyncing(true);
        try {
            const result = await syncComunerosAI();
            showToast(result.message || "Sincronización completada", "success");
            await loadData();
        } catch (error) {
            console.error(error);
            showToast("Error al sincronizar", "error");
        } finally {
            setIsSyncing(false);
        }
    };

    const filteredComuneros = useMemo(() => {
        return comuneros.filter(c => {
            const searchStr = searchTerm.toLowerCase();
            const fullName = `${c.primer_nombre || ''} ${c.segundo_nombre || ''} ${c.primer_apellido || ''} ${c.segundo_apellido || ''}`.toLowerCase();
            const docNumber = (c.numero_documento || "").toLowerCase();
            return fullName.includes(searchStr) || docNumber.includes(searchStr);
        });
    }, [comuneros, searchTerm]);

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filteredComuneros.length / PAGE_SIZE));
    const paginatedComuneros = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return filteredComuneros.slice(start, start + PAGE_SIZE);
    }, [filteredComuneros, currentPage]);

    // Reset to page 1 when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, comuneros]);

    const getAge = (dateStr: string) => {
        if (!dateStr) return '-';
        const birth = new Date(dateStr);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
        return age;
    };

    return (
        <div className="flex-1 flex flex-col min-h-0 bg-background">
            {/* Toast Container */}
            <div className="toast-container">
                {toasts.map(t => (
                    <Toast key={t.id} message={t.message} type={t.type} onClose={() => removeToast(t.id)} />
                ))}
            </div>

            {/* Header */}
            <header className="h-16 shrink-0 border-b border-border flex items-center justify-between px-6 lg:px-8 bg-card/80 backdrop-blur-sm sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-xl border border-primary/20">
                        <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-foreground leading-tight">Censo Comunitario</h2>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Gestión y registro de comuneros</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Buscar comunero..."
                            className="bg-secondary border border-border rounded-xl pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all text-foreground placeholder:text-muted-foreground"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Link href="/dashboard/censo/nuevo" className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm hover:shadow-md active:scale-95">
                        <UserPlus className="w-4 h-4" />
                        <span className="hidden sm:inline">Nuevo</span>
                    </Link>
                    <button
                        onClick={handleSyncAI}
                        disabled={isSyncing}
                        title="Sincronizar datos con IA"
                        className="p-2 rounded-xl bg-secondary border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6 custom-scrollbar">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-foreground">Nómina de Comuneros</h3>
                        <span className="bg-primary/10 text-primary text-[10px] px-3 py-1 rounded-full border border-primary/20 font-bold uppercase tracking-wider">
                            {filteredComuneros.length} registros {searchMode === "ai" ? "(IA)" : ""}
                        </span>
                    </div>
                    <button
                        onClick={handleExport}
                        className="bg-secondary hover:bg-muted text-foreground text-sm font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition-all border border-border hover:border-primary/30"
                    >
                        <FileSpreadsheet className="w-4 h-4" />
                        <span className="hidden sm:inline">Exportar Excel</span>
                    </button>
                </div>

                {/* Table */}
                <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="border-b border-border bg-secondary/50">
                                    <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Comunero</th>
                                    <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Documento</th>
                                    <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground text-center">Género</th>
                                    <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground text-center">Edad</th>
                                    <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Ubicación</th>
                                    <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Rol</th>
                                    <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {loading ? (
                                    <tr>
                                        <td colSpan={7} className="px-5 py-12 text-center">
                                            <div className="flex items-center justify-center gap-3 text-muted-foreground">
                                                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                                                <span className="text-sm font-medium">Cargando comuneros...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : paginatedComuneros.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-5 py-12 text-center text-muted-foreground text-sm font-medium">
                                            No se encontraron registros
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedComuneros.map((person) => (
                                        <tr
                                            key={person.id}
                                            onClick={() => handleRowClick(person)}
                                            className="hover:bg-primary/[0.03] transition-colors group cursor-pointer"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                                                        <User className="w-4 h-4 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                                                            {person.primer_nombre} {person.primer_apellido}
                                                        </p>
                                                        {person.segundo_nombre && (
                                                            <p className="text-[11px] text-muted-foreground">{person.segundo_nombre} {person.segundo_apellido}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className="text-xs text-muted-foreground mr-1">{person.tipo_documento}</span>
                                                <span className="text-xs font-semibold text-foreground/80">{person.numero_documento}</span>
                                            </td>
                                            <td className="px-5 py-4 text-center">
                                                <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-md ${person.genero === 'M' ? 'bg-blue-500/10 text-blue-600' : person.genero === 'F' ? 'bg-pink-500/10 text-pink-600' : 'bg-secondary text-muted-foreground'}`}>
                                                    {person.genero || '-'}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-center text-xs font-semibold text-foreground">
                                                {getAge(person.fecha_nacimiento)}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground max-w-[140px]">
                                                    <MapPin className="w-3 h-3 shrink-0" />
                                                    <span className="truncate">{person.direccion_actual || 'No registrada'}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className="text-[10px] px-2.5 py-1 rounded-md bg-secondary text-muted-foreground font-bold uppercase border border-border">
                                                    {person.cargo_autoridad || person.ocupacion || 'Comunero'}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex justify-end gap-1.5">
                                                    <button className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/15 hover:bg-primary hover:text-white transition-all" title="Certificado">
                                                        <Award className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button className="p-1.5 rounded-lg bg-secondary text-muted-foreground border border-border hover:bg-muted hover:text-foreground transition-all" title="Editar">
                                                        <Edit className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Functional Pagination */}
                    <div className="px-5 py-4 bg-secondary/30 border-t border-border flex items-center justify-between">
                        <p className="text-xs text-muted-foreground font-medium">
                            Mostrando {((currentPage - 1) * PAGE_SIZE) + 1}–{Math.min(currentPage * PAGE_SIZE, filteredComuneros.length)} de {filteredComuneros.length}
                        </p>
                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all bg-card disabled:opacity-30"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum: number;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${currentPage === pageNum
                                            ? 'bg-primary text-primary-foreground shadow-sm'
                                            : 'border border-border text-muted-foreground hover:text-foreground hover:bg-muted bg-card'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all bg-card disabled:opacity-30"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detail & Edit Modal */}
            {isEditModalOpen && editData && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8 animate-fade-in">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !isSaving && setIsEditModalOpen(false)} />

                    <div className="bg-card border border-border w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl relative overflow-hidden flex flex-col z-10 animate-scale-in">
                        {/* Modal Header */}
                        <div className="px-6 py-5 border-b border-border flex items-center justify-between sticky top-0 bg-card z-20">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                    <User className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground tracking-tight">
                                        {editData.primer_nombre} {editData.primer_apellido}
                                    </h3>
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.15em] mt-0.5">
                                        Ficha de Información
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="p-2 rounded-xl bg-secondary border border-border text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
                            <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Column */}
                                <div className="space-y-8">
                                    <ModalSection title="Identidad" icon={Type}>
                                        <div className="grid grid-cols-2 gap-3">
                                            <ModalInput label="Primer Nombre" value={editData.primer_nombre} onChange={val => setEditData({ ...editData, primer_nombre: val })} disabled={!isEditing} />
                                            <ModalInput label="Segundo Nombre" value={editData.segundo_nombre} onChange={val => setEditData({ ...editData, segundo_nombre: val })} disabled={!isEditing} />
                                            <ModalInput label="Primer Apellido" value={editData.primer_apellido} onChange={val => setEditData({ ...editData, primer_apellido: val })} disabled={!isEditing} />
                                            <ModalInput label="Segundo Apellido" value={editData.segundo_apellido} onChange={val => setEditData({ ...editData, segundo_apellido: val })} disabled={!isEditing} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 mt-3">
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Documento</label>
                                                <div className="bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground/80 flex gap-2">
                                                    <span className="font-bold text-primary">{editData.tipo_documento}</span>
                                                    <span>{editData.numero_documento}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Nacimiento</label>
                                                <div className="bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground/80">
                                                    {editData.fecha_nacimiento}
                                                </div>
                                            </div>
                                        </div>
                                    </ModalSection>

                                    <ModalSection title="Ubicación" icon={MapPin}>
                                        <div className="space-y-3">
                                            <ModalInput label="Dirección Actual" value={editData.direccion_actual} onChange={val => setEditData({ ...editData, direccion_actual: val })} disabled={!isEditing} />
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Estado Civil</label>
                                                <select
                                                    disabled={!isEditing}
                                                    className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50"
                                                    value={editData.estado_civil}
                                                    onChange={e => setEditData({ ...editData, estado_civil: e.target.value })}
                                                >
                                                    <option value="Soltero/a">Soltero/a</option>
                                                    <option value="Casado/a">Casado/a</option>
                                                    <option value="Unión Libre">Unión Libre</option>
                                                    <option value="Viudo/a">Viudo/a</option>
                                                    <option value="Menor">Menor</option>
                                                </select>
                                            </div>
                                        </div>
                                    </ModalSection>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-8">
                                    <ModalSection title="Formación y Salud" icon={HeartPulse}>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Escolaridad</label>
                                                <select disabled={!isEditing} className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50" value={editData.nivel_escolaridad} onChange={e => setEditData({ ...editData, nivel_escolaridad: e.target.value })}>
                                                    <option>Sin escolaridad</option>
                                                    <option>Preescolar</option>
                                                    <option>Primaria</option>
                                                    <option>Secundaria</option>
                                                    <option>Técnico/Tecnólogo</option>
                                                    <option>Universitario</option>
                                                </select>
                                            </div>
                                            <ModalInput label="Ocupación" value={editData.ocupacion} onChange={val => setEditData({ ...editData, ocupacion: val })} disabled={!isEditing} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 mt-3">
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Régimen Salud</label>
                                                <select disabled={!isEditing} className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50" value={editData.regimen_salud} onChange={e => setEditData({ ...editData, regimen_salud: e.target.value })}>
                                                    <option>Subsidiado</option>
                                                    <option>Contributivo</option>
                                                    <option>Otro</option>
                                                </select>
                                            </div>
                                            <ModalInput label="EPS" value={editData.eps} onChange={val => setEditData({ ...editData, eps: val })} disabled={!isEditing} />
                                        </div>
                                    </ModalSection>

                                    <ModalSection title="Autoridad y Cultura" icon={ShieldCheck}>
                                        <div className="space-y-3">
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Nasayuwe</label>
                                                <select disabled={!isEditing} className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50" value={editData.habla_nasayuwe} onChange={e => setEditData({ ...editData, habla_nasayuwe: e.target.value })}>
                                                    <option>Lo habla fluidamente</option>
                                                    <option>Lo habla poco</option>
                                                    <option>Lo entiende pero no habla</option>
                                                    <option>No habla ni entiende</option>
                                                </select>
                                            </div>

                                            <div className="p-3 bg-primary/5 rounded-xl border border-primary/15 flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-bold text-foreground">Autoridad Activa</p>
                                                    <p className="text-[9px] text-muted-foreground uppercase font-bold">Ejerce cargo actualmente</p>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    disabled={!isEditing}
                                                    checked={editData.es_autoridad_actualmente}
                                                    onChange={e => setEditData({ ...editData, es_autoridad_actualmente: e.target.checked })}
                                                    className="w-7 h-4 rounded-full bg-muted border-border text-primary transition-all disabled:opacity-50 cursor-pointer"
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
                        <div className="px-6 py-4 border-t border-border flex justify-end gap-3 bg-card z-20">
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-6 py-2.5 rounded-xl bg-secondary border border-border text-foreground font-bold text-xs uppercase tracking-wider hover:bg-muted transition-all flex items-center gap-2"
                                >
                                    <Edit className="w-4 h-4 text-primary" />
                                    Actualizar Datos
                                </button>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => { setIsEditing(false); setEditData({ ...selectedComunero }); }}
                                        className="px-6 py-2.5 rounded-xl border border-border text-muted-foreground font-bold text-xs uppercase tracking-wider hover:bg-muted transition-all bg-card"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleUpdate}
                                        disabled={isSaving}
                                        className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider shadow-sm hover:bg-primary/90 transition-all flex items-center gap-2 disabled:opacity-50"
                                    >
                                        {isSaving ? (
                                            <><Loader2 className="w-4 h-4 animate-spin" /> Guardando...</>
                                        ) : (
                                            <><Check className="w-4 h-4" /> Guardar</>
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

// Subcomponents
function ModalSection({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) {
    return (
        <div>
            <div className="flex items-center gap-2.5 mb-4">
                <div className="bg-primary/10 p-1.5 rounded-lg border border-primary/15">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                </div>
                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">{title}</h4>
            </div>
            {children}
        </div>
    );
}

function ModalInput({ label, value, onChange, disabled, placeholder }: { label: string, value: string, onChange: (val: string) => void, disabled?: boolean, placeholder?: string }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">{label}</label>
            <input
                type="text"
                value={value || ""}
                onChange={e => onChange(e.target.value)}
                disabled={disabled}
                placeholder={placeholder}
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all placeholder:text-muted-foreground/50 disabled:opacity-50 disabled:cursor-not-allowed"
            />
        </div>
    );
}
