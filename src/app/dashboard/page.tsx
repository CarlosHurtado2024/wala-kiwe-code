import { Users, Map as MapIcon, Wallet, Scale, Heart, FileText, Bot } from "lucide-react";

export default function Home() {
    const modules = [
        { name: "Censo Comunitario", icon: Users, desc: "Registro de comuneros, autoridades y familias.", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
        { name: "Catastro Propio", icon: MapIcon, desc: "Gestión territorial y adjudicaciones internas.", color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
        { name: "Gestión Financiera", icon: Wallet, desc: "Control del Sistema General de Participaciones.", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
        { name: "Justicia Propia", icon: Scale, desc: "Expedientes y seguimiento al Derecho Mayor.", color: "text-purple-400 bg-purple-400/10 border-purple-400/20" },
        { name: "Salud Intercultural", icon: Heart, desc: "Fichas de salud y medicina tradicional.", color: "text-rose-400 bg-rose-400/10 border-rose-400/20" },
        { name: "Documentación", icon: FileText, desc: "Generación automática de certificados y actas.", color: "text-slate-300 bg-slate-500/20 border-slate-500/30" },
    ];

    return (
        <div className="space-y-6 pt-2">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">Resumen General</h2>
                <p className="text-white/70 font-medium">
                    Bienvenido a WalaKiwe. Selecciona un módulo para gestionar la información de la comunidad.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {modules.map((module, i) => (
                    <div key={i} className="group flex flex-col justify-between rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:border-white/30 cursor-pointer">
                        <div className="space-y-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-inner ${module.color}`}>
                                <module.icon className="h-6 w-6" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold leading-none tracking-wide text-white drop-shadow-sm">{module.name}</h3>
                                <p className="text-sm text-white/60 line-clamp-2">
                                    {module.desc}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center text-sm font-bold text-white/80 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300">
                            Acceder al módulo &rarr;
                        </div>
                    </div>
                ))}

                {/* AI Assistant Special Card */}
                <div className="group flex flex-col justify-between rounded-xl border border-primary/30 bg-primary/10 backdrop-blur-md p-6 shadow-[0_0_30px_rgba(var(--primary)/10)] transition-all hover:bg-primary/20 hover:shadow-[0_0_40px_rgba(var(--primary)/30)] hover:border-primary/50 cursor-pointer relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-all duration-500"></div>
                    <div className="space-y-4 relative z-10">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary border border-primary/50 shadow-[0_4px_20px_rgba(var(--primary)/50)] text-white">
                            <Bot className="h-6 w-6 drop-shadow-md" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-bold leading-none tracking-wide text-white drop-shadow-sm">Asistente Legal IA</h3>
                            <p className="text-sm text-white/60 line-clamp-2">
                                Consultor RAG especializado en normativa indígena y convenios (OIT 169).
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 flex items-center text-sm font-bold text-primary-200 opacity-80 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0 relative z-10">
                        Consultar Asistente &rarr;
                    </div>
                </div>
            </div>
        </div>
    );
}
