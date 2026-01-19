'use client';

import { useState } from 'react';

const categories = [
    { id: 'tartas', name: 'TARTAS', color: '#ff7f50' }, // Coral - Izquierda
    { id: 'budines', name: 'BUDINES', color: '#019b98' }, // Teal - Derecha
    { id: 'all', name: 'TODOS', color: '#ffd700' }, // Gold - Centro (último en orden HTML)
];

export default function AnimatedCategoryFilter({ products, onFilterChange, selectedCategory = 'all' }) {
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
        <div className="flex justify-center mb-16">
            <div className="filter-wrapper">
                {/* Label */}
                <div className="filter-label">Filtros</div>

                <div className="button-box">
                    {/* Touch areas - deben estar primero */}
                    <div className="touch left" onClick={() => handleCategoryClick('tartas')}></div>
                    <div className="touch middle" onClick={() => handleCategoryClick('all')}></div>
                    <div className="touch right" onClick={() => handleCategoryClick('budines')}></div>

                    {/* Botones - en orden específico para la animación */}
                    {/* Botón 1: TARTAS (izquierda) */}
                    <button
                        className={`button ${activeCategory === 'tartas' ? 'active' : ''}`}
                        style={{ backgroundColor: '#ff7f50' }}
                        onClick={() => handleCategoryClick('tartas')}
                    >
                        <span className="button-text rotate-left">TARTAS</span>
                    </button>

                    {/* Botón 2: BUDINES (derecha) */}
                    <button
                        className={`button ${activeCategory === 'budines' ? 'active' : ''}`}
                        style={{ backgroundColor: '#019b98' }}
                        onClick={() => handleCategoryClick('budines')}
                    >
                        <span className="button-text rotate-right">BUDINES</span>
                    </button>

                    {/* Botón 3: TODOS (centro - último para que quede arriba) */}
                    <button
                        className={`button ${activeCategory === 'all' ? 'active' : ''}`}
                        style={{ backgroundColor: '#ffd700' }}
                        onClick={() => handleCategoryClick('all')}
                    >
                        <span className="button-text rotate-center">TODOS</span>
                    </button>
                </div>
            </div>

            <style jsx>{`
                .filter-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }

                .filter-label {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #2d2d2d;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    opacity: 0.7;
                }
                .button-box {
                    position: relative;
                    width: 12rem;
                    height: 5rem;
                    display: flex;
                }

                .touch {
                    position: relative;
                    z-index: 60;
                    height: 100%;
                    flex: 1;
                    cursor: pointer;
                }

                .button {
                    width: 4.5rem;
                    height: 4.5rem;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    cursor: pointer;
                    border: 3px solid #311703;
                    border-radius: 8px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    opacity: 0.85;
                    box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.4);
                    padding: 0.5rem;
                }

                .button-text {
                    color: white;
                    font-size: 0.7rem;
                    font-weight: 700;
                    text-align: center;
                    line-height: 1.1;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
                    letter-spacing: 0.5px;
                }

                .button.active {
                    opacity: 1;
                    border-color: #fff;
                    box-shadow: 
                        inset 0 0 8px rgba(0, 0, 0, 0.3),
                        0 0 0 3px rgba(255, 255, 255, 0.5),
                        0 4px 12px rgba(0, 0, 0, 0.3);
                    transform: scale(1.05);
                }

                /* Botón 1 - TARTAS (izquierda) */
                .button:nth-child(4) {
                    transform: translate(-50%, -50%) rotate(90deg);
                    z-index: 30;
                }

                /* Botón 2 - BUDINES (derecha) */
                .button:nth-child(5) {
                    transform: translate(-50%, -50%) rotate(-115deg);
                    z-index: 40;
                }

                /* Botón 3 - TODOS (centro) */
                .button:nth-child(6) {
                    transform: translate(-50%, -50%) rotate(-45deg);
                    z-index: 50;
                }

                /* Hover en contenedor - despliega todos */
                .button-box:hover .button:nth-child(4) {
                    transform: translate(-170%, -50%) rotate(-90deg);
                }

                .button-box:hover .button:nth-child(5) {
                    transform: translate(70%, -50%) rotate(90deg);
                }

                .button-box:hover .button:nth-child(6) {
                    transform: translate(-50%, -50%) rotate(0deg);
                }

                /* Hover individual en touch areas */
                .touch.left:hover ~ .button:nth-child(4) {
                    opacity: 1;
                    transform: translate(-170%, -50%) rotate(-90deg) scale(1.05);
                }

                .touch.left:active ~ .button:nth-child(4) {
                    transform: translate(-170%, -50%) rotate(-90deg) scale(0.95);
                }

                .touch.middle:hover ~ .button:nth-child(6) {
                    opacity: 1;
                    transform: translate(-50%, -50%) rotate(0deg) scale(1.05);
                }

                .touch.middle:active ~ .button:nth-child(6) {
                    transform: translate(-50%, -50%) rotate(0deg) scale(0.95);
                }

                .touch.right:hover ~ .button:nth-child(5) {
                    opacity: 1;
                    transform: translate(70%, -50%) rotate(90deg) scale(1.05);
                }

                .touch.right:active ~ .button:nth-child(5) {
                    transform: translate(70%, -50%) rotate(90deg) scale(0.95);
                }

                /* Contra-rotación del texto para mantenerlo horizontal */
                /* Texto en estado inicial (botones apilados) */
                .button:nth-child(4) .button-text.rotate-left {
                    transform: rotate(-90deg);
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .button:nth-child(5) .button-text.rotate-right {
                    transform: rotate(115deg);
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .button:nth-child(6) .button-text.rotate-center {
                    transform: rotate(45deg);
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                /* Texto cuando los botones se despliegan (hover) */
                .button-box:hover .button:nth-child(4) .button-text.rotate-left,
                .touch.left:hover ~ .button:nth-child(4) .button-text.rotate-left {
                    transform: rotate(90deg);
                }

                .button-box:hover .button:nth-child(5) .button-text.rotate-right,
                .touch.right:hover ~ .button:nth-child(5) .button-text.rotate-right {
                    transform: rotate(-90deg);
                }

                .button-box:hover .button:nth-child(6) .button-text.rotate-center,
                .touch.middle:hover ~ .button:nth-child(6) .button-text.rotate-center {
                    transform: rotate(0deg);
                }

                /* Responsive */
                @media (max-width: 640px) {
                    .button-box {
                        width: 10rem;
                    }

                    .button {
                        width: 3.5rem;
                        height: 3.5rem;
                        padding: 0.3rem;
                    }

                    .button-text {
                        font-size: 0.6rem;
                    }
                }
            `}</style>
        </div>
    );
}

