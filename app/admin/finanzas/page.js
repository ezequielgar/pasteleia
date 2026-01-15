'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Plus,
    Trash2,
    Calendar,
    Filter
} from 'lucide-react';

export default function FinanzasPage() {
    const [expenses, setExpenses] = useState([]);
    const [stats, setStats] = useState({
        income: 0,
        expenses: 0,
        profit: 0
    });
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [newExpense, setNewExpense] = useState({
        description: '',
        amount: '',
        category: 'Insumos'
    });
    const [submitting, setSubmitting] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            // 1. Fetch Completed Orders for Income
            const { data: orders, error: ordersError } = await supabase
                .from('orders')
                .select('total')
                .eq('status', 'completed');

            if (ordersError) throw ordersError;

            const totalIncome = orders?.reduce((sum, order) => sum + Number(order.total), 0) || 0;

            // 2. Fetch Expenses
            const { data: expensesData, error: expensesError } = await supabase
                .from('expenses')
                .select('*')
                .order('date', { ascending: false });

            if (expensesError) throw expensesError;

            const totalExpenses = expensesData?.reduce((sum, exp) => sum + Number(exp.amount), 0) || 0;

            setExpenses(expensesData || []);
            setStats({
                income: totalIncome,
                expenses: totalExpenses,
                profit: totalIncome - totalExpenses
            });

        } catch (error) {
            console.error('Error fetching finance data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddExpense = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const { error } = await supabase
                .from('expenses')
                .insert([{
                    description: newExpense.description,
                    amount: parseFloat(newExpense.amount),
                    category: newExpense.category,
                    date: new Date().toISOString()
                }]);

            if (error) throw error;

            setIsModalOpen(false);
            setNewExpense({ description: '', amount: '', category: 'Insumos' });
            fetchData(); // Refresh data
        } catch (error) {
            console.error('Error adding expense:', error);
            alert('Error al registrar el gasto');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteExpense = async (id) => {
        if (!confirm('¿Estás seguro de eliminar este gasto?')) return;

        try {
            const { error } = await supabase
                .from('expenses')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchData();
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display text-dark-800">Finanzas</h1>
                    <p className="text-gray-600 text-sm">Resumen de ingresos y gastos</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-5 h-5 mr-2" />
                    Registrar Gasto
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 border-green-100 bg-green-50/50">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-full text-green-600">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Ingresos Totales</p>
                            <h3 className="text-2xl font-bold text-green-700">
                                ${stats.income.toLocaleString()}
                            </h3>
                            <p className="text-xs text-green-600 mt-1">
                                De pedidos completados
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 border-red-100 bg-red-50/50">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-100 rounded-full text-red-600">
                            <TrendingDown className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Gastos Registrados</p>
                            <h3 className="text-2xl font-bold text-red-700">
                                ${stats.expenses.toLocaleString()}
                            </h3>
                            <p className="text-xs text-red-600 mt-1">
                                Total de egresos
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 border-blue-100 bg-blue-50/50">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Ganancia Neta</p>
                            <h3 className="text-2xl font-bold text-blue-700">
                                ${stats.profit.toLocaleString()}
                            </h3>
                            <p className="text-xs text-blue-600 mt-1">
                                Ingresos - Gastos
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Expenses List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-700">Historial de Gastos</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Fecha</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Concepto</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Categoría</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">Monto</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 text-sm w-10"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        Cargando datos...
                                    </td>
                                </tr>
                            ) : expenses.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        No hay gastos registrados
                                    </td>
                                </tr>
                            ) : (
                                expenses.map((expense) => (
                                    <tr key={expense.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(expense.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-gray-900 font-medium">
                                            {expense.description}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="secondary">{expense.category}</Badge>
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium text-red-600">
                                            - ${expense.amount}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDeleteExpense(expense.id)}
                                                className="text-gray-400 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Expense Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Registrar Nuevo Gasto"
            >
                <form onSubmit={handleAddExpense} className="space-y-4">
                    <Input
                        label="Descripción"
                        placeholder="Ej: Compra de harina"
                        value={newExpense.description}
                        onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Monto"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={newExpense.amount}
                            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                            required
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Categoría
                            </label>
                            <select
                                value={newExpense.category}
                                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300 transition-all font-sans"
                            >
                                <option value="Insumos">Insumos</option>
                                <option value="Servicios">Servicios</option>
                                <option value="Equipamiento">Equipamiento</option>
                                <option value="Logística">Logística</option>
                                <option value="Otros">Otros</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" loading={submitting}>
                            Guardar Gasto
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
