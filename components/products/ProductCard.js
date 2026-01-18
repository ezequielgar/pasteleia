'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
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
            className="translate-x-[-6px] translate-y-[-6px] hover:translate-x-0 hover:translate-y-[-6px] transition-transform duration-300"
        >
            <div className="font-body w-full h-full bg-gradient-to-br from-pink-400 to-pink-500 border-[3px] border-black shadow-[12px_12px_0_#000000] overflow-hidden transition-all duration-300 flex flex-col">
                {/* Header with Product Name */}
                <div className="relative font-navbar text-sm font-black w-full bg-white px-4 py-3 text-black border-b-[3px] border-black">
                    {product.name}

                    {/* Badge */}
                    {badge && (
                        <span className="absolute top-2 right-2 bg-primary-500 text-black px-2 py-1 text-xs font-bold border-2 border-black shadow-[2px_2px_0_#000000]">
                            {badge}
                        </span>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                    {/* Product Image */}
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                        <Image
                            src={product.image_url || '/images/hero-bundt-cake.jpg'}
                            alt={product.name}
                            fill
                            className="object-cover hover:scale-110 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* Out of Stock Overlay */}
                        {!inStock && (
                            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                                <span className="bg-red-500 text-white px-4 py-2 border-2 border-black font-black shadow-[3px_3px_0_#000000]">
                                    SIN STOCK
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="p-4 flex-1 flex flex-col text-white">
                        {product.description && (
                            <p className="text-sm font-semibold mb-3 line-clamp-2">
                                {product.description}
                            </p>
                        )}

                        {/* Stock Status */}
                        <div className="mb-3">
                            <span className={`text-xs font-black px-2 py-1 border-2 border-black inline-block ${inStock
                                    ? product.stock <= 3
                                        ? 'bg-orange-400 text-black'
                                        : 'bg-cyan-400 text-black'
                                    : 'bg-red-500 text-white'
                                }`}>
                                {stockStatus}
                            </span>
                        </div>

                        {/* Price and Add to Cart */}
                        <div className="flex items-center justify-between mt-auto gap-3">
                            <span className="text-2xl font-black text-white bg-black px-3 py-1 border-2 border-white">
                                {formatPrice(product.price)}
                            </span>
                            <button
                                className={`px-4 py-2 border-[3px] border-black font-black transition-all duration-200 ${inStock
                                        ? 'bg-primary-500 hover:bg-cyan-400 text-black shadow-[3px_3px_0_#000000] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1.5px_1.5px_0_#000000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none cursor-pointer'
                                        : 'bg-gray-400 text-gray-700 cursor-not-allowed opacity-50'
                                    }`}
                                onClick={handleAddToCart}
                                disabled={!inStock}
                            >
                                {inStock ? 'Agregar' : 'Agotado'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
