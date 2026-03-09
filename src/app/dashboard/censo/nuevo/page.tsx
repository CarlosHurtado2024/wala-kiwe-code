"use client";

import React, { useState, useEffect } from 'react';
import {
    UserPlus,
    ChevronRight,
    Camera,
    FileText,
    Upload,
    Plus,
    Check,
    AlertCircle,
    Calendar,
    IdCard,
    MapPin,
    HeartPulse,
    Languages,
    Accessibility,
    Briefcase,
    GraduationCap,
    X,
    Type
} from "lucide-react";
import Link from 'next/link';

export default function NuevoComuneroPage() {
    // Form State
    const [formData, setFormData] = useState({
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",
        tipoDocumento: "CC",
        numeroDocumento: "",
        fechaNacimiento: "",
        genero: "M",
        nivelEscolaridad: "Primaria",
        ocupacion: "Agricultor",
        estadoCivil: "Soltero/a",
        direccion: "",
        regimenSalud: "Subsidiado",
        eps: "",
        haSidoAutoridad: false,
        hablaNasayuwe: "Entiende pero no habla",
        discapacidades: [] as string[],
        tieneDiscapacidad: false,
    });

    const [otrasOcupaciones, setOtrasOcupaciones] = useState<string[]>([]);
    const [nuevaOcupacion, setNuevaOcupacion] = useState("");
    const [showNuevaOcupacion, setShowNuevaOcupacion] = useState(false);
    const [esMenor, setEsMenor] = useState(false);

    // Disability Options
    const opcionesDiscapacidad = [
        "Física", "Auditiva", "Visual", "Sordoceguera", "Intelectual", "Psicosocial", "Múltiple"
    ];

    // Occupation Options
    const opcionesOcupacion = ["Agricultor", "Estudiante", "Comerciante", ...otrasOcupaciones];

    // Logic to determine if is minor based on birthdate
    useEffect(() => {
        if (formData.fechaNacimiento) {
            const birthDate = new Date(formData.fechaNacimiento);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            const minor = age < 18;
            setEsMenor(minor);
            if (minor) {
                setFormData(prev => ({ ...prev, estadoCivil: "Menor" }));
            }
        }
    }, [formData.fechaNacimiento]);

    const handleDiscapacidadToggle = (tipo: string) => {
        setFormData(prev => ({
            ...prev,
            discapacidades: prev.discapacidades.includes(tipo)
                ? prev.discapacidades.filter(t => t !== tipo)
                : [...prev.discapacidades, tipo]
        }));
    };

    const handleAddOcupacion = () => {
        if (nuevaOcupacion && !opcionesOcupacion.includes(nuevaOcupacion)) {
            setOtrasOcupaciones([...otrasOcupaciones, nuevaOcupacion]);
            setFormData({ ...formData, ocupacion: nuevaOcupacion });
            setNuevaOcupacion("");
            setShowNuevaOcupacion(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col min-h-0 bg-transparent">
            <main className="flex-1 p-6 lg:p-10 overflow-y-auto custom-scrollbar">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-3 text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                    <Link href="/dashboard" className="hover:text-primary-300 transition-colors">Censo</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-white">Registrar Nuevo Comunero</span>
                </div>

                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center gap-6 mb-12">
                        <div className="bg-primary/20 p-4 rounded-[2rem] border border-primary/30 shadow-[0_0_20px_rgba(var(--primary)/10)]">
                            <UserPlus className="w-8 h-8 text-primary-300" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white tracking-tight">Registro de Comunero</h2>
                            <p className="text-white/40 font-bold text-xs uppercase tracking-widest mt-1">Formulario de Vinculación al Censo Territorial</p>
                        </div>
                    </div>

                    <form className="space-y-10">
                        {/* 1. Información Personal */}
                        <section className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>

                            <div className="flex items-center gap-3 mb-8 relative z-10">
                                <div className="bg-white/5 p-2 rounded-xl border border-white/10">
                                    <Type className="w-4 h-4 text-primary-300" />
                                </div>
                                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Información de Identidad</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                                <InputGroup label="Primer Nombre" required>
                                    <input type="text" className="form-input" placeholder="Ej: Feliciano" value={formData.primerNombre} onChange={e => setFormData({ ...formData, primerNombre: e.target.value })} />
                                </InputGroup>
                                <InputGroup label="Segundo Nombre">
                                    <input type="text" className="form-input" placeholder="Opcional" value={formData.segundoNombre} onChange={e => setFormData({ ...formData, segundoNombre: e.target.value })} />
                                </InputGroup>
                                <InputGroup label="Primer Apellido" required>
                                    <input type="text" className="form-input" placeholder="Ej: Valencia" value={formData.primerApellido} onChange={e => setFormData({ ...formData, primerApellido: e.target.value })} />
                                </InputGroup>
                                <InputGroup label="Segundo Apellido" required>
                                    <input type="text" className="form-input" placeholder="Ej: Tunubalá" value={formData.segundoApellido} onChange={e => setFormData({ ...formData, segundoApellido: e.target.value })} />
                                </InputGroup>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 relative z-10">
                                <InputGroup label="Tipo Documento" required>
                                    <select className="form-input" value={formData.tipoDocumento} onChange={e => setFormData({ ...formData, tipoDocumento: e.target.value })}>
                                        <option value="CC" className="bg-slate-900">Cédula de Ciudadanía</option>
                                        <option value="TI" className="bg-slate-900">Tarjeta de Identidad</option>
                                        <option value="RC" className="bg-slate-900">Registro Civil</option>
                                    </select>
                                </InputGroup>
                                <InputGroup label="Número de Documento" required>
                                    <div className="relative">
                                        <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                        <input type="text" className="form-input pl-10" placeholder="1023XXX" value={formData.numeroDocumento} onChange={e => setFormData({ ...formData, numeroDocumento: e.target.value })} />
                                    </div>
                                </InputGroup>
                                <InputGroup label="Fecha de Nacimiento" required>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                        <input type="date" className="form-input pl-10" value={formData.fechaNacimiento} onChange={e => setFormData({ ...formData, fechaNacimiento: e.target.value })} />
                                    </div>
                                </InputGroup>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 relative z-10">
                                <InputGroup label="Género">
                                    <div className="flex gap-2 p-1 bg-black/20 rounded-xl border border-white/5">
                                        {['M', 'F', 'Otro'].map(g => (
                                            <button key={g} type="button" onClick={() => setFormData({ ...formData, genero: g })} className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${formData.genero === g ? 'bg-primary text-white shadow-lg' : 'text-white/30 hover:text-white'}`}>{g}</button>
                                        ))}
                                    </div>
                                </InputGroup>
                                {!esMenor && (
                                    <InputGroup label="Estado Civil">
                                        <select className="form-input" value={formData.estadoCivil} onChange={e => setFormData({ ...formData, estadoCivil: e.target.value })}>
                                            <option className="bg-slate-900">Soltero/a</option>
                                            <option className="bg-slate-900">Casado/a</option>
                                            <option className="bg-slate-900">Unión Libre</option>
                                            <option className="bg-slate-900">Viudo/a</option>
                                        </select>
                                    </InputGroup>
                                )}
                                <InputGroup label="Dirección Actual">
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                        <input type="text" className="form-input pl-10" placeholder="Vereda X, Sector Y" value={formData.direccion} onChange={e => setFormData({ ...formData, direccion: e.target.value })} />
                                    </div>
                                </InputGroup>
                            </div>
                        </section>

                        {/* 2. Formación y Ocupación */}
                        <section className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="bg-white/5 p-2 rounded-xl border border-white/10">
                                    <GraduationCap className="w-4 h-4 text-primary-300" />
                                </div>
                                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Formación y Ocupación</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputGroup label="Nivel de Escolaridad Actual">
                                    <select className="form-input" value={formData.nivelEscolaridad} onChange={e => setFormData({ ...formData, nivelEscolaridad: e.target.value })}>
                                        <option className="bg-slate-900">Sin escolaridad</option>
                                        <option className="bg-slate-900">Preescolar</option>
                                        <option className="bg-slate-900">Primaria</option>
                                        <option className="bg-slate-900">Secundaria</option>
                                        <option className="bg-slate-900">Técnico/Tecnólogo</option>
                                        <option className="bg-slate-900">Universitario</option>
                                    </select>
                                </InputGroup>

                                <InputGroup label="Ocupación Principal">
                                    <div className="flex gap-2">
                                        <select className="form-input flex-1" value={formData.ocupacion} onChange={e => setFormData({ ...formData, ocupacion: e.target.value })}>
                                            {opcionesOcupacion.map(opt => <option key={opt} className="bg-slate-900">{opt}</option>)}
                                        </select>
                                        <button type="button" onClick={() => setShowNuevaOcupacion(!showNuevaOcupacion)} className="bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/10 text-primary-300 transition-all">
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>
                                    {showNuevaOcupacion && (
                                        <div className="mt-3 flex gap-2 animate-in slide-in-from-top-2 duration-300">
                                            <input type="text" className="form-input flex-1 bg-primary/5 border-primary/20" placeholder="Nueva ocupación..." value={nuevaOcupacion} onChange={e => setNuevaOcupacion(e.target.value)} />
                                            <button type="button" onClick={handleAddOcupacion} className="bg-primary px-4 rounded-xl text-white font-black text-[10px] uppercase">Agregar</button>
                                        </div>
                                    )}
                                </InputGroup>
                            </div>
                        </section>

                        {/* 3. Salud y Cultural */}
                        <section className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="bg-white/5 p-2 rounded-xl border border-white/10">
                                    <HeartPulse className="w-4 h-4 text-primary-300" />
                                </div>
                                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Salud y Cultura</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <InputGroup label="Régimen de Salud">
                                    <select className="form-input" value={formData.regimenSalud} onChange={e => setFormData({ ...formData, regimenSalud: e.target.value })}>
                                        <option className="bg-slate-900">Subsidiado</option>
                                        <option className="bg-slate-900">Contributivo</option>
                                        <option className="bg-slate-900">Otro</option>
                                    </select>
                                </InputGroup>
                                <InputGroup label="EPS">
                                    <input type="text" className="form-input" placeholder="Nombre EPS" value={formData.eps} onChange={e => setFormData({ ...formData, eps: e.target.value })} />
                                </InputGroup>
                                <InputGroup label="Uso de Nasayuwe">
                                    <div className="relative">
                                        <Languages className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                        <select className="form-input pl-10" value={formData.hablaNasayuwe} onChange={e => setFormData({ ...formData, hablaNasayuwe: e.target.value })}>
                                            <option className="bg-slate-900">Lo habla fluidamente</option>
                                            <option className="bg-slate-900">Lo habla poco</option>
                                            <option className="bg-slate-900">Lo entiende pero no habla</option>
                                            <option className="bg-slate-900">No habla ni entiende</option>
                                        </select>
                                    </div>
                                </InputGroup>
                            </div>

                            <div className="mt-10 p-6 bg-white/5 rounded-3xl border border-white/5">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <Accessibility className="w-5 h-5 text-primary-300" />
                                        <span className="text-xs font-black text-white uppercase tracking-widest">¿Tiene alguna discapacidad?</span>
                                    </div>
                                    <input type="checkbox" checked={formData.tieneDiscapacidad} onChange={e => setFormData({ ...formData, tieneDiscapacidad: e.target.checked })} className="w-6 h-6 rounded-lg bg-black/20 border-white/10 text-primary focus:ring-primary/40" />
                                </div>

                                {formData.tieneDiscapacidad && (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-in fade-in duration-500">
                                        {opcionesDiscapacidad.map(opt => (
                                            <button
                                                key={opt} type="button"
                                                onClick={() => handleDiscapacidadToggle(opt)}
                                                className={`py-3 px-4 rounded-xl text-[10px] font-bold border transition-all flex items-center justify-between ${formData.discapacidades.includes(opt) ? 'bg-primary/20 border-primary/40 text-white' : 'bg-black/20 border-white/5 text-white/30 hover:border-white/20'}`}
                                            >
                                                {opt}
                                                {formData.discapacidades.includes(opt) && <Check className="w-3 h-3 text-primary-300" />}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 flex items-center justify-between p-6 bg-primary/5 rounded-3xl border border-primary/10">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="w-6 h-6 text-primary-300" />
                                    <div className="flex flex-col">
                                        <span className="text-white font-bold text-sm">¿Ha sido autoridad del Cabildo?</span>
                                        <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Gobernador, Alguacil, etc.</span>
                                    </div>
                                </div>
                                <input type="checkbox" checked={formData.haSidoAutoridad} onChange={e => setFormData({ ...formData, haSidoAutoridad: e.target.checked })} className="w-10 h-6 rounded-full bg-black/40 border-white/10 text-primary focus:ring-offset-0" />
                            </div>
                        </section>

                        {/* 4. Archivos y Documentación */}
                        <section className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="bg-white/5 p-2 rounded-xl border border-white/10">
                                    <Upload className="w-4 h-4 text-primary-300" />
                                </div>
                                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Archivos y Documentación</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-1">Foto de Perfil</p>
                                    <div className="w-full h-48 rounded-[2rem] border-2 border-dashed border-white/10 bg-black/20 flex flex-col items-center justify-center group hover:border-primary/40 transition-all cursor-pointer">
                                        <div className="bg-primary/10 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform">
                                            <Camera className="w-8 h-8 text-primary-300" />
                                        </div>
                                        <p className="text-xs font-bold text-white/40">Capturar o Subir Foto</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-1">Documentos Personales (PDF, JPG)</p>
                                    <div className="space-y-3">
                                        <FileCard label="Copia de Cédula de Ciudadanía" status="Pending" />
                                        <FileCard label="Certificado de Nacimiento" status="Optional" />
                                        <button type="button" className="w-full py-4 rounded-2xl border-2 border-dashed border-white/5 bg-white/5 text-white/20 text-xs font-bold hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2">
                                            <Plus className="w-4 h-4" /> Agregar otro documento
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 p-5 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex gap-4 items-start">
                                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                <p className="text-[10px] text-amber-200/60 leading-relaxed font-bold uppercase tracking-wider">
                                    Al guardar, se creará automáticamente la carpeta <span className="text-amber-400">"{formData.tipoDocumento}_{formData.numeroDocumento || 'NUMERO'}"</span> en el servidor para almacenar estos archivos de forma privada.
                                </p>
                            </div>
                        </section>

                        {/* Actions */}
                        <div className="flex justify-end gap-4 py-10">
                            <button type="button" className="px-10 py-4 rounded-2xl border border-white/10 text-white/40 font-black text-sm uppercase tracking-[0.2em] hover:bg-white/5 transition-all">Cancelar</button>
                            <button type="submit" className="px-12 py-4 rounded-2xl bg-primary text-white font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all border-b-4 border-primary/60">
                                Guardar Comunero
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

// Subcomponents for cleaner UI
function InputGroup({ label, required, children }: { label: string, required?: boolean, children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-2.5">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1 flex items-center gap-1">
                {label}
                {required && <span className="text-primary-500">*</span>}
            </label>
            {children}
            <style jsx global>{`
        .form-input {
          @apply w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all placeholder:text-white/10;
        }
      `}</style>
        </div>
    );
}

function FileCard({ label, status }: { label: string, status: string }) {
    return (
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-lg text-white/20 group-hover:text-primary-300 transition-colors">
                    <FileText className="w-4 h-4" />
                </div>
                <div>
                    <p className="text-xs font-bold text-white/80">{label}</p>
                    <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">{status}</p>
                </div>
            </div>
            <button type="button" className="p-2 rounded-lg bg-primary/10 text-primary-300 hover:bg-primary hover:text-white transition-all">
                <Upload className="w-4 h-4" />
            </button>
        </div>
    );
}
