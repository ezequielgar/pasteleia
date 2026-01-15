'use client';

import ProductCard from './ProductCard';

export default function ProductGrid({ products, onAddToCart, emptyMessage = 'No hay productos disponibles' }) {
    if (!products || products.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="text-6xl mb-4">🍰</div>
                <h3 className="text-2xl font-display text-dark-900 mb-2">
                    {emptyMessage}
                </h3>
                <p className="text-dark-600">
                    Volvé pronto para ver nuestros deliciosos productos
                </p>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    index={index}
                />
            ))}
        </div>
    );
}
