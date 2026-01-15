'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { formatPrice, getProductBadge, isInStock, getStockStatus } from '@/lib/utils/formatters';

export default function ProductCard({ product, onAddToCart, index = 0 }) {
    const badge = getProductBadge(product);
    const inStock = isInStock(product);
    const stockStatus = getStockStatus(product);

    const handleAddToCart = () => {
        if (inStock && onAddToCart) {
            onAddToCart(product);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
        >
            <Card className="overflow-hidden group h-full flex flex-col">
                {/* Product Image */}
                <div className="relative h-64 bg-gray-100">
                    <Image
                        src={product.image_url || '/images/hero-bundt-cake.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Badge */}
                    {badge && (
                        <div className="absolute top-4 right-4">
                            <span className="bg-primary-500 text-dark-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                {badge}
                            </span>
                        </div>
                    )}

                    {/* Out of Stock Overlay */}
                    {!inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                                SIN STOCK
                            </span>
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-2xl font-display text-dark-900 mb-2">
                        {product.name}
                    </h3>

                    {product.description && (
                        <p className="text-sm text-dark-600 mb-4 line-clamp-2">
                            {product.description}
                        </p>
                    )}

                    {/* Stock Status */}
                    <div className="mb-4">
                        <span className={`text-xs font-semibold ${inStock
                                ? product.stock <= 3
                                    ? 'text-orange-600'
                                    : 'text-green-600'
                                : 'text-red-600'
                            }`}>
                            {stockStatus}
                        </span>
                    </div>

                    {/* Price and Add to Cart */}
                    <div className="flex items-center justify-between mt-auto">
                        <span className="text-2xl font-bold text-brown-600">
                            {formatPrice(product.price)}
                        </span>
                        <Button
                            size="sm"
                            className="bg-primary-500 hover:bg-primary-600 text-black font-navbar font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleAddToCart}
                            disabled={!inStock}
                        >
                            {inStock ? 'Agregar' : 'Agotado'}
                        </Button>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
