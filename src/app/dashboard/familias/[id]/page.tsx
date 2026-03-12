"use client";

import React from 'react';
import {
    ChevronRight,
    MapPin,
    Edit,
    UserPlus,
    Users,
    MoreVertical,
    Map as MapIcon,
    Baby,
    User,
    AlertTriangle,
    CheckCircle2
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
        <section className="flex-1 p-6 lg:p-10 overflow-y-auto">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6">
                <Link href="/dashboard" className="hover:text-primary transition-colors">Gestión Familiar</Link>
                <ChevronRight className="w-3 h-3 text-xs" />
                <span className="text-foreground font-medium">Ficha Familiar</span>
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-black text-foreground tracking-tight">Familia Valencia Tunubalá</h2>
                    <p className="text-muted-foreground flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4 text-sm" />
                        Resguardo Indígena - Vereda El Jardín
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-foreground font-bold text-sm hover:bg-secondary transition-colors shadow-sm">
                        <Edit className="w-4 h-4 text-sm" />
                        Actualizar Estado
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                        <UserPlus className="w-4 h-4 text-sm" />
                        Agregar Miembro
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info Column */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Location Card */}
                    <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 relative h-48 md:h-auto">
                                <Image
                                    className="absolute inset-0 w-full h-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBsmwURQY_GyLIIOBzdyrZw6vsgv4wa-hVjpV2VcVuqVeojT2AzTX7n-dIl2nxvjdE51iNtSQssijlykb-Tv-ofcllo6jo-WFGPgkPT-iJQlvleY3xBax91UU-QBAhPgKUsYBPpDS6Wdyu0JJw2K7plFBi3b0bL3nN7aAa3EAAvV2qoWiRjcfwaoc1MBYTrR4tgtWpHRnTpDuNSeYPpgc52MzmU87_JceOxo6IWpENshcW4F_cIzuKeBi2Vnbylh8OKpYae-LQzGM"
                                    alt="Satellite view of rural mountain territory"
                                    width={400}
                                    height={300}
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Datos Geográficos</span>
                                    <h3 className="text-xl font-bold text-foreground mt-1 mb-4">Ubicación y Territorio</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-muted-foreground text-xs uppercase font-bold">Vereda</p>
                                            <p className="text-foreground font-medium">El Jardín</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-xs uppercase font-bold">Sector</p>
                                            <p className="text-foreground font-medium">Norte</p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-muted-foreground text-xs uppercase font-bold">Predio</p>
                                        <p className="text-foreground font-medium">La Esperanza (ID: 0045-BK)</p>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <button className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                                        <MapIcon className="w-4 h-4 text-sm" />
                                        Ver en Mapa Cartográfico
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Family Members */}
                    <div>
                        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5 text-primary" />
                            Integrantes de la Familia (5)
                        </h3>

                        <div className="space-y-3">
                            {members.map((member, i) => (
                                <div key={i} className={`flex items-center justify-between p-4 bg-card border ${member.isHead ? 'border-primary/30' : 'border-border'} rounded-xl shadow-sm`}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary flex items-center justify-center text-muted-foreground">
                                            {member.image ? (
                                                <Image
                                                    src={member.image}
                                                    alt={member.name}
                                                    width={48}
                                                    height={48}
                                                    className="w-full h-full object-cover"
                                                    unoptimized
                                                />
                                            ) : (
                                                member.isChild ? <Baby className="w-6 h-6" /> : <User className="w-6 h-6" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-foreground font-bold">{member.name}</h4>
                                                <span className={`${member.isHead ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase`}>
                                                    {member.role}
                                                </span>
                                            </div>
                                            <p className="text-muted-foreground text-sm">{member.info}</p>
                                        </div>
                                    </div>
                                    <button className="p-2 text-muted-foreground hover:text-foreground">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Secondary Info Column */}
                <div className="space-y-6">

                    {/* Summary Card */}
                    <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                        <h4 className="text-foreground font-bold mb-4">Resumen Familiar</h4>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Estado de la Ficha</span>
                                <span className="px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] font-bold uppercase">Activa</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Última Actualización</span>
                                <span className="text-foreground font-medium">12 Oct 2023</span>
                            </div>
                            <hr className="border-border" />
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Mayores</span>
                                    <span className="font-bold">2</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Jóvenes</span>
                                    <span className="font-bold">1</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Niños/as</span>
                                    <span className="font-bold">2</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Production Card */}
                    <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                        <h4 className="text-foreground font-bold mb-4 flex items-center gap-2">
                            <Agriculture className="w-5 h-5 text-primary" />
                            Actividad Productiva
                        </h4>
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <span className="bg-card px-2 py-1 rounded border border-primary/10 text-[11px] font-medium text-foreground">Café Orgánico</span>
                                <span className="bg-card px-2 py-1 rounded border border-primary/10 text-[11px] font-medium text-foreground">Pancoger</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Socio de la cooperativa local desde 2018. Certificación en buenas prácticas agrícolas.</p>
                            <button className="w-full mt-2 py-2 text-xs font-bold text-primary bg-card rounded-lg border border-primary/20 hover:bg-primary/10 transition-colors">
                                Ver Ficha Productiva
                            </button>
                        </div>
                    </div>

                    {/* Health/Alerts */}
                    <div className="bg-orange-50 dark:bg-orange-900/10 rounded-xl p-6 border border-orange-200 dark:border-orange-800/30">
                        <h4 className="text-foreground font-bold mb-4 flex items-center gap-2 text-orange-700 dark:text-orange-400">
                            <AlertTriangle className="w-5 h-5" />
                            Alertas de Salud
                        </h4>
                        <p className="text-sm text-orange-800 dark:text-orange-300">
                            1 niño requiere control de crecimiento y desarrollo pendiente este mes.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}

// Custom simple component for Agriculture icon
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

