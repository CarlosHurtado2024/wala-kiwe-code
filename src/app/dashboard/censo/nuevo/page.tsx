"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
    UserPlus,
    ChevronRight,
    Camera,
    FileText,
    Upload,
    Plus,
    Check,
    ShieldCheck,
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
import { useRouter } from 'next/navigation';
import { registrarComunero } from './actions';

export default function NuevoComuneroPage() {
    const router = useRouter();
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
        esAutoridadActualmente: false,
        cargoAutoridad: "",
        hablaNasayuwe: "Entiende pero no habla",
        discapacidades: [] as string[],
        tieneDiscapacidad: false,
    });

    const [otrasOcupaciones, setOtrasOcupaciones] = useState<string[]>([]);
    const [nuevaOcupacion, setNuevaOcupacion] = useState("");
    const [showNuevaOcupacion, setShowNuevaOcupacion] = useState(false);
    const [esMenor, setEsMenor] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // File handled states
    const [foto, setFoto] = useState<File | null>(null);
    const [fotoPreview, setFotoPreview] = useState<string | null>(null);
    const [documentos, setDocumentos] = useState<File[]>([]);

    const fotoInputRef = useRef<HTMLInputElement>(null);
    const docsInputRef = useRef<HTMLInputElement>(null);

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

    const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFoto(file);
            const previewUrl = URL.createObjectURL(file);
            setFotoPreview(previewUrl);
        }
    };

    const handleDocsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setDocumentos(prev => [...prev, ...files]);
    };

    const removeDoc = (index: number) => {
        setDocumentos(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.primerNombre || !formData.numeroDocumento) {
            alert("Por favor completa los campos obligatorios");
            return;
        }

        setIsSubmitting(true);
        try {
            const formDataToSend = new FormData();

            // Append data
            Object.entries(formData).forEach(([key, value]) => {
                if (key === 'discapacidades') {
                    formDataToSend.append(key, JSON.stringify(value));
                } else {
                    formDataToSend.append(key, value.toString());
                }
            });

            // Append files
            if (foto) formDataToSend.append('foto', foto);
            documentos.forEach(doc => {
                formDataToSend.append('documentos', doc);
            });

            const result = await registrarComunero(formDataToSend);

            if (result.success) {
                // Success feedback
                alert("Comunero registrado exitosamente");
                router.push("/dashboard/censo");
            } else {
                alert("Error al registrar: " + result.error);
            }
        } catch (error: any) {
            console.error("Error completo:", error);
            alert(`Ocurrió un error inesperado: ${error.message || 'Sin mensaje'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col min-h-0 bg-transparent">
            <main className="flex-1 p-6 lg:p-10 overflow-y-auto custom-scrollbar">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-foreground tracking-tight">Registro de Comunero</h1>
                        <p className="text-muted-foreground mt-1">Sincronización profesional con el Sistema de Registro Indígena.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {/* Left Column: Photo and Profile Summary */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
                            <div className="bg-pastel-blue px-4 py-3 flex items-center gap-2">
                                <UserPlus className="w-5 h-5 text-primary" />
                                <span className="text-sm font-bold text-primary uppercase tracking-wider">Perfil Digital</span>
                            </div>
                            <div className="p-6 flex flex-col items-center">
                                <div className="relative group">
                                    <input type="file" ref={fotoInputRef} onChange={handleFotoChange} accept="image/*" className="hidden" />
                                    <div 
                                        onClick={() => fotoInputRef.current?.click()}
                                        className="w-40 h-40 rounded-full bg-secondary border-4 border-card shadow-lg overflow-hidden flex items-center justify-center cursor-pointer group-hover:border-primary/40 transition-all"
                                    >
                                        {fotoPreview ? (
                                            <img src={fotoPreview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <Camera className="w-12 h-12 text-muted-foreground" />
                                        )}
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={() => fotoInputRef.current?.click()}
                                        className="absolute bottom-1 right-1 bg-primary text-primary-foreground p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                                    >
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </div>
                                <h3 className="mt-6 text-lg font-bold text-foreground">Nueva Identidad</h3>
                                <p className="text-xs text-muted-foreground text-center mt-2 px-4">Cargue una foto clara para el reconocimiento y carnetización.</p>
                                <button 
                                    type="button" 
                                    onClick={() => fotoInputRef.current?.click()}
                                    className="mt-6 w-full py-2.5 px-4 bg-secondary text-secondary-foreground rounded-lg text-sm font-bold hover:bg-muted transition-colors"
                                >
                                    Subir Foto
                                </button>
                            </div>
                        </div>
                        <div className="bg-card rounded-xl shadow-sm border border-border p-4">
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <AlertCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                                <p className="text-xs italic leading-relaxed">Asegúrese de que todos los datos coincidan con su documento de identidad original.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: The Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* 1. Información Personal */}
                            <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
                                <div className="bg-pastel-green px-6 py-3 flex items-center gap-2">
                                    <Type className="w-5 h-5 text-emerald-600" />
                                    <span className="text-sm font-bold text-emerald-700 uppercase tracking-wider">Datos Personales</span>
                                </div>
                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <InputGroup label="Primer Nombre" required>
                                        <input type="text" className="form-input text-foreground h-11" placeholder="Ej: Feliciano" value={formData.primerNombre} onChange={e => setFormData({ ...formData, primerNombre: e.target.value })} />
                                    </InputGroup>
                                    <InputGroup label="Segundo Nombre">
                                        <input type="text" className="form-input text-foreground h-11" placeholder="Opcional" value={formData.segundoNombre} onChange={e => setFormData({ ...formData, segundoNombre: e.target.value })} />
                                    </InputGroup>
                                    <InputGroup label="Primer Apellido" required>
                                        <input type="text" className="form-input text-foreground h-11" placeholder="Ej: Valencia" value={formData.primerApellido} onChange={e => setFormData({ ...formData, primerApellido: e.target.value })} />
                                    </InputGroup>
                                    <InputGroup label="Segundo Apellido" required>
                                        <input type="text" className="form-input text-foreground h-11" placeholder="Ej: Tunubalá" value={formData.segundoApellido} onChange={e => setFormData({ ...formData, segundoApellido: e.target.value })} />
                                    </InputGroup>

                                    <InputGroup label="Tipo Documento" required>
                                        <select className="form-input text-foreground h-11" value={formData.tipoDocumento} onChange={e => setFormData({ ...formData, tipoDocumento: e.target.value })}>
                                            <option value="CC" className="bg-background">Cédula de Ciudadanía</option>
                                            <option value="TI" className="bg-background">Tarjeta de Identidad</option>
                                            <option value="RC" className="bg-background">Registro Civil</option>
                                        </select>
                                    </InputGroup>
                                    <InputGroup label="Número de Documento" required>
                                        <div className="relative">
                                            <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input type="text" className="form-input pl-10 text-foreground h-11" placeholder="1023XXX" value={formData.numeroDocumento} onChange={e => setFormData({ ...formData, numeroDocumento: e.target.value })} />
                                        </div>
                                    </InputGroup>

                                    <InputGroup label="Fecha de Nacimiento" required>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input type="date" className="form-input pl-10 text-foreground h-11" value={formData.fechaNacimiento} onChange={e => setFormData({ ...formData, fechaNacimiento: e.target.value })} />
                                        </div>
                                    </InputGroup>
                                    
                                    <InputGroup label="Dirección Actual">
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input type="text" className="form-input pl-10 text-foreground h-11" placeholder="Vereda X, Sector Y" value={formData.direccion} onChange={e => setFormData({ ...formData, direccion: e.target.value })} />
                                        </div>
                                    </InputGroup>

                                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <InputGroup label="Género">
                                        <div className="flex gap-2 p-1 bg-secondary rounded-xl border border-border h-11">
                                            {['M', 'F', 'Otro'].map(g => (
                                                <button key={g} type="button" onClick={() => setFormData({ ...formData, genero: g })} className={`flex-1 text-[10px] font-black uppercase rounded-lg transition-all ${formData.genero === g ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>{g}</button>
                                            ))}
                                        </div>
                                    </InputGroup>
                                    {!esMenor && (
                                        <InputGroup label="Estado Civil">
                                            <select className="form-input text-foreground h-11" value={formData.estadoCivil} onChange={e => setFormData({ ...formData, estadoCivil: e.target.value })}>
                                                <option className="bg-background">Soltero/a</option>
                                                <option className="bg-background">Casado/a</option>
                                                <option className="bg-background">Unión Libre</option>
                                                <option className="bg-background">Viudo/a</option>
                                            </select>
                                        </InputGroup>
                                    )}
                                    </div>
                                </div>
                            </div>

                        {/* 2. Formación y Ocupación */}
                            {/* 2. Formación y Ocupación */}
                            <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
                                <div className="bg-pastel-amber px-6 py-3 flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5 text-amber-600" />
                                    <span className="text-sm font-bold text-amber-700 uppercase tracking-wider">Formación y Ocupación</span>
                                </div>
                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <InputGroup label="Nivel de Escolaridad Actual">
                                        <select className="form-input text-foreground h-11" value={formData.nivelEscolaridad} onChange={e => setFormData({ ...formData, nivelEscolaridad: e.target.value })}>
                                            <option className="bg-background">Sin escolaridad</option>
                                            <option className="bg-background">Preescolar</option>
                                            <option className="bg-background">Primaria</option>
                                            <option className="bg-background">Secundaria</option>
                                            <option className="bg-background">Técnico/Tecnólogo</option>
                                            <option className="bg-background">Universitario</option>
                                        </select>
                                    </InputGroup>

                                    <InputGroup label="Ocupación Principal">
                                        <div className="flex gap-2">
                                            <select className="form-input flex-1 text-foreground h-11" value={formData.ocupacion} onChange={e => setFormData({ ...formData, ocupacion: e.target.value })}>
                                                {opcionesOcupacion.map(opt => <option key={opt} className="bg-background">{opt}</option>)}
                                            </select>
                                            <button type="button" onClick={() => setShowNuevaOcupacion(!showNuevaOcupacion)} className="bg-secondary border border-border p-3 rounded-lg hover:bg-muted text-primary transition-all">
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        </div>
                                        {showNuevaOcupacion && (
                                            <div className="mt-3 flex gap-2 animate-in slide-in-from-top-2 duration-300">
                                                <input type="text" className="form-input flex-1 h-11 text-foreground" placeholder="Nueva ocupación..." value={nuevaOcupacion} onChange={e => setNuevaOcupacion(e.target.value)} />
                                                <button type="button" onClick={handleAddOcupacion} className="bg-primary px-4 rounded-lg text-primary-foreground font-black text-[10px] uppercase">Agregar</button>
                                            </div>
                                        )}
                                    </InputGroup>
                                </div>
                            </div>

                        {/* 3. Salud y Cultural */}
                            {/* 3. Salud y Cultural */}
                            <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
                                <div className="bg-pastel-purple px-6 py-3 flex items-center gap-2">
                                    <HeartPulse className="w-5 h-5 text-purple-600" />
                                    <span className="text-sm font-bold text-purple-700 uppercase tracking-wider">Identidad, Salud y Territorio</span>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                        <InputGroup label="Régimen de Salud">
                                            <select className="form-input text-foreground h-11" value={formData.regimenSalud} onChange={e => setFormData({ ...formData, regimenSalud: e.target.value })}>
                                                <option className="bg-background">Subsidiado</option>
                                                <option className="bg-background">Contributivo</option>
                                                <option className="bg-background">Otro</option>
                                            </select>
                                        </InputGroup>
                                        <InputGroup label="EPS">
                                            <input type="text" className="form-input text-foreground h-11" placeholder="Nombre EPS" value={formData.eps} onChange={e => setFormData({ ...formData, eps: e.target.value })} />
                                        </InputGroup>
                                        <InputGroup label="Uso de Nasayuwe">
                                            <div className="relative">
                                                <Languages className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <select className="form-input pl-10 text-foreground h-11" value={formData.hablaNasayuwe} onChange={e => setFormData({ ...formData, hablaNasayuwe: e.target.value })}>
                                                    <option className="bg-background">Lo habla fluidamente</option>
                                                    <option className="bg-background">Lo habla poco</option>
                                                    <option className="bg-background">Lo entiende pero no habla</option>
                                                    <option className="bg-background">No habla ni entiende</option>
                                                </select>
                                            </div>
                                        </InputGroup>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-border">
                                        <div className="flex items-center justify-between mb-4">
                                            <label className="text-sm font-semibold text-foreground">¿Tiene alguna discapacidad?</label>
                                            <input type="checkbox" checked={formData.tieneDiscapacidad} onChange={e => setFormData({ ...formData, tieneDiscapacidad: e.target.checked })} className="w-5 h-5 rounded bg-secondary border-border text-primary focus:ring-primary" />
                                        </div>

                                        {formData.tieneDiscapacidad && (
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                {opcionesDiscapacidad.map(opt => (
                                                    <label key={opt} className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors group ${formData.discapacidades.includes(opt) ? 'bg-primary/10 border-primary/30' : 'border-border hover:bg-secondary'}`}>
                                                        <input type="checkbox" checked={formData.discapacidades.includes(opt)} onChange={() => handleDiscapacidadToggle(opt)} className="text-primary focus:ring-primary rounded" />
                                                        <span className="text-sm font-medium text-foreground">{opt}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-border space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-foreground font-semibold text-sm">¿Ha sido autoridad del Cabildo?</span>
                                                <span className="text-xs text-muted-foreground">Ej: Gobernador, Alguacil Mayor</span>
                                            </div>
                                            <input type="checkbox" checked={formData.haSidoAutoridad} onChange={e => setFormData({ ...formData, haSidoAutoridad: e.target.checked })} className="w-5 h-5 rounded bg-secondary border-border text-primary focus:ring-primary" />
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-foreground font-semibold text-sm">¿Es autoridad actualmente?</span>
                                            <input type="checkbox" checked={formData.esAutoridadActualmente} onChange={e => setFormData({ ...formData, esAutoridadActualmente: e.target.checked })} className="w-5 h-5 rounded bg-secondary border-border text-primary focus:ring-primary" />
                                        </div>
                                        {formData.esAutoridadActualmente && (
                                            <div className="mt-2 pl-4 border-l-2 border-primary/40 fade-in">
                                                <InputGroup label="Cargo Actual" required>
                                                    <input type="text" className="form-input text-foreground h-11" placeholder="Ej: Gobernador" value={formData.cargoAutoridad} onChange={e => setFormData({ ...formData, cargoAutoridad: e.target.value })} />
                                                </InputGroup>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* 4. Archivos y Documentación */}
                            <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
                                <div className="bg-muted px-6 py-3 flex items-center gap-2">
                                    <Upload className="w-5 h-5 text-muted-foreground" />
                                    <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Documentación Adjunta</span>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        <p className="text-sm font-semibold text-foreground">Documentos Personales (PDF, JPG)</p>
                                        <input type="file" ref={docsInputRef} onChange={handleDocsChange} multiple className="hidden" />
                                        <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                                            {documentos.map((doc, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-3 bg-secondary rounded-xl border border-border group">
                                                    <div className="flex items-center gap-3">
                                                        <FileText className="w-4 h-4 text-primary" />
                                                        <span className="text-xs font-medium text-foreground truncate max-w-[200px]">{doc.name}</span>
                                                    </div>
                                                    <button type="button" onClick={() => removeDoc(idx)} className="text-muted-foreground hover:text-destructive transition-colors">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}

                                            <button
                                                type="button"
                                                onClick={() => docsInputRef.current?.click()}
                                                className="w-full py-3 rounded-lg border border-dashed border-border bg-secondary/50 text-muted-foreground text-sm font-medium hover:bg-secondary hover:text-foreground transition-all flex items-center justify-center gap-2"
                                            >
                                                <Plus className="w-4 h-4" /> Agregar documentos
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 bg-pastel-amber/50 border border-amber-200 rounded-lg flex gap-3 text-amber-800 items-start">
                                        <AlertCircle className="w-5 h-5 shrink-0" />
                                        <p className="text-xs leading-relaxed">
                                            La información personal está cifrada y protegida. Se auditan los accesos.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Actions */}
                            <div className="flex items-center justify-end gap-4 py-4">
                                <button type="button" onClick={() => router.back()} disabled={isSubmitting} className="px-6 py-2.5 rounded-lg border border-border text-muted-foreground font-semibold hover:bg-secondary transition-all disabled:opacity-50">Cancelar</button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-8 py-2.5 rounded-lg bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20 hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
                                >
                                    <ShieldCheck className="w-5 h-5"/>
                                    {isSubmitting ? 'Guardando...' : 'Guardar Registro'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Subcomponents for cleaner UI
function InputGroup({ label, required, children }: { label: string, required?: boolean, children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-foreground flex items-center gap-1">
                {label}
                {required && <span className="text-destructive">*</span>}
            </label>
            {children}
            <style jsx global>{`
        .form-input {
          @apply w-full rounded-lg border-border bg-card focus:ring-primary focus:border-primary text-foreground border transition-colors outline-none px-3 py-2;
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
