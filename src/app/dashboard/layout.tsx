import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import FloatingAIAssistant from "@/components/FloatingAIAssistant";
import { Database } from "@/utils/supabase/database.types";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Get user profile role
    const { data: profile } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    const role: Database['public']['Enums']['app_role'] = profile?.role || 'comunero';
    const fullName = user.user_metadata?.name || user.email?.split('@')[0] || "Usuario";
    const initial = fullName.substring(0, 2);

    return (
        <div className="relative flex w-full h-screen overflow-hidden font-sans text-foreground bg-secondary">
            {/* Sidebar Navigation */}
            <Sidebar userRole={role} userName={fullName as string} userInitial={initial} />

            {/* Main Content Area */}
            <main className="relative z-10 flex-1 overflow-y-auto scroll-smooth flex flex-col">
                {children}
            </main>

            {/* Global AI Assistant */}
            <FloatingAIAssistant />
        </div>
    );
}
