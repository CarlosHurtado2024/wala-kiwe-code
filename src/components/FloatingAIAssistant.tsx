"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, MessageSquare, Send, Loader2, Maximize2, Minimize2 } from 'lucide-react';
import { askFloatingKomi } from '@/app/dashboard/FloatingChatAction';
import ReactMarkdown from 'react-markdown';
import dynamic from 'next/dynamic';
const DataVisualization = dynamic(() => import('@/components/DataVisualization'), { ssr: false });
import remarkGfm from 'remark-gfm';

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
        content: "👋 ¡Hola! Soy Komi IA. Puedo cruzar información de comuneros, familias y predios, y generarte tablas personalizadas. Pregúntame lo que necesites."
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
                    className="group bg-primary hover:bg-primary-600 text-white w-16 h-16 rounded-full shadow-[0_0_30px_rgba(4,102,166,0.5)] flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                >
                    <div className="absolute inset-0 rounded-full bg-primary-400 opacity-0 group-hover:animate-ping transition-opacity"></div>
                    <Sparkles className="w-7 h-7 relative z-10" />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div
                    className={`bg-slate-950/90 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col transition-all overflow-hidden ${isExpanded ? 'fixed inset-4 sm:inset-10 rounded-3xl' : 'w-[400px] h-[600px] rounded-3xl mb-4'}`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-primary/20 to-transparent">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-white uppercase tracking-widest">Komi Data Analyst</h3>
                                <p className="text-[10px] text-white/50 uppercase tracking-[0.2em]">{isExpanded ? 'Modo Expandido' : 'Wala Kiwe IA'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setIsExpanded(!isExpanded)} className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                {isExpanded ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                            </button>
                            <button onClick={() => setIsOpen(false)} className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`flex items-start gap-3 max-w-[90%] ${isExpanded ? 'max-w-[70%]' : ''} ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    {msg.role === 'assistant' && (
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30 mt-1">
                                            <Sparkles className="w-4 h-4 text-primary-300" />
                                        </div>
                                    )}
                                    <div className="flex flex-col">
                                        <div className={`p-4 rounded-2xl ${msg.role === 'user'
                                            ? 'bg-primary text-white rounded-tr-sm'
                                            : msg.error
                                                ? 'bg-red-500/10 text-red-200 border border-red-500/20 rounded-tl-sm'
                                                : 'bg-white/5 border border-white/10 text-white/80 rounded-tl-sm'
                                            }`}>
                                            {msg.role === 'assistant' ? (
                                                <div className="text-sm leading-relaxed prose prose-invert prose-p:leading-relaxed prose-strong:text-primary-300 prose-strong:font-bold max-w-none">
                                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                        {msg.content}
                                                    </ReactMarkdown>
                                                </div>
                                            ) : (
                                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                            )}
                                        </div>
                                        {msg.tableData && msg.tableData.length > 0 && !isLoading && (
                                            <DataVisualization data={msg.tableData} question={msg.content} />
                                        )}
                                        {msg.tableData && msg.tableData.length === 0 && (
                                            <div className="mt-2 text-xs text-white/40 italic">La consulta no arrojó resultados adicionales para graficar.</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-start gap-3 w-[80%]">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30 mt-1">
                                    <Sparkles className="w-4 h-4 text-primary-300" />
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/80 rounded-tl-sm flex items-center gap-3">
                                    <Loader2 className="w-4 h-4 animate-spin text-primary-400" />
                                    <span className="text-xs font-black uppercase tracking-widest text-primary-200 animate-pulse">Analizando la base de datos...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-white/10 bg-slate-900/50 backdrop-blur-md">
                        <form onSubmit={handleSubmit} className="relative flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isLoading}
                                placeholder="Ej: ¿Cuántas familias tienen predios grandes?"
                                className="w-full bg-black/50 border border-white/10 rounded-2xl pl-5 pr-14 py-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-white/20 disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="absolute right-3 p-2 bg-primary hover:bg-primary-600 rounded-xl text-white transition-all disabled:opacity-50 disabled:hover:bg-primary"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                        <p className="text-center mt-3 text-[9px] text-white/30 uppercase tracking-[0.2em]">Agente Inteligente de Análisis Estructural</p>
                    </div>
                </div>
            )}
        </div>
    );
}
