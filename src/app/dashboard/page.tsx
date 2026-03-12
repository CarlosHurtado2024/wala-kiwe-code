import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Landmark,
    Search,
    Bell,
    CalendarDays,
    MapPin,
    ShieldCheck,
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
    Network
} from "lucide-react";

export default function DashboardHome() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary p-2 rounded-lg text-primary-foreground">
                                <Landmark className="w-5 h-5 block" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold tracking-tight text-primary">Wala Kiwe</span>
                                <span className="text-[10px] uppercase tracking-widest font-semibold opacity-70">Administración Central</span>
                            </div>
                        </div>

                        <div className="hidden md:flex flex-1 max-w-md mx-8">
                            <div className="relative w-full text-muted-foreground">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    className="w-full bg-secondary border-none rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary/50 text-sm text-foreground outline-none transition-all"
                                    placeholder="Buscar módulos, actas o comuneros..."
                                    type="text"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="relative p-2 text-muted-foreground hover:bg-secondary rounded-full transition-colors">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
                            </button>
                            <div className="h-8 w-px bg-border mx-1"></div>
                            <div className="flex items-center gap-3 pl-2">
                                <div className="text-right hidden sm:block">
                                    <p className="text-xs font-bold text-foreground">Autoridad Tradicional</p>
                                    <p className="text-[10px] text-muted-foreground">Resguardo Indígena</p>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center overflow-hidden">
                                    <Image
                                        alt="User Avatar"
                                        className="w-full h-full object-cover"
                                        width={40}
                                        height={40}
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF4v5_kOQS-VbZaSoCyRei7JjoXKNdueqEPsAHglnAiiBWAxCFFjS4O7VKmzYeTj6N-Odwq1C43jmVMi4xy38KnucMNtBiqyqu4lFarsGKRFgUQKAqi7ZK093I6IhIyGtKjdqeydSFw9k9OTvfuR0707fmKeaBqAd7PtubjKDdHNF_IGSQrhrJ-FCXs719RM_rV-WirEJ6rDjASawogp-YxQEiK8H-KjOC5njczzi6MMbFaQlMc7oDBF8psfkLX-ePe0Twny0pQJ0"
                                        unoptimized
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
                {/* Welcoming Section */}
                <section className="mb-10">
                    <div className="bg-gradient-to-br from-primary to-orange-700 dark:to-orange-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
                            <div className="space-y-2 relative z-10">
                                <h1 className="text-3xl md:text-4xl font-bold">Bienvenido, Autoridad Ne'jwe'sx</h1>
                                <p className="text-orange-100/90 text-lg max-w-xl">
                                    La armonía del territorio depende de su sabiduría. Aquí tiene el control integral de los procesos comunitarios de Wala Kiwe.
                                </p>
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 border border-white/20">
                                        <CalendarDays className="w-4 h-4" />
                                        <span className="text-sm font-medium">12 de Octubre, 2023</span>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 border border-white/20">
                                        <MapPin className="w-4 h-4" />
                                        <span className="text-sm font-medium">Territorio Ancestral</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 border border-white/30 flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-lg">
                                    <ShieldCheck className="w-6 h-6 font-bold" />
                                </div>
                                <div className="text-white">
                                    <p className="text-xs uppercase tracking-tighter opacity-80">Estado del Territorio</p>
                                    <p className="text-lg font-bold leading-tight">En Armonía</p>
                                </div>
                            </div>
                        </div>
                        {/* Abstract Pattern Background */}
                        <div className="absolute right-0 top-0 h-full w-1/2 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>
                        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Navigation Sidebar & Categories */}
                    <div className="lg:col-span-9 space-y-10">
                        
                        {/* Category: Gobierno y Censo */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <Users className="w-8 h-8 text-primary" />
                                <h2 className="text-2xl font-bold text-foreground">Gobierno y Censo</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Link href="/dashboard/censo" className="flex flex-col items-start p-5 bg-card rounded-2xl shadow-sm border border-border hover:border-primary/50 transition-all group">
                                    <div className="p-3 bg-primary/10 rounded-xl text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        <UserSearch className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-lg text-foreground">Censo Poblacional</h3>
                                    <p className="text-sm text-muted-foreground text-left mt-1">Registro y actualización de comuneros y familias.</p>
                                </Link>
                                
                                <button className="flex flex-col items-start p-5 bg-card rounded-2xl shadow-sm border border-border hover:border-primary/50 transition-all group">
                                    <div className="p-3 bg-primary/10 rounded-xl text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        <UserCheck className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-lg text-foreground">Avales y Certificados</h3>
                                    <p className="text-sm text-muted-foreground text-left mt-1">Emisión de documentos oficiales de pertenencia.</p>
                                </button>
                                
                                <button className="flex flex-col items-start p-5 bg-card rounded-2xl shadow-sm border border-border hover:border-primary/50 transition-all group">
                                    <div className="p-3 bg-primary/10 rounded-xl text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        <ScrollText className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-lg text-foreground">Actas de Cabildo</h3>
                                    <p className="text-sm text-muted-foreground text-left mt-1">Repositorio digital de decisiones y asambleas.</p>
                                </button>
                            </div>
                        </section>

                        {/* Category: Territorio y Recursos */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <MapIcon className="w-8 h-8 text-primary" />
                                <h2 className="text-2xl font-bold text-foreground">Territorio y Recursos</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Link href="/dashboard/territorio" className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-[16/7] shadow-lg">
                                    <Image
                                        alt="Map interface"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 saturate-100"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFjPqYT9H1J9WK1hXUQKj1iX1hCQKOajgbBmd9UBvbDSv1ckByrWNAUdBsw_n8ZHt73dCh51VwaHMQeuK2DC8B_3hmGnY5A3Yhfbm-8Y9R4hTjm5K3gezjpzmBnvgg4kz2vZc-Tw5yhcOSGNxsFPK23Ujy53jcIG85XayFr18Cjjp8vYYmnTqQSwRdUyqvVLYHt17IyvvJZeUL38UcGB-uVSXchMrsviBS40nSiddf1d0747-B23YV0GJhVr4zOBcIocgBfebLs00"
                                        width={600}
                                        height={300}
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                                        <h3 className="text-white font-bold text-xl">S.I.G. Territorial</h3>
                                        <p className="text-white/80 text-sm">Visualización de linderos, fincas y áreas protegidas.</p>
                                        <div className="mt-4 flex gap-2">
                                            <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-bold text-primary-foreground uppercase">Abrir Mapa</span>
                                        </div>
                                    </div>
                                </Link>

                                <div className="grid grid-cols-1 gap-4">
                                    <button className="flex items-center gap-4 p-5 bg-card rounded-2xl shadow-sm border border-border hover:bg-secondary/80 transition-all">
                                        <div className="p-3 bg-green-500/10 rounded-xl text-green-600">
                                            <Leaf className="w-6 h-6" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-bold text-foreground">Proyectos Productivos</h3>
                                            <p className="text-xs text-muted-foreground">Gestión de recursos y soberanía alimentaria.</p>
                                        </div>
                                    </button>
                                    <button className="flex items-center gap-4 p-5 bg-card rounded-2xl shadow-sm border border-border hover:bg-secondary/80 transition-all">
                                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-600">
                                            <Droplets className="w-6 h-6" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-bold text-foreground">Recursos Hídricos</h3>
                                            <p className="text-xs text-muted-foreground">Monitoreo de fuentes y acueductos comunitarios.</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Category: Justicia y Derechos */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <Scale className="w-8 h-8 text-primary" />
                                <h2 className="text-2xl font-bold text-foreground">Justicia y Derechos</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col items-center sm:items-stretch text-center sm:text-left">
                                    <h3 className="font-bold mb-4 flex items-center justify-between w-full text-foreground gap-2">
                                        Jurisdicción Especial
                                        <span className="bg-primary/10 text-primary text-[10px] px-2 py-1 rounded">Activo</span>
                                    </h3>
                                    <ul className="space-y-3 flex-1 w-full text-left">
                                        <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <ChevronRight className="w-3 h-3 text-primary/50" /> Resolución de Conflictos
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <ChevronRight className="w-3 h-3 text-primary/50" /> Seguimiento a Remedios
                                        </li>
                                    </ul>
                                    <button className="w-full mt-6 py-2 bg-secondary rounded-xl font-bold text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">Ver Expedientes</button>
                                </div>
                                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col items-center sm:items-stretch text-center sm:text-left">
                                    <h3 className="font-bold mb-4 flex items-center justify-between w-full text-foreground gap-2">
                                        Derechos Humanos
                                        <span className="bg-red-500/10 text-red-500 text-[10px] px-2 py-1 rounded">Alerta</span>
                                    </h3>
                                    <p className="text-xs text-muted-foreground mb-4 flex-1">Registro de afectaciones y desarmonías territoriales en tiempo real.</p>
                                    <button className="w-full py-2 bg-secondary rounded-xl font-bold text-sm text-foreground hover:bg-red-500 hover:text-white transition-colors">Reportar Incidente</button>
                                </div>
                                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col items-center sm:items-stretch text-center sm:text-left">
                                    <h3 className="font-bold mb-4 w-full text-foreground">Guardia Indígena</h3>
                                    <div className="flex items-center gap-4 mb-4 flex-1 w-full justify-center sm:justify-start">
                                        <div className="flex -space-x-2">
                                            <Image className="w-8 h-8 rounded-full border-2 border-card" alt="Avatar" width={32} height={32} src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN4eIw234ctLwhC64XQPRDzSiVjCgwBQXViZdF0DVZo5k6v_NNqd8LEZxcd9kK1TgZgbOiBJc2Kwrr-PGCes8YWCXT9o0dKcA7iL33Jhb3vDGQn1rYmaCtNrVpEBcN78KGJssflH5kj1F_SK487YUD8axtBnT8w851pP6JTPVpxd-mNg8COhrsMU0jEuo1Q2Iarna8Rq7PKt_hpBjAJHioGR0M7k3FXOvY-uLfMxZv3UcjdzZRw7onbpQ4GwEePlODhac_C3-IVRI" unoptimized />
                                            <Image className="w-8 h-8 rounded-full border-2 border-card" alt="Avatar" width={32} height={32} src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMBJqhrO0dFI2Yaztv_FwBX0IsfgdhE2ilLSPau6UB8kntmExujqMqUTh89MLJKC63J4UD6EwOQsU1__XLAmt4qrJI6cyNHjLoMR-q8t7um8ZivFwLy9gW7a1WQBsV_Y73LbA3m94NrOMsT9lBCq3kzvCd56WzY-8LAIo4qa_H9FEow9UH5SWBDTlkrAyb0UjI87kSjjnNMS0zymd_Stt3iQeQ58sQQmshHBG_TpApK4ZB0j_O4JBgoFTEmSAx38ASG-L5R3-FVP8" unoptimized />
                                            <Image className="w-8 h-8 rounded-full border-2 border-card" alt="Avatar" width={32} height={32} src="https://lh3.googleusercontent.com/aida-public/AB6AXuD636zaPuHf5CbIYrA33gwXo4YEbfmT8324HrwQp_B2ZcRBEIOY-nXDSegp-YMT-i_YJ4_i7BxsnCpE1Hm3HAE4InLXDzUr3qhIQUL77vA6MhI7QaFNkiS0p_MRDCBfGsJQXZm8skNNsifxMnur0NbmzQY9BXpANtnls4HlqYQK6bGqQENb59GyduPIlwrFbWtlM7UmkNqFT0BhXdljR9OJrpnmzdR8al5EKtPwFDSPj3aQM_151sVnQpQXlr2htYkh1bOQW3TqI4E" unoptimized />
                                        </div>
                                        <span className="text-xs text-muted-foreground">+12 activos</span>
                                    </div>
                                    <button className="w-full py-2 bg-secondary rounded-xl font-bold text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">Coordinar Apoyo</button>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Notifications and Sidebar Content */}
                    <aside className="lg:col-span-3 space-y-6">
                        {/* Alerts Section */}
                        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-border bg-red-50 dark:bg-red-950/20">
                                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                    <AlertTriangle className="w-5 h-5" />
                                    <h3 className="font-bold">Alertas Urgentes</h3>
                                </div>
                            </div>
                            <div className="divide-y divide-border">
                                <div className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer">
                                    <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-1">INVASIÓN DE LINDEROS</p>
                                    <p className="text-sm font-medium text-foreground">Sector Quebrada Alta informa presencia de foráneos.</p>
                                    <p className="text-[10px] text-muted-foreground mt-2">Hace 25 min • Por: Guardia Indígena</p>
                                </div>
                                <div className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer">
                                    <p className="text-xs font-bold text-orange-600 dark:text-orange-400 mb-1">ALERTA CLIMÁTICA</p>
                                    <p className="text-sm font-medium text-foreground">Riesgo de deslizamiento en Zona 3 por lluvias intensas.</p>
                                    <p className="text-[10px] text-muted-foreground mt-2">Hace 2 horas • Por: S.I.G.</p>
                                </div>
                            </div>
                        </div>

                        {/* Approvals Section */}
                        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-border">
                                <div className="flex items-center gap-2 text-primary">
                                    <ClipboardCheck className="w-5 h-5" />
                                    <h3 className="font-bold">Por Aprobar</h3>
                                </div>
                            </div>
                            <div className="divide-y divide-border">
                                <div className="p-4 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-bold text-foreground">Aval de Salud</p>
                                            <p className="text-xs text-muted-foreground">Comunero: Juan Tulicue</p>
                                        </div>
                                        <span className="bg-secondary px-2 py-0.5 rounded text-[10px] font-bold italic text-muted-foreground">Pendiente</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="flex-1 py-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-lg uppercase tracking-wide hover:bg-primary/90 transition-colors">Firmar</button>
                                        <button className="px-2 py-1.5 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors"><Eye className="w-4 h-4" /></button>
                                    </div>
                                </div>
                                <div className="p-4 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-bold text-foreground">Permiso Forestal</p>
                                            <p className="text-xs text-muted-foreground">Vereda: El Tablón</p>
                                        </div>
                                        <span className="bg-secondary px-2 py-0.5 rounded text-[10px] font-bold italic text-muted-foreground">Pendiente</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="flex-1 py-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-lg uppercase tracking-wide hover:bg-primary/90 transition-colors">Firmar</button>
                                        <button className="px-2 py-1.5 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors"><Eye className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full p-4 text-xs font-bold text-primary hover:bg-primary/5 transition-colors border-t border-border focus:outline-none">
                                VER TODAS LAS SOLICITUDES (8)
                            </button>
                        </div>

                        {/* Tools Quick Links */}
                        <div className="p-6 bg-slate-900 dark:bg-slate-950 rounded-2xl text-white shadow-xl relative overflow-hidden">
                            <h3 className="font-bold mb-4 flex items-center gap-2 relative z-10">
                                <Network className="w-5 h-5 text-primary" />
                                Herramientas
                            </h3>
                            <div className="grid grid-cols-2 gap-2 relative z-10">
                                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl flex flex-col items-center gap-2 transition-colors">
                                    <Printer className="w-5 h-5 opacity-70" />
                                    <span className="text-[10px] font-medium">Reportes</span>
                                </button>
                                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl flex flex-col items-center gap-2 transition-colors">
                                    <Languages className="w-5 h-5 opacity-70" />
                                    <span className="text-[10px] font-medium">Diccionario</span>
                                </button>
                                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl flex flex-col items-center gap-2 transition-colors">
                                    <Archive className="w-5 h-5 opacity-70" />
                                    <span className="text-[10px] font-medium">Archivo</span>
                                </button>
                                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl flex flex-col items-center gap-2 transition-colors">
                                    <BarChart2 className="w-5 h-5 opacity-70" />
                                    <span className="text-[10px] font-medium">Estadísticas</span>
                                </button>
                            </div>
                            <div className="absolute right-0 bottom-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl translate-x-12 translate-y-12 pointer-events-none"></div>
                        </div>
                    </aside>
                </div>
            </main>

            <footer className="mt-auto border-t border-border py-8 bg-card">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4 opacity-70">
                        <Landmark className="w-8 h-8 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-bold text-foreground">Wala Kiwe</p>
                            <p className="text-[10px] text-muted-foreground">Sistema de Gestión Territorial V 2.4.0</p>
                        </div>
                    </div>
                    <div className="flex gap-8 text-xs font-medium text-muted-foreground hover:[&>a]:text-primary transition-colors">
                        <a href="#">Políticas de Privacidad</a>
                        <a href="#">Soporte Técnico</a>
                        <a href="#">Documentación</a>
                    </div>
                    <p className="text-xs text-muted-foreground">© 2023 Tejido de Comunicaciones ACIN.</p>
                </div>
            </footer>
        </div>
    );
}

