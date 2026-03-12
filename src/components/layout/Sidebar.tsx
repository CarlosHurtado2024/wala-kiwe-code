"use client";

import { Shield, Users, ShieldCheck, Key, ShieldAlert, Settings, LogOut, Map as MapIcon, Wallet, Scale, Heart, FileText, Bot, Home, GitBranch } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/login/actions";

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
        { href: "/dashboard", icon: Home, label: "Resumen General" },
        { href: "/dashboard/censo", icon: Users, label: "Censo Comunitario" },
        { href: "/dashboard/familias", icon: GitBranch, label: "Gestión de Familias" },
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
        <aside className="relative z-10 w-64 bg-background border-r border-border flex flex-col shadow-sm">
            <div className="p-6 flex items-center gap-3 border-b border-border">
                <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center shadow-sm border border-primary/20">
                    <Shield className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-foreground leading-none">Wala Kiwe</h1>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mt-1">
                        {showAdminMenu ? "Panel Administrativo" : "Módulos Sistema"}
                    </p>
                </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
                <div className="mb-4 px-3 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    {showAdminMenu ? "Gestión Avanzada" : "Acceso Principal"}
                </div>

                {linksToShow.map((link, idx) => {
                    const isActive = pathname === link.href || (pathname === '/' && link.href === '/');

                    return (
                        <Link
                            key={idx}
                            href={link.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${isActive
                                ? 'bg-primary/10 text-primary font-bold shadow-sm'
                                : 'text-foreground/70 hover:bg-secondary hover:text-foreground'
                                }`}
                        >
                            <link.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
                            <span className="text-sm font-medium">{link.label}</span>
                        </Link>
                    );
                })}

                {!showAdminMenu && (
                    <div className="mt-8">
                        <div className="mb-4 px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            Consultas IA
                        </div>
                        <Link href="#asistente" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-primary hover:bg-primary/10 transition-all group">
                            <Bot className="w-5 h-5" />
                            <span className="text-sm font-bold">Asistente Legal IA</span>
                        </Link>
                    </div>
                )}
            </nav>

            <div className="p-4 border-t border-border">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border">
                    <div className="w-9 h-9 shrink-0 rounded-full bg-background border border-border flex items-center justify-center font-bold text-xs text-foreground uppercase shadow-sm">
                        {userInitial}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate text-foreground">{userName}</p>
                        <p className="text-[10px] text-muted-foreground truncate uppercase tracking-widest font-semibold">{getRoleDisplayName(userRole)}</p>
                    </div>
                    <form action={logout}>
                        <button type="submit" className="p-1 text-muted-foreground hover:text-destructive transition-colors" title="Cerrar Sesión">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </aside>
    );
}
