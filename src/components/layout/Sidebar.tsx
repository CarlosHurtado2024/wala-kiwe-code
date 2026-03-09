"use client";

import { Shield, Users, ShieldCheck, Key, ShieldAlert, Settings, LogOut, Map as MapIcon, Wallet, Scale, Heart, FileText, Bot, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AppRole = 'administrador' | 'autoridad' | 'comunero' | 'guardia_indigena' | 'promotor_salud';

export default function Sidebar({ userRole, userName, userInitial }: { userRole: AppRole, userName: string, userInitial: string }) {
    const pathname = usePathname();

    // Configuration of navigation grouped by section based on role authorization
    const adminLinks = [
        { href: "/admin", icon: Users, label: "Usuarios" },
        { href: "/admin/roles", icon: ShieldCheck, label: "Roles" },
        { href: "#", icon: Key, label: "API Keys" },
        { href: "#", icon: ShieldAlert, label: "Seguridad" },
        { href: "#", icon: Settings, label: "Sistema" },
    ];

    const genericLinks = [
        { href: "/", icon: Home, label: "Resumen General" },
        { href: "#censo", icon: Users, label: "Censo Comunitario" },
        { href: "#catastro", icon: MapIcon, label: "Catastro Propio" },
        { href: "#finanzas", icon: Wallet, label: "Gestión Financiera" },
        { href: "#justicia", icon: Scale, label: "Justicia Propia" },
        { href: "#salud", icon: Heart, label: "Salud Intercultural" },
        { href: "#documentacion", icon: FileText, label: "Documentos" },
    ];

    // Logic to determine what links to show
    const showAdminMenu = userRole === 'administrador';
    const linksToShow = showAdminMenu ? adminLinks : genericLinks;

    const getRoleDisplayName = (role: string) => {
        switch (role) {
            case 'administrador': return 'Super Admin';
            case 'autoridad': return 'Autoridad / Cabildo';
            case 'promotor_salud': return 'Promotor Salud';
            case 'guardia_indigena': return 'Guardia Indígena';
            case 'comunero': return 'Comunero';
            default: return role;
        }
    };

    return (
        <aside className="relative z-10 w-64 bg-white/10 dark:bg-black/20 backdrop-blur-xl border-r border-white/20 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
            <div className="p-6 flex items-center gap-3 border-b border-white/10">
                <div className="w-10 h-10 shrink-0 rounded-full bg-primary/80 flex items-center justify-center text-white shadow-lg border border-white/20">
                    <Shield className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-lg font-bold leading-none drop-shadow-md">Wala Kiwe</h1>
                    <p className="text-[10px] uppercase tracking-widest text-white/60 mt-1 font-bold">
                        {showAdminMenu ? "Panel Administrativo" : "Módulos Sistema"}
                    </p>
                </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                <div className="mb-4 px-3 text-xs font-bold text-white/40 uppercase tracking-widest">
                    {showAdminMenu ? "Gestión Avanzada" : "Acceso Principal"}
                </div>

                {linksToShow.map((link, idx) => {
                    const isActive = pathname === link.href || (pathname === '/' && link.href === '/');

                    return (
                        <Link
                            key={idx}
                            href={link.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${isActive
                                    ? 'bg-primary/20 text-white border border-primary/30 shadow-[0_0_10px_rgba(var(--primary)/20)] backdrop-blur-sm'
                                    : 'text-white/70 hover:bg-white/10 hover:text-white border border-transparent'
                                }`}
                        >
                            <link.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-primary-100' : 'group-hover:text-primary-300'}`} />
                            <span className="text-sm font-medium">{link.label}</span>
                        </Link>
                    );
                })}

                {!showAdminMenu && (
                    <div className="mt-8">
                        <div className="mb-4 px-3 text-[10px] font-bold text-primary-200/50 uppercase tracking-widest">
                            Consultas IA
                        </div>
                        <Link href="#asistente" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-primary-200 hover:bg-primary/10 hover:text-primary-100 border border-transparent transition-all group">
                            <Bot className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_currentColor]" />
                            <span className="text-sm font-bold">Asistente Legal IA</span>
                        </Link>
                    </div>
                )}
            </nav>

            <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-black/20 border border-white/10 backdrop-blur-sm">
                    <div className="w-9 h-9 shrink-0 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-bold text-xs shadow-inner uppercase">
                        {userInitial}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate text-white">{userName}</p>
                        <p className="text-[10px] text-white/60 truncate uppercase tracking-widest font-semibold">{getRoleDisplayName(userRole)}</p>
                    </div>
                    <form action="/login">
                        <button type="submit" className="p-1 hover:text-red-400 transition-colors" title="Cerrar Sesión">
                            <LogOut className="w-5 h-5 text-white/50 hover:text-red-400" />
                        </button>
                    </form>
                </div>
            </div>
        </aside>
    );
}
