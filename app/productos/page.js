'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

// Productos temporales - luego se reemplazarán con datos de Supabase
const TEMP_PRODUCTS = [
    {
        id: 1,
        name: 'Tarta Bundt Marmolada',
        description: 'Deliciosa tarta bundt con marmolado de chocolate y vainilla, cubierta con glaseado blanco.',
        price: 8500,
        image: '/images/hero-bundt-cake.jpg',
        category: 'Tartas',
        stock: 5,
        active: true,
    },
    {
        id: 2,
        name: 'Budín de Limón',
        description: 'Budín artesanal con ralladura de limón y glaseado cítrico. Perfecto para el té.',
        price: 5500,
        image: '/images/about-product.jpg',
        category: 'Budines',
        stock: 8,
        active: true,
    },
    {
        id: 3,
        name: 'Tarta de Chocolate',
        description: 'Tarta bundt de chocolate intenso con ganache de chocolate belga.',
        price: 9000,
        image: '/images/hero-bundt-cake.jpg',
        category: 'Tartas',
        stock: 3,
        active: true,
    },
    {
        id: 4,
        name: 'Budín de Nuez',
        description: 'Budín tradicional con nueces tostadas y un toque de canela.',
        price: 6000,
        image: '/images/about-product.jpg',
        category: 'Budines',
        stock: 6,
        active: true,
    },
    {
        id: 5,
        name: 'Tarta Red Velvet',
        description: 'Elegante tarta red velvet con frosting de queso crema.',
        price: 9500,
        image: '/images/hero-bundt-cake.jpg',
        category: 'Tartas',
        stock: 0,
        active: true,
    },
    {
        id: 6,
        name: 'Budín de Banana',
        description: 'Budín húmedo de banana con chips de chocolate.',
        price: 5800,
        image: '/images/about-product.jpg',
        category: 'Budines',
        stock: 10,
        active: true,
    },
];

export default function ProductosPage() {
    const [selectedCategory, setSelectedCategory] = useState('Todas');

    const categories = ['Todas', 'Tartas', 'Budines'];

    const filteredProducts = selectedCategory === 'Todas'
        ? TEMP_PRODUCTS
        : TEMP_PRODUCTS.filter(p => p.category === selectedCategory);

    const handleAddToCart = (product) => {
        // TODO: Implementar lógica del carrito
        alert(`Producto "${product.name}" agregado al carrito (funcionalidad en desarrollo)`);
    };

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-primary-100 to-primary-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-6xl md:text-7xl font-display text-dark-800 mb-6">
                            PRODUCTOS
                        </h1>
                        <p className="text-xl text-dark-600">
                            Descubrí nuestras tartas y budines artesanales
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-8 bg-white border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center space-x-4">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? 'primary' : 'outline'}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="overflow-hidden h-full flex flex-col">
                                    {/* Product Image */}
                                    <div className="relative h-64 bg-gray-100">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        />
                                        {product.stock === 0 && (
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                <Badge variant="danger" className="text-lg px-6 py-2">
                                                    Sin Stock
                                                </Badge>
                                            </div>
                                        )}
                                        {product.stock > 0 && product.stock <= 3 && (
                                            <div className="absolute top-4 right-4">
                                                <Badge variant="warning">
                                                    ¡Últimas unidades!
                                                </Badge>
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="mb-2">
                                            <Badge variant="default" className="text-xs">
                                                {product.category}
                                            </Badge>
                                        </div>

                                        <h3 className="text-2xl font-display text-dark-800 mb-2">
                                            {product.name}
                                        </h3>

                                        <p className="text-dark-600 mb-4 flex-1">
                                            {product.description}
                                        </p>

                                        <div className="flex items-center justify-between mb-4">
                                            <div className="text-3xl font-bold text-accent-500">
                                                ${product.price.toLocaleString('es-AR')}
                                            </div>
                                            <div className="text-sm text-dark-600">
                                                Stock: {product.stock}
                                            </div>
                                        </div>

                                        <Button
                                            className="w-full"
                                            disabled={product.stock === 0}
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            <ShoppingCart className="w-5 h-5 mr-2" />
                                            {product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-xl text-dark-600">
                                No hay productos disponibles en esta categoría
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Info Section */}
            <section className="py-16 bg-gradient-to-br from-primary-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-display text-dark-800 mb-4">
                            ¿Buscás algo especial?
                        </h2>
                        <p className="text-dark-600 mb-6">
                            Podemos personalizar nuestros productos según tus necesidades.
                            Contactanos para consultas sobre pedidos especiales.
                        </p>
                        <Button variant="outline" size="lg">
                            Contactar por WhatsApp
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
