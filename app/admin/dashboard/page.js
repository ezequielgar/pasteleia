'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import Card from '@/components/ui/Card';
import { Package, ShoppingBag, TrendingUp, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        products: 0,
        lowStock: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Get total products
                const { count: productsCount } = await supabase
                    .from('products')
                    .select('*', { count: 'exact', head: true });

                // Get low stock products
                const { count: lowStockCount } = await supabase
                    .from('products')
                    .select('*', { count: 'exact', head: true })
                    .lt('stock', 5);

                setStats({
                    products: productsCount || 0,
                    lowStock: lowStockCount || 0
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const cards = [
        {
            title: 'Productos Totales',
            value: stats.products,
            icon: Package,
            color: 'bg-blue-500',
            href: '/admin/productos'
        },
        {
            title: 'Stock Bajo',
            value: stats.lowStock,
            icon: AlertCircle,
            color: 'bg-orange-500',
            href: '/admin/productos'
        },
        // Placeholder for future metrics
        // {
        //     title: 'Ventas del Mes',
        //     value: '$0',
        //     icon: TrendingUp,
        //     color: 'bg-green-500',
        //     href: '#'
        // }
    ];

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Cargando estadísticas...</div>;
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-display text-dark-800">Dashboard</h1>
                <p className="text-gray-600">Bienvenido al panel de administración de Pasteleia.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <Link key={index} href={card.href}>
                        <Card className="p-6 transition-transform hover:-translate-y-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium mb-1">
                                        {card.title}
                                    </p>
                                    <h3 className="text-3xl font-bold text-dark-800">
                                        {card.value}
                                    </h3>
                                </div>
                                <div className={`p-4 rounded-full ${card.color} bg-opacity-10`}>
                                    <card.icon className={`w-6 h-6 ${card.color.replace('bg-', 'text-')}`} />
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
