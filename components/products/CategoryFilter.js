'use client';

import { useState } from 'react';

const categories = [
    { id: 'all', name: 'TODOS', color: 'bg-dark-900' },
    { id: 'tartas', name: 'TARTAS', color: 'bg-primary-500' },
    { id: 'budines', name: 'BUDINES', color: 'bg-accent-500' },
    { id: 'cookies', name: 'COOKIES', color: 'bg-brown-500' },
];

export default function CategoryFilter({ products, onFilterChange, selectedCategory = 'all' }) {
    const [activeCategory, setActiveCategory] = useState(selectedCategory);

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
        if (onFilterChange) {
            onFilterChange(categoryId);
        }
    };

    // Count products per category
    const getCategoryCount = (categoryId) => {
        if (!products) return 0;
        if (categoryId === 'all') return products.length;
        return products.filter(p => p.category === categoryId).length;
    };

    return (
        <div className="flex justify-center gap-4 flex-wrap mb-12">
            {categories.map((category) => {
                const count = getCategoryCount(category.id);
                const isActive = activeCategory === category.id;
                const baseColor = category.id === 'all' ? 'dark-900' : category.id === 'tartas' ? 'primary-500' : category.id === 'budines' ? 'accent-500' : 'brown-500';

                return (
                    <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className={`
                            px-6 py-3 rounded-full text-sm font-bold transition-all duration-300
                            ${isActive
                                ? `${category.color} ${category.id === 'tartas' || category.id === 'all' ? 'text-dark-900' : 'text-white'} scale-110 shadow-lg`
                                : 'bg-gray-200 text-dark-600 hover:bg-gray-300'
                            }
                        `}
                    >
                        {category.name}
                        {count > 0 && (
                            <span className="ml-2 text-xs opacity-75">
                                ({count})
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
