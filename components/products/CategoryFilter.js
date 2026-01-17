'use client';

import { useState } from 'react';

const categories = [
    { id: 'all', name: 'TODOS', color: 'bg-primary-500' },
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

                return (
                    <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className={`
                            relative px-8 py-4 rounded-2xl text-sm font-bold 
                            transition-all duration-300 ease-in-out
                            min-w-[140px]
                            ${isActive
                                ? `${category.color} 
                                   ${category.id === 'tartas' || category.id === 'all' ? 'text-dark-900' : 'text-white'}
                                   shadow-[inset_6px_6px_12px_rgba(0,0,0,0.2),inset_-6px_-6px_12px_rgba(255,255,255,0.1)]
                                   scale-[0.98]`
                                : `bg-[#f0f0f3] text-dark-700
                                   shadow-[6px_6px_12px_#d1d1d4,-6px_-6px_12px_#ffffff]
                                   hover:shadow-[8px_8px_16px_#d1d1d4,-8px_-8px_16px_#ffffff]
                                   hover:scale-[1.02]
                                   active:shadow-[inset_4px_4px_8px_#d1d1d4,inset_-4px_-4px_8px_#ffffff]`
                            }
                            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                        `}
                    >
                        <span className="relative z-10">
                            {category.name}
                            {count > 0 && (
                                <span className={`ml-2 text-xs ${isActive ? 'opacity-80' : 'opacity-60'}`}>
                                    ({count})
                                </span>
                            )}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
