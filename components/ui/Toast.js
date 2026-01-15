'use client';
<<<<<<< HEAD

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';
=======
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
>>>>>>> feat-manual-sales
import { useEffect } from 'react';

export default function Toast({ message, type = 'success', isVisible, onClose }) {
    useEffect(() => {
        if (isVisible) {
<<<<<<< HEAD
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
=======
            const timer = setTimeout(onClose, 3000);
>>>>>>> feat-manual-sales
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

<<<<<<< HEAD
    const icons = {
        success: <CheckCircle className="w-5 h-5" />,
        error: <XCircle className="w-5 h-5" />,
    };

    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
=======
    const variants = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500'
    };

    const icons = {
        success: <CheckCircle className="w-5 h-5" />,
        error: <XCircle className="w-5 h-5" />,
        warning: <AlertCircle className="w-5 h-5" />
>>>>>>> feat-manual-sales
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
<<<<<<< HEAD
                    initial={{ opacity: 0, y: -50, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: -50, x: '-50%' }}
                    className={`fixed top-6 left-1/2 z-50 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]`}
                >
                    {icons[type]}
                    <span className="flex-1">{message}</span>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-white/20 rounded transition-colors"
                        aria-label="Cerrar notificación"
                    >
=======
                    initial={{ opacity: 0, y: 50, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: 20, x: '-50%' }}
                    className={`fixed bottom-8 left-1/2 z-50 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 ${variants[type]}`}
                >
                    {icons[type]}
                    <span className="font-medium">{message}</span>
                    <button onClick={onClose} className="ml-2 hover:bg-white/20 rounded-full p-0.5">
>>>>>>> feat-manual-sales
                        <X className="w-4 h-4" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
