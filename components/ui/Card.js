'use client';

import { motion } from 'framer-motion';

export default function Card({
    children,
    className = '',
    hover = true,
    ...props
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={hover ? { y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' } : {}}
            className={`bg-white rounded-xl shadow-lg transition-shadow duration-300 ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
}
