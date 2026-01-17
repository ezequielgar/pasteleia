'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            router.push('/admin/dashboard');
            router.refresh();
        } catch (error) {
            console.error('Login error:', error);
            setError('Credenciales inválidas. Por favor verifique e intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 font-display">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-auto flex flex-col items-center justify-center text-center bg-retro-bg border-[2px] border-retro-border rounded-[20px] shadow-[3px_4px_0px_1px_#E99F4C] p-8 md:p-12"
            >
                <p className="text-retro-border font-black text-2xl md:text-3xl mt-5 mb-8 tracking-wide">
                    PANEL ADMIN
                </p>

                <form onSubmit={handleLogin} className="flex flex-col items-center w-full">
                    {error && (
                        <div className="mb-6 p-3 bg-red-100 border-2 border-red-500 text-red-700 rounded-md text-sm font-bold w-full max-w-[290px]">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col items-baseline m-2.5 w-full max-w-[290px]">
                        <label className="font-semibold my-1.5 text-retro-border text-sm md:text-base uppercase tracking-wider" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="admin@pasteleia.com"
                            className="outline-none border-[2px] border-retro-border shadow-[3px_4px_0px_1px_#E99F4C] w-full p-3 rounded-[4px] text-[15px] focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#E99F4C] transition-all duration-150 font-sans"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col items-baseline m-2.5 w-full max-w-[290px]">
                        <label className="font-semibold my-1.5 text-retro-border text-sm md:text-base uppercase tracking-wider" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="outline-none border-[2px] border-retro-border shadow-[3px_4px_0px_1px_#E99F4C] w-full p-3 rounded-[4px] text-[15px] focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#E99F4C] transition-all duration-150 font-sans"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="w-full max-w-[290px]">
                        <button
                            className="p-4 my-6 w-full text-[15px] bg-retro-btn rounded-[10px] font-extrabold text-white shadow-[3px_3px_0px_0px_#E99F4C] hover:opacity-90 focus:translate-y-1 focus:shadow-none transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest"
                            disabled={loading}
                        >
                            {loading ? 'INGRESANDO...' : 'INGRESAR'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
