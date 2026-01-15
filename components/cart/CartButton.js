'use client';

import { useCart } from '@/lib/context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import CartSidebar from './CartSidebar';

export default function CartButton() {
    const { getTotalItems } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const itemCount = getTotalItems();

    return (
        <>
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-40 bg-accent-500 text-white p-4 rounded-full shadow-lg hover:bg-accent-600 transition-colors"
                aria-label="Abrir carrito"
            >
                <ShoppingCart className="w-6 h-6" />
                <AnimatePresence>
                    {itemCount > 0 && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
                        >
                            {itemCount}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>

            <CartSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
