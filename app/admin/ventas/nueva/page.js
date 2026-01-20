'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { createOrder } from '@/lib/services/orders'; // Reusing existing service
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Search, ShoppingBag, Plus, Minus, Trash2, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ManualSalePage() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Optional Customer Info
    const [customerName, setCustomerName] = useState('Venta Mostrador');

    useEffect(() => {
        async function fetchProducts() {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('active', true)
                    .order('name');

                if (error) throw error;
                setProducts(data || []);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const addToCart = (product) => {
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1, isFree: false }]);
        }
    };

    const updateQuantity = (id, newQty) => {
        if (newQty < 1) return;
        setCart(cart.map(item => item.id === id ? { ...item, quantity: newQty } : item));
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const toggleFreeStatus = (id) => {
        setCart(cart.map(item =>
            item.id === id
                ? { ...item, isFree: !item.isFree }
                : item
        ));
    };

    const total = cart.reduce((sum, item) => {
        // Si es gratis, no suma al total
        if (item.isFree) return sum;
        return sum + (item.price * item.quantity);
    }, 0);

    const handleRegisterSale = async () => {
        if (cart.length === 0) return;
        setSubmitting(true);

        try {
            // Prepared Data
            const orderData = {
                customer_name: customerName,
                customer_phone: 'N/A', // Placeholder for manual sales
                total: total,
                status: 'completed' // Immediately completed
            };

            const orderItems = cart.map(item => ({
                product_id: item.id,
                quantity: item.quantity,
                price: item.isFree ? 0 : item.price, // Price 0 si es gratis
                product_name: item.name
            }));

            const { error } = await createOrder(orderData, orderItems);

            if (error) throw error;

            alert('Venta registrada con éxito');
            router.push('/admin/dashboard');
            router.refresh();

        } catch (error) {
            console.error('Error registering sale:', error);
            alert('Error al registrar la venta');
        } finally {
            setSubmitting(false);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
                    <ArrowLeft className="w-5 h-5 text-gray-500" />
                </Link>
                <div>
                    <h1 className="text-2xl font-display text-dark-800">Nueva Venta Manual</h1>
                    <p className="text-gray-600 text-sm">Registra ventas de mostrador o telefónicas</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Product Selection */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100"
                            />
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {loading ? (
                            <p className="text-gray-500">Cargando productos...</p>
                        ) : filteredProducts.length === 0 ? (
                            <p className="text-gray-500">No se encontraron productos</p>
                        ) : (
                            filteredProducts.map(product => (
                                <button
                                    key={product.id}
                                    onClick={() => addToCart(product)}
                                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-primary-300 hover:shadow-md transition-all text-left group"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-primary-700">{product.name}</h3>
                                        <span className="font-bold text-gray-900">${product.price}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                                    <div className="text-xs text-gray-400">Stock: {product.stock}</div>
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Cart / Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5" />
                            Resumen de Venta
                        </h2>

                        <div className="space-y-4 mb-6">
                            <Input
                                label="Cliente (Opcional)"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                placeholder="Venta Mostrador"
                            />
                        </div>

                        <div className="space-y-3 mb-6 max-h-[400px] overflow-auto">
                            {cart.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">
                                    Selecciona productos para agregar
                                </p>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className="flex justify-between items-start bg-gray-50 p-3 rounded-lg">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                                                {item.isFree && (
                                                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">
                                                        Promo
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <p className="text-xs text-gray-500">
                                                    ${item.price} × {item.quantity}
                                                </p>
                                                {item.isFree && (
                                                    <p className="text-xs text-green-600 font-medium">
                                                        (Sin cargo)
                                                    </p>
                                                )}
                                            </div>

                                            {/* Toggle Free Checkbox */}
                                            <label className="flex items-center gap-2 mt-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={item.isFree || false}
                                                    onChange={() => toggleFreeStatus(item.id)}
                                                    className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                                                />
                                                <span className="text-xs text-gray-600">Sin costo/Promo</span>
                                            </label>
                                        </div>

                                        <div className="flex items-center gap-3 ml-2">
                                            <div className="flex items-center gap-1">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-200 rounded">
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-200 rounded">
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="border-t border-gray-100 pt-4 mb-6 space-y-2">
                            {/* Subtotal de items pagos */}
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            {/* Mostrar items gratis si hay */}
                            {cart.some(item => item.isFree) && (
                                <div className="flex justify-between text-sm text-green-600">
                                    <span>Items promocionales</span>
                                    <span>
                                        ${cart.filter(item => item.isFree).reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)} (Sin cargo)
                                    </span>
                                </div>
                            )}

                            {/* Total final */}
                            <div className="flex justify-between items-center text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                                <span>Total a Pagar</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <Button
                            onClick={handleRegisterSale}
                            disabled={cart.length === 0 || submitting}
                            className="w-full"
                        >
                            {submitting ? 'Registrando...' : 'Registrar Venta'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
