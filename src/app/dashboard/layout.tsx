import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
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
        <div className="relative flex w-full h-screen overflow-hidden font-sans text-white">
            {/* Background Image with Overlay for Glassmorphism */}
            <div
                className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCa3O6AsgJivp47aXI_zPa4nRQCK8FJl6R7i4UE0IkRJLLeIs2NiBcQh46o2cB4i3pwpxPyEneKRPXxhfZIz2-Sq7pCVbh4bIT9QAjt2klokZrnh-lEYtnA0U2GzpDCV3EpsAnNohBqM6EJF2fzw9snK5QP-UD-_VbQmpXSlMUGalWDk0jNsh7cmf8hC6j9WP7PjbVDcdCVqRis0ZGN7JaaMl0AgQPYbAr6Y2OgmOe3mQizSDQpbpFWO5VfpeUlMFpg7V8thys_HNo")' }}
            >
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"></div>
            </div>

            {/* Sidebar Navigation */}
            <Sidebar userRole={role} userName={fullName as string} userInitial={initial} />

            {/* Main Content Area */}
            <main className="relative z-10 flex-1 overflow-y-auto scroll-smooth flex flex-col">
                {children}
            </main>
        </div>
    );
}
