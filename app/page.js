'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Award, Clock, ArrowRight, Star, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ProductCard from '@/components/products/ProductCard';
import { AuroraText } from '@/components/ui/AuroraText';
import { getFeaturedProducts } from '@/lib/services/products';
import { useCart } from '@/lib/context/CartContext';
import Toast from '@/components/ui/Toast';

export default function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
    const { addToCart } = useCart();

    useEffect(() => {
        async function loadFeaturedProducts() {
            try {
                const { data, error } = await getFeaturedProducts(3);
                if (!error && data) {
                    setFeaturedProducts(data);
                }
            } catch (err) {
                console.error('Error loading featured products:', err);
            } finally {
                setLoading(false);
            }
        }

        loadFeaturedProducts();
    }, []);

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
            <main className="min-h-screen bg-white">
                {/* Hero Section - Bake The Cookies Style */}
                <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 left-10 w-32 h-32 bg-primary-400 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent-400 rounded-full blur-3xl"></div>
                    </div>

                    <div className="container mx-auto px-4 py-16 relative z-10">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            {/* Left Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="inline-block mb-4">
                                    <span className="bg-primary-500 text-dark-900 px-4 py-2 rounded-full text-sm font-bold">
                                        PASTELERÍA ARTESANAL
                                    </span>
                                </div>

                                <h1 className="text-6xl md:text-7xl font-display leading-none mb-6">
                                    RECIÉN SALIDO<br />
                                    DEL HORNO
                                </h1>

                                <p className="text-xl mb-8 text-purple-100">
                                    Descubrí el arte de nuestra pastelería <AuroraText className="font-accent text-5xl">artesanal&nbsp;</AuroraText> y disfrutá de sabores únicos
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <Link href="/productos">
                                        <button className="font-navbar text-[0.9rem] font-bold border-2 border-black rounded-[7px] px-6 py-2 bg-primary-500 text-black shadow-[5px_5px_0px_#000000] flex items-center justify-center gap-2 transition-all duration-300 ease-out hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] cursor-pointer">
                                            Ver Productos
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </Link>
                                    <Link href="/contacto">
                                        <button className="font-navbar text-[0.9rem] font-bold border-2 border-black rounded-[7px] px-4 py-2 bg-white text-black shadow-[5px_5px_0px_#000000] flex items-center justify-center gap-2 transition-all duration-300 ease-out hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] cursor-pointer">
                                            Contactanos
                                            <svg className="w-6 h-6 transition-all duration-300 ease-in-out" viewBox="0 0 24 24" fill="currentColor">
                                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Right Content - Product Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="relative"
                            >
                                <div className="relative w-full h-96">
                                    <Image
                                        src="/images/hero-bundt-cake.jpg"
                                        alt="Tarta Artesanal"
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                        priority
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Products We Bake Daily */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-5xl font-display text-dark-900 mb-4">
                                PRODUCTOS QUE HORNEAMOS A DIARIO
                            </h2>
                            <div className="flex justify-center gap-4 flex-wrap">
                                <span className="bg-primary-500 text-dark-900 px-4 py-2 rounded-full text-sm font-bold">TARTAS</span>
                                <span className="bg-accent-500 text-white px-4 py-2 rounded-full text-sm font-bold">BUDINES</span>
                                <span className="bg-brown-500 text-white px-4 py-2 rounded-full text-sm font-bold">COOKIES</span>
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-16">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                                <p className="mt-4 text-dark-600">Cargando productos...</p>
                            </div>
                        ) : featuredProducts.length > 0 ? (
                            <div className="grid md:grid-cols-3 gap-8">
                                {featuredProducts.map((product, index) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onAddToCart={handleAddToCart}
                                        index={index}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-dark-600">No hay productos destacados disponibles</p>
                            </div>
                        )}

                        {!loading && featuredProducts.length > 0 && (
                            <div className="text-center mt-12">
                                <Link href="/productos">
                                    <button className="font-navbar text-[0.9rem] font-bold border-2 border-black rounded-[7px] px-8 py-3 bg-primary-500 text-black shadow-[5px_5px_0px_#000000] flex items-center justify-center gap-2 transition-all duration-300 ease-out hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] cursor-pointer">
                                        Ver Todos los Productos
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* Your Only Dose of Delight */}
                <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="relative h-96 rounded-3xl overflow-hidden">
                                    <Image
                                        src="/images/hero-bundt-cake.jpg"
                                        alt="Delicia Artesanal"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-5xl font-display text-dark-900 mb-6">
                                    TU ÚNICA DOSIS<br />
                                    DE DELICIA
                                </h2>
                                <p className="text-lg text-dark-700 mb-6">
                                    Cada producto es elaborado con ingredientes premium y mucho amor.
                                    Nuestras tartas y budines son el resultado de años de perfeccionamiento
                                    en el arte de la pastelería artesanal.
                                </p>
                                <div className="flex gap-4">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-brown-600">100%</div>
                                        <div className="text-sm text-dark-600">Artesanal</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-brown-600">48h</div>
                                        <div className="text-sm text-dark-600">Entrega</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-brown-600">5★</div>
                                        <div className="text-sm text-dark-600">Calidad</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Why is Baking Considered an Art Form */}
                <section className="py-16 bg-brown-900 text-white">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-5xl font-display mb-6">
                                    ¿POR QUÉ LA PASTELERÍA<br />
                                    ES CONSIDERADA<br />
                                    UN ARTE?
                                </h2>
                                <p className="text-lg text-brown-100 mb-6">
                                    La pastelería artesanal combina técnica, creatividad y pasión.
                                    Cada tarta es una obra maestra única, elaborada con precisión y dedicación.
                                </p>
                                <Link href="/productos">
                                    <button className="font-navbar text-[0.9rem] font-bold border-2 border-black rounded-[7px] px-6 py-2 bg-primary-500 text-black shadow-[5px_5px_0px_#000000] flex items-center justify-center gap-2 transition-all duration-300 ease-out hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] cursor-pointer">
                                        Descubrí Más
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </Link>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="relative h-96 rounded-3xl overflow-hidden">
                                    <Image
                                        src="/images/about-product.jpg"
                                        alt="Arte de la Pastelería"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Why Dessert's Items is so Special to Customer */}
                <section className="py-16 bg-accent-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-5xl font-display text-dark-900 mb-4">
                                ¿POR QUÉ NUESTROS PRODUCTOS<br />
                                SON TAN ESPECIALES?
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <Card className="p-8 bg-white">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Heart className="w-6 h-6 text-dark-900" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-display text-dark-900 mb-2">Hecho con Amor</h3>
                                        <p className="text-dark-600">
                                            Cada producto es elaborado con dedicación y los mejores ingredientes.
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-8 bg-white">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Award className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-display text-dark-900 mb-2">Calidad Premium</h3>
                                        <p className="text-dark-600">
                                            Solo usamos ingredientes de primera calidad en todas nuestras recetas.
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-8 bg-white">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-brown-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-display text-dark-900 mb-2">Siempre Fresco</h3>
                                        <p className="text-dark-600">
                                            Horneamos bajo pedido para garantizar máxima frescura.
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-8 bg-white">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="w-6 h-6 text-dark-900" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-display text-dark-900 mb-2">Sabor Único</h3>
                                        <p className="text-dark-600">
                                            Recetas exclusivas que no encontrarás en ningún otro lugar.
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600">
                    <div className="container mx-auto px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-5xl md:text-6xl font-display text-dark-900 mb-6">
                                ¿Listo para Endulzar tu Día?
                            </h2>
                            <p className="text-xl text-dark-800 mb-8 max-w-2xl mx-auto">
                                Hacé tu pedido ahora y disfrutá de nuestras deliciosas tartas y budines artesanales
                            </p>
                            <Link href="/productos">
                                <Button size="lg" className="bg-brown-900 hover:bg-brown-800 text-white font-bold text-lg px-12">
                                    Ver Todos los Productos
                                    <ArrowRight className="ml-2 w-6 h-6" />
                                </Button>
                            </Link>
                        </motion.div>
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
