"use client";

import { Shield, Users, ShieldCheck, Key, ShieldAlert, Settings, LogOut, Map as MapIcon, Wallet, Scale, Heart, FileText, Bot, Home, GitBranch, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/login/actions";
import { useState } from "react";

type AppRole = 'administrador' | 'autoridad' | 'comunero' | 'guardia_indigena' | 'promotor_salud';

export default function Sidebar({ userRole, userName, userInitial }: { userRole: AppRole, userName: string, userInitial: string }) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    const adminLinks = [
        { href: "/admin", icon: Users, label: "Usuarios" },
        { href: "/admin/roles", icon: ShieldCheck, label: "Roles" },
        { href: "#", icon: Key, label: "API Keys" },
        { href: "#", icon: ShieldAlert, label: "Seguridad" },
        { href: "#", icon: Settings, label: "Sistema" },
    ];

    const genericLinks = [
        { href: "/dashboard", icon: Home, label: "Resumen General" },
        { href: "/dashboard/censo", icon: Users, label: "Censo Comunitario" },
        { href: "/dashboard/familias", icon: GitBranch, label: "Gestión de Familias" },
        { href: "#catastro", icon: MapIcon, label: "Catastro Propio" },
        { href: "#finanzas", icon: Wallet, label: "Gestión Financiera" },
        { href: "#justicia", icon: Scale, label: "Justicia Propia" },
        { href: "#salud", icon: Heart, label: "Salud Intercultural" },
        { href: "#documentacion", icon: FileText, label: "Documentos" },
    ];

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
        <aside className={`relative z-10 bg-card border-r border-border flex flex-col shadow-sm transition-all duration-300 ${collapsed ? 'w-[4.5rem]' : 'w-64'}`}>
            {/* Logo */}
            <div className={`p-4 flex items-center border-b border-border ${collapsed ? 'justify-center' : 'gap-3 px-5'}`}>
                <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center shadow-md">
                    <Shield className="w-5 h-5" />
                </div>
                {!collapsed && (
                    <div className="animate-fade-in">
                        <h1 className="text-base font-extrabold text-foreground leading-none tracking-tight">Wala Kiwe</h1>
                        <p className="text-[9px] uppercase font-bold tracking-[0.15em] text-muted-foreground mt-0.5">
                            {showAdminMenu ? "Panel Admin" : "Gestión Territorial"}
                        </p>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className={`flex-1 py-4 space-y-1 overflow-y-auto custom-scrollbar ${collapsed ? 'px-2' : 'px-3'}`}>
                {!collapsed && (
                    <div className="mb-3 px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">
                        {showAdminMenu ? "Gestión Avanzada" : "Módulos"}
                    </div>
                )}

                {linksToShow.map((link, idx) => {
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={idx}
                            href={link.href}
                            title={collapsed ? link.label : undefined}
                            className={`relative flex items-center rounded-xl transition-all duration-200 group ${collapsed ? 'justify-center p-3' : 'gap-3 px-3 py-2.5'} ${isActive
                                ? 'bg-primary/10 text-primary font-bold'
                                : 'text-foreground/60 hover:bg-secondary hover:text-foreground'
                                }`}
                        >
                            {/* Active indicator bar */}
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-full" />
                            )}
                            <link.icon className={`w-[18px] h-[18px] shrink-0 transition-colors duration-200 ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
                            {!collapsed && <span className="text-sm font-medium">{link.label}</span>}
                        </Link>
                    );
                })}

                {!showAdminMenu && (
                    <div className={collapsed ? 'mt-4' : 'mt-6'}>
                        {!collapsed && (
                            <div className="mb-3 px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">
                                Consultas IA
                            </div>
                        )}
                        <Link
                            href="#asistente"
                            title={collapsed ? "Asistente Legal IA" : undefined}
                            className={`flex items-center rounded-xl text-primary hover:bg-primary/10 transition-all group ${collapsed ? 'justify-center p-3' : 'gap-3 px-3 py-2.5'}`}
                        >
                            <Bot className="w-[18px] h-[18px]" />
                            {!collapsed && <span className="text-sm font-bold">Asistente Legal IA</span>}
                        </Link>
                    </div>
                )}
            </nav>

            {/* Collapse Toggle */}
            <div className="px-3 py-2 border-t border-border">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                    title={collapsed ? "Expandir menú" : "Colapsar menú"}
                >
                    {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
            </div>

            {/* User Profile */}
            <div className={`p-3 border-t border-border ${collapsed ? 'flex justify-center' : ''}`}>
                <div className={`flex items-center rounded-xl bg-secondary/60 border border-border/50 ${collapsed ? 'p-2 justify-center' : 'gap-3 p-3'}`}>
                    <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center font-bold text-xs text-primary uppercase">
                        {userInitial}
                    </div>
                    {!collapsed && (
                        <div className="flex-1 min-w-0 animate-fade-in">
                            <p className="text-sm font-bold truncate text-foreground">{userName}</p>
                            <p className="text-[9px] text-muted-foreground truncate uppercase tracking-[0.12em] font-semibold">{getRoleDisplayName(userRole)}</p>
                        </div>
                    )}
                    {!collapsed && (
                        <form action={logout}>
                            <button type="submit" className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all" title="Cerrar Sesión">
                                <LogOut className="w-4 h-4" />
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </aside>
    );
}
