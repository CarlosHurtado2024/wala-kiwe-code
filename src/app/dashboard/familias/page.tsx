"use client";

import React from 'react';
import {
    ChevronRight,
    MapPin,
    Edit,
    UserPlus,
    Users,
    MoreVertical,
    ShieldCheck,
    AlertTriangle,
    Map as MapIcon,
    CheckCircle2,
    Baby,
    User,
    MoreHorizontal
} from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

export default function FamiliasPage() {
    const members = [
        {
            name: "Elena Valencia Tunubalá",
            role: "Jefa de Hogar",
            info: "CC 34.556.778 • 45 años • Mayor",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAO3TRFwaT6g61TiReO1kEHgLlVAcWpiN1f3lGWFe_1UI6F2CbuDtFYbg5zwaBEFajN8ahkbL8hkpw3VZ0QMxFgVGS5WNe1-xMyvet-JJmgNfopqgVIUYz1oUFiHRCdxbbqgKBAP-SwrbXY8-1HFSwnxN0Lpi3cbJT5ATfxoEVmdnwn_NT5vxaDlwaXyQ_ykpL1JWWSWxVTOdSMInf3r4MnZabTaJ5hDwUiVOEja9KYcyOpX241rJZ6dxZhLs5sqt2eCfXRBEzz6Bw",
            isHead: true
        },
        {
            name: "Ricardo Tunubalá",
            role: "Cónyuge",
            info: "CC 10.234.556 • 48 años • Mayor",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRrw_ikkg2eXHbc12EqAM1sIcfKsAD_riw_Cr_B9MOtLSayVWWMgpNS1aP8Uy13E83QJq05A4eMgjdmhL3DLHdyqTGXdbfMS0bV27ZD3hGjVYNWF9_saYbv65gpRNn0hnP-i5H4lYSGuA8plhWq6C2CgmNcGayJZSlOYO8tsPfEWUV9OvKQIMl7Sn4lunJpefyN2MK_7Y-MFybrqS-zxH2L5BPpfiECsRHqSxsOuZpMwYNYJ76UN7QA6oh9a8ieuZ_Qgh3_fsMoYA",
            isHead: false
        },
        {
            name: "Andrés Tunubalá Valencia",
            role: "Hijo",
            info: "TI 1.098.344.221 • 19 años • Joven",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbgWAanZKLiW8JMIFFYhzzfsuoNDv-kSUBsgO639sB8oHUcTcG82w80PtaPEKXmfZm_yTgSgL1H9lbaysEVs8Q4vWdJ6mk-O2vR8x135Wo5RyeBqHotS4qo6_pKYju_DAa0pFGFVu_y_HosWBksWpt6w039xjLaljNMzL0HTuzMqjK70QOy_aJN868bx7Vaqug2eBuDoTKo_V8CqzIyoNSK39JvNve5XM5cw0bGKK63U6ONfnql-pp-yf5HPTGJShDv962V2RMCV4",
            isHead: false
        },
        {
            name: "Sofía Tunubalá Valencia",
            role: "Hija",
            info: "RC 1.112.345.678 • 8 años • Niña",
            image: null,
            isHead: false,
            isChild: true
        }
    ];

    return (
        <div className="flex-1 flex flex-col min-h-0 bg-transparent">
            {/* Content Area */}
            <main className="flex-1 p-8 lg:p-12 overflow-y-auto custom-scrollbar">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-3 text-white/40 text-xs font-bold uppercase tracking-widest mb-8">
                    <Link href="/dashboard" className="hover:text-primary-300 transition-colors">Gestión Familiar</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-white">Ficha Familiar</span>
                </div>

                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
                    <div>
                        <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter drop-shadow-2xl">
                            Familia Valencia Tunubalá
                        </h2>
                        <p className="text-white/50 flex items-center gap-2 mt-2 font-medium">
                            <MapPin className="w-4 h-4 text-primary-300" />
                            Resguardo Indígena - Vereda El Jardín
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-3 px-6 py-3 rounded-2xl border border-white/10 bg-white/5 text-white/80 font-bold text-sm hover:bg-white/10 transition-all backdrop-blur-xl shadow-lg">
                            <Edit className="w-4 h-4" />
                            Actualizar Estado
                        </button>
                        <button className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 border border-primary/20">
                            <UserPlus className="w-4 h-4" />
                            Agregar Miembro
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Main Info Column */}
                    <div className="lg:col-span-8 space-y-10">

                        {/* Location Card (Glassmorphism) */}
                        <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 group">
                            <div className="flex flex-col md:flex-row h-full">
                                <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                                    <Image
                                        className="absolute inset-0 w-full h-full object-cover saturate-50 group-hover:saturate-100 group-hover:scale-105 transition-all duration-700"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBsmwURQY_GyLIIOBzdyrZw6vsgv4wa-hVjpV2VcVuqVeojT2AzTX7n-dIl2nxvjdE51iNtSQssijlykb-Tv-ofcllo6jo-WFGPgkPT-iJQlvleY3xBax91UU-QBAhPgKUsYBPpDS6Wdyu0JJw2K7plFBi3b0bL3nN7aAa3EAAvV2qoWiRjcfwaoc1MBYTrR4tgtWpHRnTpDuNSeYPpgc52MzmU87_JceOxo6IWpENshcW4F_cIzuKeBi2Vnbylh8OKpYae-LQzGM"
                                        alt="Territorio"
                                        width={400}
                                        height={300}
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 to-transparent"></div>
                                </div>
                                <div className="p-8 flex-1 flex flex-col justify-between">
                                    <div>
                                        <span className="text-[10px] font-black text-primary-300 uppercase tracking-[0.3em]">Datos Geográficos</span>
                                        <h3 className="text-2xl font-black text-white mt-1 mb-6 tracking-tight">Ubicación y Territorio</h3>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div>
                                                <p className="text-white/30 text-[9px] uppercase font-black tracking-widest mb-1">Vereda</p>
                                                <p className="text-white font-bold">El Jardín</p>
                                            </div>
                                            <div>
                                                <p className="text-white/30 text-[9px] uppercase font-black tracking-widest mb-1">Sector</p>
                                                <p className="text-white font-bold">Norte</p>
                                            </div>
                                        </div>
                                        <div className="mt-6">
                                            <p className="text-white/30 text-[9px] uppercase font-black tracking-widest mb-1">Predio</p>
                                            <p className="text-white font-bold">La Esperanza (ID: 0045-BK)</p>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex justify-end">
                                        <button className="flex items-center gap-2 text-primary-300 font-black text-xs uppercase tracking-widest hover:text-white transition-all group">
                                            <MapIcon className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                                            Ver en Mapa Cartográfico
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Family Members List */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-black text-white flex items-center gap-3 tracking-tight">
                                    <Users className="w-6 h-6 text-primary-300" />
                                    Integrantes de la Familia
                                    <span className="bg-white/5 text-white/40 text-[10px] font-black px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">5 Miembros</span>
                                </h3>
                            </div>

                            <div className="space-y-4">
                                {members.map((member, i) => (
                                    <div key={i} className={`flex items-center justify-between p-6 bg-white/5 backdrop-blur-xl border ${member.isHead ? 'border-primary/40 shadow-lg shadow-primary/5' : 'border-white/5'} rounded-[2rem] hover:bg-white/10 transition-all group cursor-pointer`}>
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 border-2 border-white/10 group-hover:border-primary/50 transition-all grayscale-[0.4] group-hover:grayscale-0">
                                                {member.image ? (
                                                    <Image
                                                        src={member.image}
                                                        alt={member.name}
                                                        width={64}
                                                        height={64}
                                                        className="w-full h-full object-cover"
                                                        unoptimized
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-white/20">
                                                        <User className="w-8 h-8" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <h4 className="text-lg font-black text-white group-hover:text-primary-200 transition-colors uppercase tracking-tight">{member.name}</h4>
                                                    <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${member.isHead ? 'bg-primary/20 text-primary-300 border border-primary/30' : 'bg-white/5 text-white/40 border border-white/10'}`}>
                                                        {member.role}
                                                    </span>
                                                </div>
                                                <p className="text-white/40 text-xs mt-1 font-medium tracking-wide">{member.info}</p>
                                            </div>
                                        </div>
                                        <button className="p-3 text-white/20 hover:text-white transition-colors">
                                            <MoreHorizontal className="w-6 h-6" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Secondary Info Column */}
                    <div className="space-y-8">

                        {/* Summary Card */}
                        <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-2xl border border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <h4 className="text-xs font-black text-white/30 uppercase tracking-[0.3em] mb-8 relative z-10">Resumen Familiar</h4>
                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center justify-between">
                                    <span className="text-white/60 text-sm font-medium">Estado de la Ficha</span>
                                    <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">Activa</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-white/60 text-sm font-medium">Última Actualización</span>
                                    <span className="text-white font-bold text-sm">12 Oct 2023</span>
                                </div>
                                <hr className="border-white/5" />
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { label: "Mayores", value: 2 },
                                        { label: "Jóvenes", value: 1 },
                                        { label: "Niños/as", value: 2 },
                                        { label: "Sabedores", value: 1 },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-black/20 p-4 rounded-2xl border border-white/5 shadow-inner">
                                            <p className="text-white/30 text-[9px] uppercase font-black tracking-widest">{stat.label}</p>
                                            <p className="text-xl font-black text-white mt-1">{stat.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Production Card */}
                        <div className="bg-primary/10 backdrop-blur-3xl rounded-[2.5rem] p-8 border border-primary/20 shadow-[0_0_50px_rgba(var(--primary)/10)] relative overflow-hidden group">
                            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <h4 className="text-white text-lg font-black mb-6 flex items-center gap-3 tracking-tight">
                                <div className="bg-primary/20 p-2 rounded-xl">
                                    <Agriculture className="w-5 h-5 text-primary-300" />
                                </div>
                                Actividad Productiva
                            </h4>
                            <div className="space-y-4 relative z-10">
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-black/20 px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-black text-white/80 uppercase tracking-widest">Café Orgánico</span>
                                    <span className="bg-black/20 px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-black text-white/80 uppercase tracking-widest">Pancoger</span>
                                </div>
                                <p className="text-xs text-white/50 leading-relaxed font-medium">
                                    Socio de la cooperativa local desde 2018. Certificación en buenas prácticas agrícolas y comercio justo.
                                </p>
                                <button className="w-full mt-4 py-3.5 text-[10px] font-black text-primary-300 bg-white/5 rounded-2xl border border-primary/30 hover:bg-primary hover:text-white transition-all uppercase tracking-[0.2em] shadow-lg shadow-primary/5">
                                    Ver Ficha Productiva
                                </button>
                            </div>
                        </div>

                        {/* Health/Alerts */}
                        <div className="bg-orange-500/10 backdrop-blur-3xl rounded-[2.5rem] p-8 border border-orange-500/20 shadow-[0_0_50px_rgba(249,115,22,0.1)] group">
                            <h4 className="text-white text-lg font-black mb-6 flex items-center gap-3 tracking-tight">
                                <div className="bg-orange-500/20 p-2 rounded-xl">
                                    <AlertTriangle className="w-5 h-5 text-orange-400 group-hover:animate-pulse" />
                                </div>
                                Alertas de Salud
                            </h4>
                            <div className="p-4 bg-orange-500/5 rounded-2xl border border-orange-500/10">
                                <p className="text-sm text-orange-200/80 leading-relaxed font-medium">
                                    1 niño requiere control de crecimiento y desarrollo pendiente este mes.
                                </p>
                                <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-orange-400 uppercase tracking-widest">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Prioridad Alta
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

// Custom simple components for Agriculture and Alert icons if necessary
function Agriculture(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
        >
            <path d="M12 2v10" /><path d="m18 8-6 6-6-6" /><path d="M12 12c-3.3 0-6 2.7-6 6v4h12v-4c0-3.3-2.7-6-6-6Z" />
        </svg>
    );
}
