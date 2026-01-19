'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductGrid from '@/components/products/ProductGrid';
import AnimatedCategoryFilter from '@/components/products/AnimatedCategoryFilter';
import ProductsLoading from '@/components/ui/ProductsLoading';
import { getProducts } from '@/lib/services/products';
import { useCart } from '@/lib/context/CartContext';
import Toast from '@/components/ui/Toast';

export default function ProductosPage() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);
    const [error, setError] = useState(null);
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
    const { addToCart } = useCart();

    // Show loading screen for 1.5 seconds on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoadingScreen(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // Fetch products on mount
    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                const { data, error } = await getProducts();

                if (error) throw error;

                setProducts(data || []);
                setFilteredProducts(data || []);
            } catch (err) {
                console.error('Error loading products:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    // Handle category filter change
    const handleFilterChange = (categoryId) => {
        setSelectedCategory(categoryId);

        if (categoryId === 'all') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(p => p.category === categoryId));
        }
    };

    // Handle add to cart
    const handleAddToCart = (product) => {
        addToCart(product, 1);
        setToast({
            isVisible: true,
            message: `${product.name} agregado al carrito`,
            type: 'success'
        });
    };

    return (
        <>
            {/* Show loading screen for 1.5 seconds */}
            {showLoadingScreen && <ProductsLoading />}

            {/* Main content - hidden while loading screen is shown */}
            <main className={`min-h-screen ${showLoadingScreen ? 'hidden' : ''}`}>
                {/* Hero Section */}
                <section className="relative py-20 bg-gradient-to-br from-primary-100 to-primary-50">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center max-w-3xl mx-auto"
                        >
                            <h1 className="text-6xl md:text-7xl font-display text-dark-900 mb-6">
                                NUESTROS PRODUCTOS
                            </h1>
                            <p className="text-xl text-dark-600">
                                Descubrí nuestras tartas, budines y cookies artesanales
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Products Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        {/* Animated Category Filter */}
                        <AnimatedCategoryFilter
                            products={products}
                            onFilterChange={handleFilterChange}
                            selectedCategory={selectedCategory}
                        />

                        {/* Loading State */}
                        {loading && (
                            <div className="text-center py-16">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                                <p className="mt-4 text-dark-600">Cargando productos...</p>
                            </div>
                        )}

                        {/* Error State */}
                        {error && !loading && (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">⚠️</div>
                                <h3 className="text-2xl font-display text-dark-900 mb-2">
                                    Error al cargar productos
                                </h3>
                                <p className="text-dark-600 mb-4">{error}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="bg-primary-500 hover:bg-primary-600 text-dark-900 px-6 py-2 rounded-full font-bold"
                                >
                                    Reintentar
                                </button>
                            </div>
                        )}

                        {/* Products Grid */}
                        {!loading && !error && (
                            <ProductGrid
                                products={filteredProducts}
                                onAddToCart={handleAddToCart}
                                emptyMessage={
                                    selectedCategory === 'all'
                                        ? 'No hay productos disponibles'
                                        : `No hay productos en la categoría seleccionada`
                                }
                            />
                        )}
                    </div>
                </section>

                {/* Info Section */}
                <section className="py-16 bg-gradient-to-br from-primary-50 to-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-4xl font-display text-dark-900 mb-4">
                                ¿Buscás algo especial?
                            </h2>
                            <p className="text-lg text-dark-600 mb-6">
                                Podemos personalizar nuestros productos según tus necesidades.
                                Contactanos para consultas sobre pedidos especiales.
                            </p>
                            <a
                                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-bold transition-colors"
                            >
                                📱 Contactar por WhatsApp
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={() => setToast({ ...toast, isVisible: false })}
            />
        </>
    );
}
