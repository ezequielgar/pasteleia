'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import { useEffect } from 'react';

export default function Toast({ message, type = 'success', isVisible, onClose }) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(onClose, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    const variants = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500'
    };

    const icons = {
        success: <CheckCircle className="w-5 h-5" />,
        error: <XCircle className="w-5 h-5" />,
        warning: <AlertCircle className="w-5 h-5" />
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: 20, x: '-50%' }}
                    className={`fixed bottom-8 left-1/2 z-50 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 ${variants[type]}`}
                >
                    {icons[type]}
                    <span className="font-medium">{message}</span>
                    <button onClick={onClose} className="ml-2 hover:bg-white/20 rounded-full p-0.5">
                        <X className="w-4 h-4" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
