'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import Card from '@/components/ui/Card';
import { Package, AlertTriangle, TrendingUp, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const [stats, setStats] = useState({
        products: 0,
        lowStock: 0,
        orders: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                // Products Count
                const { count: productsCount } = await supabase
                    .from('products')
                    .select('*', { count: 'exact', head: true });

                // Low Stock Count
                const { count: lowStockCount } = await supabase
                    .from('products')
                    .select('*', { count: 'exact', head: true })
                    .lt('stock', 5);

                // Open Orders Count (pending)
                const { count: ordersCount } = await supabase
                    .from('orders')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', 'pending');

                setStats({
                    products: productsCount || 0,
                    lowStock: lowStockCount || 0,
                    orders: ordersCount || 0
                });
            } catch (error) {
                console.error('Error loading stats:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-display text-dark-800">
                Panel de Control
            </h1>

            <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 border-l-4 border-l-primary-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 font-medium mb-1">Total Productos</p>
                            <h3 className="text-3xl font-bold text-dark-900">
                                {loading ? '...' : stats.products}
                            </h3>
                        </div>
                        <div className="bg-primary-50 p-3 rounded-full text-primary-600">
                            <Package className="w-8 h-8" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 border-l-4 border-l-red-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 font-medium mb-1">Stock Bajo</p>
                            <h3 className="text-3xl font-bold text-dark-900">
                                {loading ? '...' : stats.lowStock}
                            </h3>
                        </div>
                        <div className="bg-red-50 p-3 rounded-full text-red-600">
                            <AlertTriangle className="w-8 h-8" />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 border-l-4 border-l-blue-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 font-medium mb-1">Pedidos Pendientes</p>
                            <h3 className="text-3xl font-bold text-dark-900">
                                {loading ? '...' : stats.orders}
                            </h3>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-full text-blue-600">
                            <ShoppingBag className="w-8 h-8" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
                <Link href="/admin/ventas/nueva" className="block p-6 bg-primary-50 border border-primary-100 rounded-xl hover:shadow-md transition-shadow group">
                    <h3 className="text-lg font-bold mb-2 text-primary-800 group-hover:text-primary-900">Nueva Venta Manual</h3>
                    <p className="text-primary-700/80">Registrar una venta de mostrador o telefónica.</p>
                </Link>

                <Link href="/admin/productos" className="block p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold mb-2">Gestionar Productos</h3>
                    <p className="text-gray-600">Agregar, editar o eliminar productos del catálogo.</p>
                </Link>
            </div>
        </div>
    );
}
