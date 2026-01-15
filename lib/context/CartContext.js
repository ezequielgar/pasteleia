'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
<<<<<<< HEAD
    const [isLoaded, setIsLoaded] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('pasteleia_cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                console.error('Error loading cart:', error);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('pasteleia_cart', JSON.stringify(cart));
        }
    }, [cart, isLoaded]);

    // Add item to cart
    const addToCart = (product, quantity = 1) => {
        setCart(currentCart => {
            const existingItem = currentCart.find(item => item.id === product.id);

            if (existingItem) {
                // Update quantity if item already exists
                return currentCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
                        : item
                );
            } else {
                // Add new item
                return [...currentCart, {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image_url: product.image_url,
                    stock: product.stock,
                    quantity: Math.min(quantity, product.stock),
                }];
            }
        });
    };

    // Remove item from cart
    const removeFromCart = (productId) => {
        setCart(currentCart => currentCart.filter(item => item.id !== productId));
    };

    // Update item quantity
    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCart(currentCart =>
            currentCart.map(item =>
                item.id === productId
                    ? { ...item, quantity: Math.min(quantity, item.stock) }
                    : item
=======

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
>>>>>>> feat-manual-sales
            )
        );
    };

<<<<<<< HEAD
    // Clear entire cart
    const clearCart = () => {
        setCart([]);
    };

    // Calculate total items
    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    // Calculate total price
=======
    const clearCart = () => setCart([]);

>>>>>>> feat-manual-sales
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

<<<<<<< HEAD
    // Get item quantity
    const getItemQuantity = (productId) => {
        const item = cart.find(item => item.id === productId);
        return item ? item.quantity : 0;
    };

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        getItemQuantity,
        isLoaded,
    };

    return (
        <CartContext.Provider value={value}>
=======
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
>>>>>>> feat-manual-sales
            {children}
        </CartContext.Provider>
    );
}

<<<<<<< HEAD
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
=======
export const useCart = () => useContext(CartContext);
>>>>>>> feat-manual-sales
