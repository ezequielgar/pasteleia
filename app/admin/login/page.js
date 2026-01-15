'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
<<<<<<< HEAD
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
=======
import { supabase } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Lock } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
>>>>>>> feat-manual-sales

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
<<<<<<< HEAD
        setError(null);
=======
        setError('');
>>>>>>> feat-manual-sales

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            router.push('/admin/dashboard');
            router.refresh();
        } catch (error) {
<<<<<<< HEAD
            console.error('Login error:', error);
            setError('Credenciales inválidas. Por favor verifique e intente nuevamente.');
=======
            setError(error.message);
>>>>>>> feat-manual-sales
        } finally {
            setLoading(false);
        }
    };

    return (
<<<<<<< HEAD
        <div className="min-h-screen bg-primary-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-display text-dark-800 mb-2">
                        Panel de Administración
                    </h1>
                    <p className="text-dark-600">
                        Inicia sesión para gestionar tu pastelería
                    </p>
                </div>

                <Card className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                                <Lock className="w-8 h-8 text-primary-600" />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
                                {error}
                            </div>
                        )}

                        <Input
                            label="Email"
                            type="email"
                            placeholder="admin@pasteleia.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Input
                            label="Contraseña"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            loading={loading}
                        >
                            Ingresar
                        </Button>
                    </form>
                </Card>
            </motion.div>
=======
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                        <Lock className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
                    <p className="text-gray-500 mt-2">Ingresa tus credenciales para continuar</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="admin@pasteleia.com"
                    />

                    <Input
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                    />

                    <Button type="submit" className="w-full" loading={loading}>
                        Ingresar
                    </Button>
                </form>
            </div>
>>>>>>> feat-manual-sales
        </div>
    );
}
