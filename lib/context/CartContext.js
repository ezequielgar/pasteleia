'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Load from localStorage on mount
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }
    }, []);

    useEffect(() => {
        // Save to localStorage on change
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity = 1) => {
        setCart(currentCart => {
            const existingItem = currentCart.find(item => item.id === product.id);
            if (existingItem) {
                return currentCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...currentCart, { ...product, quantity }];
        });
    };

    const removeFromCart = (id) => {
        setCart(currentCart => currentCart.filter(item => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;
        setCart(currentCart =>
            currentCart.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setCart([]);

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getTotalPrice,
            getTotalItems
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
