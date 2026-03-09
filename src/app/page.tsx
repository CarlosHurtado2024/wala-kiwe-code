import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-sans bg-slate-50 text-slate-900 selection:bg-primary/20">
            {/* Background Pattern */}
            <div
                className="fixed inset-0 z-0 opacity-50 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(25, 122, 230, 0.05) 1px, transparent 0)',
                    backgroundSize: '24px 24px'
                }}
            />

            {/* Navigation (Glassmorphism) */}
            <header className="fixed top-0 z-50 w-full border-b border-white/20 bg-white/40 backdrop-blur-xl px-6 lg:px-20 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="bg-primary p-2 rounded-xl text-primary-foreground shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-2xl">landscape</span>
                    </div>
                    <h2 className="text-slate-900 text-xl font-extrabold tracking-tight">Wala Kiwe</h2>
                </div>
                <nav className="hidden md:flex flex-1 justify-center gap-8">
                    <a className="text-slate-600 hover:text-primary text-sm font-semibold transition-colors" href="#pilares">Pilares</a>
                    <a className="text-slate-600 hover:text-primary text-sm font-semibold transition-colors" href="#tecnologia">Tecnología</a>
                    <a className="text-slate-600 hover:text-primary text-sm font-semibold transition-colors" href="#impacto">Impacto</a>
                    <a className="text-slate-600 hover:text-primary text-sm font-semibold transition-colors" href="#acceso">Acceso</a>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/login" className="hidden sm:flex items-center justify-center rounded-xl h-10 px-6 bg-primary text-primary-foreground text-sm font-bold tracking-wide hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                        Ingresar al Sistema
                    </Link>
                </div>
            </header>

            <main className="flex-1 mt-20 z-10">
                {/* Hero Section (Glassmorphism) */}
                <section className="relative px-4 lg:px-20 py-10 lg:py-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="relative min-h-[520px] lg:min-h-[640px] flex flex-col justify-end overflow-hidden rounded-3xl p-8 lg:p-16 shadow-2xl border border-white/40">
                            {/* Hero Background Image */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    alt="Paisaje del Páramo del Cauca"
                                    className="w-full h-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHdrWPtkppF6AK3F5R1RygEiPq1PzhPS4vgPZVg4-U_Rm7jvOwfustmgxN7_IztseqErzWg0GPw4kI8yQbGJaQhbnneU_lObapGpiFDsxE0_07JFETCceFEYR6D9FhDluCG7wvRcprZPyImzq8AVK2eiOjuhsTL5EZtf_v4wn3Tt4c8d8v6XLRb3t_keIOjCAWoWMt0Ua3Z5uuJLOFtY3fKTGSql2wumXMMdSg4FOAiu3KktTjAtpv5SAryE2fLoA5xN4B4OUxEfM"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-slate-900/10 backdrop-blur-[2px]"></div>
                            </div>

                            <div className="relative z-10 flex flex-col gap-6 max-w-2xl bg-black/20 p-8 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                                <h1 className="text-white text-5xl lg:text-7xl font-black leading-tight tracking-tight drop-shadow-md">
                                    Soberanía Digital para el Territorio <span className="text-primary-foreground">Wala Kiwe</span>
                                </h1>
                                <p className="text-slate-100 text-lg lg:text-xl font-medium leading-relaxed drop-shadow">
                                    Fortaleciendo el gobierno propio a través de la tecnología y la tradición ancestral del Cauca.
                                </p>
                                <div className="flex flex-wrap gap-4 mt-4">
                                    <Link href="/login" className="flex items-center justify-center h-14 px-8 rounded-xl bg-primary text-primary-foreground text-lg font-bold shadow-xl shadow-primary/30 hover:scale-105 transition-transform backdrop-blur-md">
                                        Ingresar al Sistema
                                    </Link>
                                    <button className="flex items-center justify-center h-14 px-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/30 text-white text-lg font-bold hover:bg-white/20 transition-all">
                                        Conocer más
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Nuestros Pilares */}
                <section className="px-6 lg:px-20 py-20 relative" id="pilares">
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="flex flex-col mb-16 max-w-3xl">
                            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2">Fundamentos</span>
                            <h2 className="text-slate-900 text-4xl lg:text-5xl font-black mb-4">Nuestros Pilares</h2>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                Módulos centrales diseñados específicamente para la gestión autónoma del territorio y el fortalecimiento de la comunidad.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: 'group', title: 'Censo Comunitario', desc: 'Registro integral de la comunidad respetando la estructura de clanes y familias.' },
                                { icon: 'map', title: 'Catastro Propio', desc: 'Gestión territorial, linderos ancestrales y protección de la Madre Tierra.' },
                                { icon: 'gavel', title: 'Justicia Indígena', desc: 'Aplicación del Derecho Propio y armonización de conflictos territoriales.' },
                                { icon: 'ecg_heart', title: 'Salud Intercultural', desc: 'Digitalización de saberes ancestrales y gestión de medicina tradicional.' },
                            ].map((pillar, index) => (
                                <div key={index} className="group p-8 rounded-3xl border border-white/40 bg-white/50 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:border-primary/30 hover:-translate-y-2 transition-all duration-300">
                                    <div className="text-primary mb-6 group-hover:scale-110 transition-transform bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                                        <span className="material-symbols-outlined text-3xl">{pillar.icon}</span>
                                    </div>
                                    <h3 className="text-slate-900 text-xl font-bold mb-3">{pillar.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{pillar.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tecnología con Identidad (Glassmorphism) */}
                <section className="px-6 lg:px-20 py-20 relative overflow-hidden" id="tecnologia">
                    {/* Decorative blurred blobs */}
                    <div className="absolute -left-40 top-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[120px] pointer-events-none"></div>

                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
                        <div className="flex-1">
                            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2">Innovación</span>
                            <h2 className="text-slate-900 text-4xl lg:text-5xl font-black mb-6 leading-tight">Tecnología con Identidad Ancestral</h2>
                            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                                Nuestra plataforma no solo procesa datos; entiende nuestra ley de origen. Desarrollamos herramientas que protegen nuestros derechos frente a la modernidad.
                            </p>

                            <div className="bg-white/60 backdrop-blur-2xl p-8 rounded-3xl border border-white shadow-xl relative overflow-hidden">
                                <div className="absolute right-0 top-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
                                <div className="flex gap-4 items-start relative z-10">
                                    <div className="bg-primary/10 p-4 rounded-2xl text-primary border border-primary/20 shadow-inner">
                                        <span className="material-symbols-outlined text-3xl">psychology</span>
                                    </div>
                                    <div>
                                        <h4 className="text-slate-900 text-xl font-bold mb-2">Asistente Legal IA</h4>
                                        <p className="text-slate-600 leading-relaxed mb-4">
                                            Protección de los derechos comunitarios mediante inteligencia artificial especializada en legislación indígena y Derecho Mayor.
                                        </p>
                                        <ul className="space-y-3">
                                            <li className="flex items-center gap-3 text-slate-700 font-medium">
                                                <div className="bg-primary/20 p-1 rounded-full"><span className="material-symbols-outlined text-primary text-sm block">check</span></div>
                                                Análisis de decretos y leyes
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-700 font-medium">
                                                <div className="bg-primary/20 p-1 rounded-full"><span className="material-symbols-outlined text-primary text-sm block">check</span></div>
                                                Protección de autonomía jurídica
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 w-full">
                            <div className="aspect-square rounded-[3rem] p-4 bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl relative">
                                <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative">
                                    <img
                                        alt="Laboratorio tecnológico en el Cauca"
                                        className="w-full h-full object-cover saturate-50 hover:saturate-100 transition-all duration-700 scale-105 hover:scale-100"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwYnk3_SnuOqkW3yW4SVcgDA9s2TfRJojIIL1JrD9kM696-nNfLh0CIycY_iwcKLo0lC0n8l22WQIdc6LSqKU32gx_qEymGzfRxe8aLCEFzbz3gki8MYgj4Y33wDG1uSWtcv-OEkzC3tTgBHQeCJB5iVrQ4r9a0SgXJHPvRT35XSqMrZ4Uh6owBbver1EvpdbBZz649RUpLxVboxnz1s6O4YFjGTNATqhxwXIq2DW0s_RGWGF1tAFocSLIS4mk9WNfZyKDFzqeZ6M"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent mix-blend-overlay"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Impacto en el Territorio */}
                <section className="px-6 lg:px-20 py-24 bg-slate-900 text-white relative overflow-hidden" id="impacto">
                    <div className="absolute inset-0 bg-primary/20 backdrop-blur-3xl"></div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-center">
                            <div className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl hover:bg-white/10 transition-colors">
                                <div className="h-20 flex items-center">
                                    <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50">100%</span>
                                </div>
                                <h4 className="text-xl font-bold">Gestión Comunitaria</h4>
                                <p className="text-white/60">Procesos administrativos digitalizados bajo mando del Cabildo.</p>
                            </div>
                            <div className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl hover:bg-white/10 transition-colors">
                                <div className="h-20 flex items-center">
                                    <span className="material-symbols-outlined text-7xl text-primary-foreground drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">security</span>
                                </div>
                                <h4 className="text-xl font-bold">Protección del Derecho Mayor</h4>
                                <p className="text-white/60">Salvaguarda de las normas tradicionales y la autonomía política.</p>
                            </div>
                            <div className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl hover:bg-white/10 transition-colors">
                                <div className="h-20 flex items-center">
                                    <span className="material-symbols-outlined text-7xl text-primary-foreground drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">database</span>
                                </div>
                                <h4 className="text-xl font-bold">Soberanía de Datos</h4>
                                <p className="text-white/60">Total control sobre la información sensible del territorio.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Acceso Seguro */}
                <section className="px-6 lg:px-20 py-24 relative" id="acceso">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 order-2 lg:order-1 relative">
                            {/* Glassmorphism Grid */}
                            <div className="absolute inset-0 bg-secondary/20 blur-3xl rounded-full"></div>
                            <div className="grid grid-cols-2 gap-6 relative z-10">
                                {[
                                    { icon: 'shield_person', title: 'Cabildo' },
                                    { icon: 'verified_user', title: 'Guardia' },
                                    { icon: 'person', title: 'Comunero' },
                                    { icon: 'account_balance', title: 'Autoridad' },
                                ].map((role, i) => (
                                    <div key={i} className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-xl flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                                        <div className="bg-primary/10 p-4 rounded-full mb-4">
                                            <span className="material-symbols-outlined text-primary text-3xl block">{role.icon}</span>
                                        </div>
                                        <span className="font-bold text-slate-900 text-lg">{role.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 order-1 lg:order-2">
                            <h2 className="text-slate-900 text-4xl lg:text-5xl font-black mb-6 leading-tight">Acceso Seguro y Jerárquico</h2>
                            <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                Nuestra plataforma replica la estructura de autoridad tradicional. Cada rol tiene accesos específicos definidos por la asamblea comunitaria.
                            </p>
                            <Link href="/login" className="inline-flex items-center gap-3 bg-primary/10 px-6 py-3 rounded-xl text-primary font-bold text-lg hover:bg-primary hover:text-white transition-all duration-300 group">
                                Iniciar Sesión para Continuar
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-slate-950 text-slate-400 px-6 lg:px-20 py-16 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 border-b border-white/10 pb-12 mb-12">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3 text-white">
                                <span className="material-symbols-outlined text-3xl">landscape</span>
                                <h2 className="text-2xl font-black tracking-tight">Wala Kiwe</h2>
                            </div>
                            <p className="max-w-xs text-sm leading-relaxed">Software para el fortalecimiento del Gobierno Propio y la Soberanía Digital en el Cauca.</p>
                        </div>
                        <div className="flex flex-wrap gap-8 font-medium">
                            <a className="hover:text-white transition-colors" href="#">Términos</a>
                            <a className="hover:text-white transition-colors" href="#">Privacidad</a>
                            <a className="hover:text-white transition-colors" href="#">Soporte Técnico</a>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-white p-2 rounded-xl backdrop-blur-md">
                                <Image
                                    width={40} height={40}
                                    alt="Logo ACIN"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA88yBjz1LXD8XTzhgCuSKMfal0rgYhZA8dvnnU9pYs1sXCxm6L8ic2ueu6Vg0YEN5HT1YMxGfbF8b_3LyjMVmD9Jhd21u1sY4RVDe0p_BJKk5IFOThY2rAKCLqyT6pzWVR0bGyc7U92rTqD8R6rEB8oId0fFloSvaCxMuigfNkaMra3vqhHp7OEK5v5n0_izfU8FtrlryoMtlSwi6eCONrXJPPKRPn55gajiDWmKYf5Pj3wvBDqniiDg4rFSfHp8WbwkXu9i2cteo"
                                    unoptimized
                                />
                            </div>
                            <p className="text-sm font-medium">Asociación de Cabildos Indígenas del Norte del Cauca (ACIN)</p>
                        </div>
                        <p className="text-sm">© {new Date().getFullYear()} Wala Kiwe. Hecho con respeto por la tradición.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
