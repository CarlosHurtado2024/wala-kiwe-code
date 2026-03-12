"use client";

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Maximize2, Minimize2 } from 'lucide-react';
import { askFloatingKomi } from '@/app/dashboard/FloatingChatAction';
import ReactMarkdown from 'react-markdown';
import dynamic from 'next/dynamic';
const DataVisualization = dynamic(() => import('@/components/DataVisualization'), { ssr: false });
import remarkGfm from 'remark-gfm';

const SpiralIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 12c-2.5 0-2.5-3 0-3s4.5 1 4.5 4.5-2 6.5-6.5 6.5S2 16.5 2 12s4-10.5 10.5-10.5S23 6 23 12c0 6.5-5 12-11.5 12" />
    </svg>
);

type ChatMessage = {
    role: "user" | "assistant";
    content: string;
    tableData?: any[] | null;
    error?: boolean;
};

export default function FloatingAIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([{
        role: "assistant",
        content: "👋 ¡Hola! Soy **Komi**, tu asistente de datos. Puedo cruzar información de comuneros, familias y predios, y generar tablas personalizadas. Pregúntame lo que necesites."
    }]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen, isExpanded]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMsg }]);
        setIsLoading(true);

        try {
            const historyToPass = messages.map(m => ({ role: m.role, content: m.content }));
            const response = await askFloatingKomi(userMsg, historyToPass);
            setMessages(prev => [...prev, {
                role: "assistant",
                content: response.answer,
                tableData: response.tableData,
                error: response.error
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: "assistant",
                content: "Hubo un error de conexión al consultar al Asistente.",
                error: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
            {/* Bubble */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="group relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 flex items-center justify-center transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30 active:scale-95"
                >
                    <div className="absolute inset-0 rounded-2xl bg-primary/30 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity pointer-events-none" />
                    <SpiralIcon className="w-6 h-6 relative z-10" />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div
                    className={`bg-card/95 backdrop-blur-2xl border border-border shadow-2xl flex flex-col overflow-hidden animate-scale-in ${isExpanded ? 'fixed inset-4 sm:inset-10 rounded-2xl' : 'w-[380px] h-[580px] rounded-2xl mb-3'}`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3.5 border-b border-border bg-card">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center border border-primary/15">
                                <SpiralIcon className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-foreground">Komi IA</h3>
                                <p className="text-[9px] text-muted-foreground uppercase tracking-[0.15em] font-semibold">
                                    {isExpanded ? 'Modo Expandido' : 'Análisis de Datos'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <button onClick={() => setIsExpanded(!isExpanded)} className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-all">
                                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                            </button>
                            <button onClick={() => setIsOpen(false)} className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-all">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-background/50">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-slide-up`} style={{ animationDelay: `${i * 0.05}s` }}>
                                <div className={`flex items-start gap-2.5 max-w-[88%] ${isExpanded ? 'max-w-[70%]' : ''} ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    {msg.role === 'assistant' && (
                                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 border border-primary/15 mt-0.5">
                                            <SpiralIcon className="w-3.5 h-3.5 text-primary" />
                                        </div>
                                    )}
                                    <div className="flex flex-col">
                                        <div className={`px-4 py-3 ${msg.role === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-2xl rounded-tr-md shadow-sm'
                                            : msg.error
                                                ? 'bg-destructive/10 text-destructive border border-destructive/20 rounded-2xl rounded-tl-md'
                                                : 'bg-card border border-border text-foreground rounded-2xl rounded-tl-md shadow-sm'
                                            }`}>
                                            {msg.role === 'assistant' ? (
                                                <div className="text-sm leading-relaxed prose prose-sm max-w-none prose-p:leading-relaxed prose-strong:text-primary prose-strong:font-bold prose-headings:text-foreground prose-chat">
                                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                        {msg.content}
                                                    </ReactMarkdown>
                                                </div>
                                            ) : (
                                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                            )}
                                        </div>
                                        {msg.tableData && msg.tableData.length > 0 && !isLoading && (
                                            <div className="mt-2 bg-card rounded-xl border border-border overflow-hidden">
                                                <DataVisualization data={msg.tableData} question={msg.content} />
                                            </div>
                                        )}
                                        {msg.tableData && msg.tableData.length === 0 && (
                                            <div className="mt-2 text-xs text-muted-foreground italic">La consulta no arrojó resultados adicionales.</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-start gap-2.5 animate-slide-up">
                                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 border border-primary/15">
                                    <SpiralIcon className="w-3.5 h-3.5 text-primary" />
                                </div>
                                <div className="px-4 py-3 rounded-2xl rounded-tl-md bg-card border border-border text-foreground flex items-center gap-2.5 shadow-sm">
                                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                    <span className="text-xs font-bold text-primary/70 animate-pulse uppercase tracking-wider">Analizando...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 border-t border-border bg-card">
                        <form onSubmit={handleSubmit} className="relative flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isLoading}
                                placeholder="Ej: ¿Cuántas familias tienen predios?"
                                className="w-full bg-secondary border border-border rounded-xl pl-4 pr-12 py-3 text-sm text-foreground focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all placeholder:text-muted-foreground disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="absolute right-2 p-2 bg-primary hover:bg-primary/90 rounded-lg text-primary-foreground transition-all disabled:opacity-30 shadow-sm"
                            >
                                <Send className="w-3.5 h-3.5" />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
