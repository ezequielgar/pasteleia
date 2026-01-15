'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Package,
    LogOut,
    Menu,
    X,
    ShoppingBag,
    TrendingUp,
    BookOpen
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const menuItems = [
        {
            name: 'Dashboard',
            href: '/admin/dashboard',
            icon: LayoutDashboard,
        },
        {
            name: 'Productos',
            href: '/admin/productos',
            icon: Package,
        },
        {
            name: 'Pedidos',
            href: '/admin/pedidos',
            icon: ShoppingBag,
        },
        {
            name: 'Finanzas',
            href: '/admin/finanzas',
            icon: TrendingUp,
        },
        {
            name: 'Recetas',
            href: '/admin/recetas',
            icon: BookOpen,
        }
    ];

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
        router.refresh();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
                    transform transition-transform duration-200 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                <div className="h-full flex flex-col">
                    <div className="p-6 border-b border-gray-200">
                        <h1 className="text-2xl font-display text-primary-600">
                            Pasteleia Admin
                        </h1>
                    </div>

                    <nav className="flex-1 p-4 space-y-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                                        flex items-center px-4 py-3 rounded-xl transition-colors
                                        ${isActive
                                            ? 'bg-primary-50 text-primary-700 font-medium'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                                    `}
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <item.icon className="w-5 h-5 mr-3" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-gray-200">
                        <button
                            onClick={handleLogout}
                            className="flex items-center px-4 py-3 w-full rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="w-5 h-5 mr-3" />
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                    <span className="font-display text-lg text-primary-600">Admin</span>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-lg hover:bg-gray-100"
                    >
                        {isSidebarOpen ? <X /> : <Menu />}
                    </button>
                </header>

                <main className="flex-1 overflow-auto p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
