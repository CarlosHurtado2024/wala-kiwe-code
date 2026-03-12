import { login } from "./actions";
import { Shield, AlertCircle, KeyRound, Fingerprint, Sparkles, ArrowRight } from "lucide-react";
import Link from 'next/link';

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
    const { error } = await searchParams;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4 py-8 relative overflow-hidden">
            {/* Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "28px 28px" }} />
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-md z-10 animate-slide-up">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center shadow-xl shadow-primary/25 mb-5">
                        <Shield className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Wala Kiwe</h1>
                    <p className="text-sm text-muted-foreground mt-1">Plataforma de Gestión Indígena</p>
                </div>

                {/* Card */}
                <div className="bg-card border border-border rounded-2xl shadow-xl p-8 space-y-6 animate-scale-in" style={{ animationDelay: '0.1s' }}>
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-foreground">Iniciar Sesión</h2>
                        <p className="text-xs text-muted-foreground mt-1">Acceso seguro al sistema comunitario</p>
                    </div>

                    {/* Login Form */}
                    <form action={login} className="flex flex-col gap-5">
                        {error && (
                            <div className="flex items-center gap-2 bg-red-500/10 text-red-700 dark:text-red-300 border border-red-500/30 p-3 rounded-xl text-sm animate-slide-down">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] ml-1">Correo Electrónico</label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    required
                                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] ml-1">Contraseña de Acceso</label>
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="• • • • • • • •"
                                    required
                                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] text-sm"
                        >
                            <KeyRound className="w-4 h-4" />
                            Iniciar Sesión
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-[9px] uppercase tracking-[0.15em] font-bold">
                            <span className="bg-card px-3 text-muted-foreground">Métodos Alternativos</span>
                        </div>
                    </div>

                    <button className="w-full border-2 border-dashed border-border hover:border-primary/30 py-3.5 rounded-xl flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all text-sm font-medium group">
                        <Fingerprint className="w-4 h-4 group-hover:text-primary transition-colors" />
                        Firma Digital / Certificado
                    </button>
                </div>

                {/* Footer */}
                <p className="text-center text-[9px] text-muted-foreground mt-6 uppercase tracking-[0.15em] flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    Sistema propio de la comunidad Nasa, protegido con cifrado
                </p>
            </div>
        </div>
    );
}
