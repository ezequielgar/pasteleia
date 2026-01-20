'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import Card from '@/components/ui/Card';
import FinanceSummaryCard from '@/components/admin/FinanceSummaryCard';
import ManualSaleCard from '@/components/admin/ManualSaleCard';
import ProductManagementCard from '@/components/admin/ProductManagementCard';
import { Package, AlertTriangle, TrendingUp, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const [stats, setStats] = useState({
        products: 0,
        lowStock: 0,
        orders: 0
    });
    const [financeData, setFinanceData] = useState({
        income: [0, 0, 0, 0, 0, 0, 0],
        expenses: [0, 0, 0, 0, 0, 0, 0]
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

                // Fetch finance data for last 7 days
                await fetchFinanceData();
            } catch (error) {
                console.error('Error loading stats:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    async function fetchFinanceData() {
        try {
            const today = new Date();
            const last7Days = [];

            // Generate array of last 7 days
            for (let i = 6; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);
                date.setHours(0, 0, 0, 0);
                last7Days.push(date);
            }

            // Fetch completed orders
            const { data: orders, error: ordersError } = await supabase
                .from('orders')
                .select('total, created_at')
                .eq('status', 'completed')
                .gte('created_at', last7Days[0].toISOString());

            if (ordersError) throw ordersError;

            // Fetch expenses
            const { data: expenses, error: expensesError } = await supabase
                .from('expenses')
                .select('amount, date')
                .gte('date', last7Days[0].toISOString());

            if (expensesError) throw expensesError;

            // Process data by day
            const incomeByDay = new Array(7).fill(0);
            const expensesByDay = new Array(7).fill(0);

            orders?.forEach(order => {
                const orderDate = new Date(order.created_at);
                orderDate.setHours(0, 0, 0, 0);
                const dayIndex = last7Days.findIndex(d => d.getTime() === orderDate.getTime());
                if (dayIndex !== -1) {
                    incomeByDay[dayIndex] += order.total;
                }
            });

            expenses?.forEach(expense => {
                const expenseDate = new Date(expense.date);
                expenseDate.setHours(0, 0, 0, 0);
                const dayIndex = last7Days.findIndex(d => d.getTime() === expenseDate.getTime());
                if (dayIndex !== -1) {
                    expensesByDay[dayIndex] += expense.amount;
                }
            });

            setFinanceData({
                income: incomeByDay,
                expenses: expensesByDay
            });
        } catch (error) {
            console.error('Error fetching finance data:', error);
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-display text-dark-800">
                Panel de Control
            </h1>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-4">
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

            {/* Finance Summary & Actions in Grid */}
            <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Finance Summary Card */}
                <div className="lg:col-span-1">
                    <FinanceSummaryCard
                        incomeData={financeData.income}
                        expensesData={financeData.expenses}
                    />
                </div>

                {/* Quick Actions */}
                <div className="lg:col-span-2 grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                    <ManualSaleCard />
                    <ProductManagementCard />
                </div>
            </div>
        </div>
    );
}
