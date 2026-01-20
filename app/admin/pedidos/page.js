'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { getOrders, updateOrderStatus } from '@/lib/services/orders';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { Search, Eye, CheckCircle, XCircle, Clock, ShoppingBag, Trash2 } from 'lucide-react';

export default function PedidosPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const { data, error } = await getOrders();
            if (error) throw error;
            setOrders(data || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const { error } = await updateOrderStatus(orderId, newStatus);
            if (error) throw error;

            // Optimistic update
            setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

            if (selectedOrder && selectedOrder.id === orderId) {
                setSelectedOrder({ ...selectedOrder, status: newStatus });
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Error al actualizar el estado');
        }
    };

    const openOrderDetails = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleDeleteOrder = async (orderId, e) => {
        e.stopPropagation(); // Prevent opening modal

        if (!confirm('¿Estás seguro de eliminar este pedido? Esta acción no se puede deshacer.')) {
            return;
        }

        try {
            const { error } = await supabase
                .from('orders')
                .delete()
                .eq('id', orderId);

            if (error) throw error;

            // Update state - remove order from list
            setOrders(orders.filter(o => o.id !== orderId));

            // Close modal if this order is open
            if (selectedOrder && selectedOrder.id === orderId) {
                setIsModalOpen(false);
                setSelectedOrder(null);
            }

            alert('Pedido eliminado exitosamente');
        } catch (error) {
            console.error('Error deleting order:', error);
            alert('Error al eliminar el pedido');
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'completed':
                return <Badge variant="success">Completado</Badge>;
            case 'cancelled':
                return <Badge variant="danger">Cancelado</Badge>;
            default:
                return <Badge variant="warning">Pendiente</Badge>;
        }
    };

    const filteredOrders = orders.filter(order =>
        order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.slice(0, 8).includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display text-dark-800">Pedidos</h1>
                    <p className="text-gray-600 text-sm">Gestiona los pedidos de tus clientes</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar por cliente o ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300"
                    />
                </div>
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">ID</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Fecha</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Cliente</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Total</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Estado</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                        Cargando pedidos...
                                    </td>
                                </tr>
                            ) : filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                        No se encontraron pedidos
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-gray-500">
                                            {order.id.slice(0, 8)}...
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{order.customer_name}</div>
                                            <div className="text-xs text-gray-500">{order.customer_phone}</div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            ${order.total}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(order.status)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openOrderDetails(order)}
                                                    className="inline-flex items-center px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                                >
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    Ver
                                                </button>
                                                <button
                                                    onClick={(e) => handleDeleteOrder(order.id, e)}
                                                    className="inline-flex items-center p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
                                                    title="Eliminar pedido"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Details Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedOrder ? `Pedido #${selectedOrder.id.slice(0, 8)}` : 'Detalles del Pedido'}
            >
                {selectedOrder && (
                    <div className="space-y-6">
                        {/* Header Status Actions */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50 p-4 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Estado actual</p>
                                {getStatusBadge(selectedOrder.status)}
                            </div>

                            <div className="flex gap-2">
                                {selectedOrder.status === 'pending' && (
                                    <>
                                        <button
                                            onClick={() => handleStatusChange(selectedOrder.id, 'completed')}
                                            className="flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
                                        >
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Completar
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(selectedOrder.id, 'cancelled')}
                                            className="flex items-center px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                                        >
                                            <XCircle className="w-4 h-4 mr-2" />
                                            Cancelar
                                        </button>
                                    </>
                                )}
                                {selectedOrder.status !== 'pending' && (
                                    <button
                                        onClick={() => handleStatusChange(selectedOrder.id, 'pending')}
                                        className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                                    >
                                        <Clock className="w-4 h-4 mr-2" />
                                        Marcar Pendiente
                                    </button>
                                )}
                            </div>

                            {/* Delete Button */}
                            <button
                                onClick={(e) => handleDeleteOrder(selectedOrder.id, e)}
                                className="flex items-center px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Eliminar Pedido
                            </button>
                        </div>

                        {/* Customer Info */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-1">Cliente</h4>
                                <p className="text-gray-900 font-medium">{selectedOrder.customer_name}</p>
                                <p className="text-gray-600">{selectedOrder.customer_phone}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-1">Fecha</h4>
                                <p className="text-gray-900">
                                    {new Date(selectedOrder.created_at).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        {/* Items List */}
                        <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-3">Productos</h4>
                            <div className="bg-white border border-gray-100 rounded-lg divide-y divide-gray-100">
                                {selectedOrder.order_items?.map((item) => (
                                    <div key={item.id} className="p-3 flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-400">
                                                <ShoppingBag className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{item.product_name}</p>
                                                <p className="text-xs text-gray-500">${item.price} c/u</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-900">x{item.quantity}</p>
                                            <p className="text-xs text-gray-500">${item.price * item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                                <span className="font-bold text-gray-900">Total</span>
                                <span className="text-xl font-bold text-primary-600">${selectedOrder.total}</span>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
