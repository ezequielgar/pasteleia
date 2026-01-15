'use client';

import { useCart } from '@/lib/context/CartContext';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartSidebar({ isOpen, onClose }) {
    const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Carrito ({getTotalItems()})
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    aria-label="Cerrar carrito"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {cart.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
                                    <Link
                                        href="/productos"
                                        onClick={onClose}
                                        className="text-primary-600 hover:text-primary-700 font-medium"
                                    >
                                        Ver productos
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cart.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                                        >
                                            {/* Image */}
                                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                                                <Image
                                                    src={item.image_url}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-gray-900 truncate">
                                                    {item.name}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    ${item.price.toFixed(2)}
                                                </p>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                                                        aria-label="Disminuir cantidad"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="w-8 text-center font-medium">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        disabled={item.quantity >= item.stock}
                                                        className="p-1 hover:bg-gray-200 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                        aria-label="Aumentar cantidad"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Remove & Subtotal */}
                                            <div className="flex flex-col items-end justify-between">
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-1 hover:bg-red-100 text-red-600 rounded transition-colors"
                                                    aria-label="Eliminar producto"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <p className="font-bold text-gray-900">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-6 border-t border-gray-200 bg-gray-50">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-lg font-medium text-gray-900">Total</span>
                                    <span className="text-2xl font-bold text-primary-600">
                                        ${getTotalPrice().toFixed(2)}
                                    </span>
                                </div>
                                <Link
                                    href="/carrito"
                                    onClick={onClose}
                                    className="block w-full bg-accent-500 text-white text-center py-3 rounded-lg font-medium hover:bg-accent-600 transition-colors"
                                >
                                    Ir al Carrito
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
