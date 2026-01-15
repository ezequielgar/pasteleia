'use client';
import { motion } from 'framer-motion';

export default function Card({ children, className = '' }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}
        >
            {children}
        </motion.div>
    );
}
