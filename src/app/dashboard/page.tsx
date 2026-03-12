import React from 'react';
import Link from 'next/link';
import {
    Users,
    UserSearch,
    UserCheck,
    ScrollText,
    Map as MapIcon,
    Leaf,
    Droplets,
    Scale,
    ChevronRight,
    AlertTriangle,
    ClipboardCheck,
    Eye,
    Printer,
    Languages,
    Archive,
    BarChart2,
    Network,
    Calendar,
    Sun,
    Sunset,
    Moon,
    ShieldCheck,
    TrendingUp
} from "lucide-react";

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Buenos días", icon: Sun };
    if (hour < 18) return { text: "Buenas tardes", icon: Sunset };
    return { text: "Buenas noches", icon: Moon };
}

function getFormattedDate() {
    return new Date().toLocaleDateString('es-CO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export default function DashboardHome() {
    const greeting = getGreeting();
    const GreetingIcon = greeting.icon;
    const formattedDate = getFormattedDate();

    return (
        <div className="flex flex-col min-h-0 flex-1 bg-background">
            <main className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 space-y-8">

                    {/* Welcome Banner */}
                    <section className="animate-slide-up">
                        <div className="bg-gradient-to-br from-primary via-primary/90 to-indigo-700 dark:to-indigo-900 rounded-2xl p-8 text-white relative overflow-hidden">
                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-white/70">
                                        <GreetingIcon className="w-4 h-4" />
                                        <span className="text-sm font-medium">{greeting.text}</span>
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Panel de Administración</h1>
                                    <p className="text-white/70 text-base max-w-xl">
                                        La armonía del territorio depende de su sabiduría. Control integral de los procesos comunitarios.
                                    </p>
                                    <div className="flex flex-wrap gap-3 pt-2">
                                        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 border border-white/10 text-sm">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span className="capitalize">{formattedDate}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/15 flex items-center gap-4">
                                    <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center text-primary shadow-md">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider opacity-70 font-semibold">Territorio</p>
                                        <p className="text-lg font-bold leading-tight">En Armonía</p>
                                    </div>
                                </div>
                            </div>
                            {/* Pattern */}
                            <div className="absolute right-0 top-0 h-full w-1/2 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "20px 20px" }} />
                            <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                        </div>
                    </section>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-9 space-y-8">

                            {/* Gobierno y Censo */}
                            <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="p-2 bg-primary/10 rounded-xl">
                                        <Users className="w-5 h-5 text-primary" />
                                    </div>
                                    <h2 className="text-xl font-bold text-foreground">Gobierno y Censo</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Link href="/dashboard/censo" className="flex flex-col items-start p-5 bg-card rounded-xl shadow-sm border border-border hover:border-primary/40 hover:shadow-md transition-all group">
                                        <div className="p-2.5 bg-primary/10 rounded-xl text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                                            <UserSearch className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-bold text-base text-foreground">Censo Poblacional</h3>
                                        <p className="text-sm text-muted-foreground mt-1">Registro y actualización de comuneros y familias.</p>
                                        <div className="mt-auto pt-4 flex items-center gap-1 text-primary text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                            Abrir módulo <ChevronRight className="w-3 h-3" />
                                        </div>
                                    </Link>

                                    <Link href="/dashboard/familias" className="flex flex-col items-start p-5 bg-card rounded-xl shadow-sm border border-border hover:border-primary/40 hover:shadow-md transition-all group">
                                        <div className="p-2.5 bg-primary/10 rounded-xl text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                                            <UserCheck className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-bold text-base text-foreground">Gestión de Familias</h3>
                                        <p className="text-sm text-muted-foreground mt-1">Directorio de familias y núcleos del territorio.</p>
                                        <div className="mt-auto pt-4 flex items-center gap-1 text-primary text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                            Abrir módulo <ChevronRight className="w-3 h-3" />
                                        </div>
                                    </Link>

                                    <button className="flex flex-col items-start p-5 bg-card rounded-xl shadow-sm border border-border hover:border-primary/40 hover:shadow-md transition-all group text-left">
                                        <div className="p-2.5 bg-primary/10 rounded-xl text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                                            <ScrollText className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-bold text-base text-foreground">Actas de Cabildo</h3>
                                        <p className="text-sm text-muted-foreground mt-1">Repositorio digital de decisiones y asambleas.</p>
                                    </button>
                                </div>
                            </section>

                            {/* Territorio y Recursos */}
                            <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="p-2 bg-primary/10 rounded-xl">
                                        <MapIcon className="w-5 h-5 text-primary" />
                                    </div>
                                    <h2 className="text-xl font-bold text-foreground">Territorio y Recursos</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="grid grid-cols-1 gap-4">
                                        <button className="flex items-center gap-4 p-5 bg-card rounded-xl shadow-sm border border-border hover:border-green-400/40 hover:shadow-md transition-all group">
                                            <div className="p-2.5 bg-green-500/10 rounded-xl text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors duration-200">
                                                <Leaf className="w-5 h-5" />
                                            </div>
                                            <div className="text-left">
                                                <h3 className="font-bold text-foreground">Proyectos Productivos</h3>
                                                <p className="text-xs text-muted-foreground">Gestión de recursos y soberanía alimentaria.</p>
                                            </div>
                                        </button>
                                        <button className="flex items-center gap-4 p-5 bg-card rounded-xl shadow-sm border border-border hover:border-blue-400/40 hover:shadow-md transition-all group">
                                            <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-200">
                                                <Droplets className="w-5 h-5" />
                                            </div>
                                            <div className="text-left">
                                                <h3 className="font-bold text-foreground">Recursos Hídricos</h3>
                                                <p className="text-xs text-muted-foreground">Monitoreo de fuentes y acueductos comunitarios.</p>
                                            </div>
                                        </button>
                                    </div>
                                    <button className="flex items-center gap-4 p-5 bg-card rounded-xl shadow-sm border border-border hover:border-primary/40 hover:shadow-md transition-all group">
                                        <div className="p-2.5 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                                            <MapIcon className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-bold text-foreground">S.I.G. Territorial</h3>
                                            <p className="text-xs text-muted-foreground">Visualización de linderos, fincas y áreas protegidas.</p>
                                        </div>
                                    </button>
                                </div>
                            </section>

                            {/* Justicia */}
                            <section className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="p-2 bg-primary/10 rounded-xl">
                                        <Scale className="w-5 h-5 text-primary" />
                                    </div>
                                    <h2 className="text-xl font-bold text-foreground">Justicia y Derechos</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-card p-5 rounded-xl border border-border shadow-sm hover:shadow-md transition-all">
                                        <h3 className="font-bold mb-3 flex items-center justify-between text-foreground text-sm">
                                            Jurisdicción Especial
                                            <span className="bg-accent/15 text-accent text-[10px] px-2 py-0.5 rounded-full font-bold">Activo</span>
                                        </h3>
                                        <ul className="space-y-2 mb-4">
                                            <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <ChevronRight className="w-3 h-3 text-primary/50" /> Resolución de Conflictos
                                            </li>
                                            <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <ChevronRight className="w-3 h-3 text-primary/50" /> Seguimiento a Remedios
                                            </li>
                                        </ul>
                                        <button className="w-full py-2 bg-secondary rounded-lg font-bold text-xs text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">Ver Expedientes</button>
                                    </div>
                                    <div className="bg-card p-5 rounded-xl border border-border shadow-sm hover:shadow-md transition-all">
                                        <h3 className="font-bold mb-3 flex items-center justify-between text-foreground text-sm">
                                            Derechos Humanos
                                            <span className="bg-red-500/10 text-red-500 text-[10px] px-2 py-0.5 rounded-full font-bold">Alerta</span>
                                        </h3>
                                        <p className="text-xs text-muted-foreground mb-4">Registro de afectaciones y desarmonías territoriales en tiempo real.</p>
                                        <button className="w-full py-2 bg-secondary rounded-lg font-bold text-xs text-foreground hover:bg-red-500 hover:text-white transition-colors">Reportar Incidente</button>
                                    </div>
                                    <div className="bg-card p-5 rounded-xl border border-border shadow-sm hover:shadow-md transition-all">
                                        <h3 className="font-bold mb-3 text-foreground text-sm">Guardia Indígena</h3>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="flex -space-x-1.5">
                                                {['bg-primary/20', 'bg-accent/20', 'bg-orange-200'].map((bg, i) => (
                                                    <div key={i} className={`w-7 h-7 rounded-full ${bg} border-2 border-card flex items-center justify-center text-[9px] font-bold text-foreground/60`}>
                                                        {['JT', 'ML', 'RF'][i]}
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="text-xs text-muted-foreground">+12 activos</span>
                                        </div>
                                        <button className="w-full py-2 bg-secondary rounded-lg font-bold text-xs text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">Coordinar Apoyo</button>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Right Sidebar */}
                        <aside className="lg:col-span-3 space-y-5">
                            {/* Alerts */}
                            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden animate-slide-up" style={{ animationDelay: '0.15s' }}>
                                <div className="p-4 border-b border-border bg-red-50 dark:bg-red-950/20">
                                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                        <AlertTriangle className="w-4 h-4" />
                                        <h3 className="font-bold text-sm">Alertas Urgentes</h3>
                                    </div>
                                </div>
                                <div className="divide-y divide-border">
                                    <div className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer">
                                        <p className="text-[10px] font-bold text-red-600 dark:text-red-400 mb-0.5 uppercase tracking-wide">Invasión de Linderos</p>
                                        <p className="text-sm font-medium text-foreground leading-snug">Sector Quebrada Alta informa presencia de foráneos.</p>
                                        <p className="text-[10px] text-muted-foreground mt-1.5">Hace 25 min • Guardia Indígena</p>
                                    </div>
                                    <div className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer">
                                        <p className="text-[10px] font-bold text-orange-600 dark:text-orange-400 mb-0.5 uppercase tracking-wide">Alerta Climática</p>
                                        <p className="text-sm font-medium text-foreground leading-snug">Riesgo de deslizamiento en Zona 3.</p>
                                        <p className="text-[10px] text-muted-foreground mt-1.5">Hace 2 horas • S.I.G.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Approvals */}
                            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden animate-slide-up" style={{ animationDelay: '0.25s' }}>
                                <div className="p-4 border-b border-border">
                                    <div className="flex items-center gap-2 text-primary">
                                        <ClipboardCheck className="w-4 h-4" />
                                        <h3 className="font-bold text-sm">Por Aprobar</h3>
                                    </div>
                                </div>
                                <div className="divide-y divide-border">
                                    {[
                                        { title: "Aval de Salud", subtitle: "Comunero: Juan Tulicue" },
                                        { title: "Permiso Forestal", subtitle: "Vereda: El Tablón" },
                                    ].map((item, i) => (
                                        <div key={i} className="p-4 space-y-2.5">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-sm font-bold text-foreground">{item.title}</p>
                                                    <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                                                </div>
                                                <span className="bg-secondary px-2 py-0.5 rounded text-[10px] font-bold italic text-muted-foreground">Pendiente</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="flex-1 py-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-lg uppercase tracking-wide hover:bg-primary/90 transition-colors">Firmar</button>
                                                <button className="px-2.5 py-1.5 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                                                    <Eye className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full p-3 text-[10px] font-bold text-primary hover:bg-primary/5 transition-colors border-t border-border uppercase tracking-wider">
                                    Ver todas las solicitudes (8)
                                </button>
                            </div>

                            {/* Tools */}
                            <div className="p-5 bg-slate-900 dark:bg-slate-950 rounded-xl text-white shadow-lg relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.35s' }}>
                                <h3 className="font-bold mb-4 flex items-center gap-2 text-sm relative z-10">
                                    <Network className="w-4 h-4 text-primary" />
                                    Herramientas
                                </h3>
                                <div className="grid grid-cols-2 gap-2 relative z-10">
                                    {[
                                        { icon: Printer, label: "Reportes" },
                                        { icon: Languages, label: "Diccionario" },
                                        { icon: Archive, label: "Archivo" },
                                        { icon: BarChart2, label: "Estadísticas" },
                                    ].map((tool, i) => (
                                        <button key={i} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl flex flex-col items-center gap-2 transition-colors">
                                            <tool.icon className="w-4 h-4 opacity-60" />
                                            <span className="text-[10px] font-medium">{tool.label}</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="absolute right-0 bottom-0 w-28 h-28 bg-primary/20 rounded-full blur-3xl translate-x-10 translate-y-10 pointer-events-none" />
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    );
}
