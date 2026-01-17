'use client';

import { useState } from 'react';
import { useCart } from '@/lib/context/CartContext';
import { sendOrderViaWhatsApp } from '@/lib/utils/whatsapp';
import { createOrder } from '@/lib/services/orders';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Toast from '@/components/ui/Toast';
import Input from '@/components/ui/Input';

export default function CarritoPage() {
    const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ isVisible: true, message, type });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!customerName.trim()) {
            newErrors.name = 'El nombre es requerido';
        }

        if (!customerPhone.trim()) {
            newErrors.phone = 'El teléfono es requerido';
        } else if (!/^\d{10,}$/.test(customerPhone.replace(/\D/g, ''))) {
            newErrors.phone = 'Ingresa un número de teléfono válido (mínimo 10 dígitos)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCheckout = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            showToast('Por favor completa todos los campos correctamente', 'error');
            return;
        }

        if (cart.length === 0) {
            showToast('Tu carrito está vacío', 'error');
            return;
        }

        setLoading(true);

        try {
            // 1. Prepare Order Data
            const orderData = {
                customer_name: customerName,
                customer_phone: customerPhone,
                total: getTotalPrice()
            };

            // 2. Prepare Items Data
            const orderItems = cart.map(item => ({
                product_id: item.id,
                quantity: item.quantity,
                price: item.price,
                product_name: item.name
            }));

            // 3. Create Order in Database (updates stock automatically via trigger/RPC or manual logic in service)
            const { data, error } = await createOrder(orderData, orderItems);

            if (error) throw error;

            // 4. Send Order via WhatsApp (Client-side)
            sendOrderViaWhatsApp(cart, customerName, customerPhone);

            // 5. Success UI
            clearCart();
            setCustomerName('');
            setCustomerPhone('');
            showToast('¡Pedido registrado con éxito! Abriendo WhatsApp...', 'success');

        } catch (error) {
            console.error('Checkout error:', error);
            showToast('Hubo un error al procesar tu pedido. Por favor intenta nuevamente.', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <main className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center py-16">
                        <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Tu carrito está vacío
                        </h1>
                        <p className="text-gray-600 mb-8">
                            ¡Descubre nuestros deliciosos productos artesanales!
                        </p>
                        <Link
                            href="/productos"
                            className="inline-flex items-center gap-2 bg-accent-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-accent-600 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Ver Productos
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            href="/productos"
                            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Seguir comprando
                        </Link>
                        <h1 className="text-4xl font-bold text-gray-900">Carrito de Compras</h1>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-white p-6 rounded-lg shadow-sm"
                                >
                                    <div className="flex gap-6">
                                        {/* Image */}
                                        <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                                            <Image
                                                src={item.image_url}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        ${item.price.toFixed(2)} c/u
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                                                    aria-label="Eliminar producto"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                        aria-label="Disminuir cantidad"
                                                    >
                                                        <Minus className="w-5 h-5" />
                                                    </button>
                                                    <span className="w-12 text-center font-bold text-lg">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        disabled={item.quantity >= item.stock}
                                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                        aria-label="Aumentar cantidad"
                                                    >
                                                        <Plus className="w-5 h-5" />
                                                    </button>
                                                    <span className="text-sm text-gray-500 ml-2">
                                                        (Stock: {item.stock})
                                                    </span>
                                                </div>

                                                {/* Subtotal */}
                                                <p className="text-2xl font-bold text-primary-600">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Resumen del Pedido
                                </h2>

                                {/* Customer Form */}
                                <form onSubmit={handleCheckout} className="space-y-4 mb-6">
                                    <Input
                                        label="Nombre Completo *"
                                        id="name"
                                        type="text"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        placeholder="Juan Pérez"
                                        disabled={loading}
                                        error={errors.name}
                                    />

                                    <Input
                                        label="Teléfono *"
                                        id="phone"
                                        type="tel"
                                        value={customerPhone}
                                        onChange={(e) => setCustomerPhone(e.target.value)}
                                        placeholder="3816485599"
                                        disabled={loading}
                                        error={errors.phone}
                                    />

                                    <div className="border-t border-gray-200 pt-4 mt-4">
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-lg font-medium text-gray-900">Total</span>
                                            <span className="text-3xl font-bold text-primary-600">
                                                ${getTotalPrice().toFixed(2)}
                                            </span>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-accent-500 text-white py-3 rounded-lg font-bold hover:bg-accent-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                                    Procesando...
                                                </>
                                            ) : (
                                                'Finalizar Compra por WhatsApp'
                                            )}
                                        </button>
                                    </div>
                                </form>

                                <p className="text-xs text-gray-500 text-center">
                                    Al finalizar la compra, se abrirá WhatsApp con tu pedido
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={() => setToast({ ...toast, isVisible: false })}
            />
        </main>
    );
}
