import { Mountain, User, Lock, LogIn, Fingerprint, AlertCircle } from "lucide-react";
import type { Metadata } from "next";
import { login } from "./actions";

export const metadata: Metadata = {
    title: "Wala Kiwe - Inicio de Sesión",
};

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const resolvedSearchParams = await searchParams;
    const error = resolvedSearchParams?.error as string | undefined;

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden font-sans">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat opacity-40 grayscale-[20%]"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCa3O6AsgJivp47aXI_zPa4nRQCK8FJl6R7i4UE0IkRJLLeIs2NiBcQh46o2cB4i3pwpxPyEneKRPXxhfZIz2-Sq7pCVbh4bIT9QAjt2klokZrnh-lEYtnA0U2GzpDCV3EpsAnNohBqM6EJF2fzw9snK5QP-UD-_VbQmpXSlMUGalWDk0jNsh7cmf8hC6j9WP7PjbVDcdCVqRis0ZGN7JaaMl0AgQPYbAr6Y2OgmOe3mQizSDQpbpFWO5VfpeUlMFpg7V8thys_HNo")' }}
            >
                <div className="absolute inset-0 bg-background/90 backdrop-blur-sm"></div>
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md bg-card/90 backdrop-blur-xl border border-border rounded-2xl shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>

                <div className="p-8 flex flex-col gap-6 relative z-10">

                    {/* Brand Header */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center shadow-inner">
                            <Mountain className="text-primary w-10 h-10" />
                        </div>
                        <div className="text-center">
                            <h1 className="text-3xl font-bold tracking-tight text-foreground">Wala Kiwe</h1>
                            <p className="text-muted-foreground text-sm font-medium mt-1">Sistema de Administración Indígena</p>
                        </div>
                    </div>

                    <div className="h-px bg-border w-full"></div>

                    {/* Login Form */}
                    <form action={login} className="flex flex-col gap-5">
                        {error && (
                            <div className="flex items-center gap-2 bg-red-500/20 text-red-100 border border-red-500/50 p-3 rounded-lg text-sm mb-2 backdrop-blur-sm">
                                <AlertCircle className="w-4 h-4" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-foreground/90">Correo de Usuario</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors w-5 h-5 pointer-events-none" />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-input bg-background/50 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-input outline-none transition-all duration-300 shadow-sm"
                                    placeholder="ejemplo@walakiwe.org"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-semibold text-foreground/90">Contraseña</label>
                                <a href="#" className="text-xs text-primary font-semibold hover:text-primary/80 hover:underline transition-colors tracking-wide">
                                    ¿Olvidó su contraseña?
                                </a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors w-5 h-5 pointer-events-none" />
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-input bg-background/50 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-input outline-none transition-all duration-300 shadow-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button type="submit" className="group mt-2 w-full bg-primary hover:opacity-90 text-primary-foreground font-bold py-4 rounded-xl shadow-sm border border-transparent transition-all duration-300 flex items-center justify-center gap-2">
                            <span>Ingresar al Sistema</span>
                            <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t border-border"></div>
                            <span className="flex-shrink mx-4 text-muted-foreground text-xs font-bold uppercase tracking-widest">O</span>
                            <div className="flex-grow border-t border-border"></div>
                        </div>

                        <button type="button" className="w-full bg-secondary hover:bg-muted text-foreground font-semibold py-3.5 rounded-xl border border-border transition-all duration-300 flex items-center justify-center gap-2">
                            <Fingerprint className="w-5 h-5 text-primary" />
                            <span>Acceso con Firma Digital</span>
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                            © {new Date().getFullYear()} Asociación de Cabildos Indígenas del Norte del Cauca<br />
                            Respetando el territorio y la autonomía.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
