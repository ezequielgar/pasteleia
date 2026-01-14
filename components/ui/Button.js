'use client';

import { motion } from 'framer-motion';

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
    disabled = false,
    type = 'button',
    ...props
}) {
    const baseStyles = 'font-semibold rounded-lg transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-accent-500 hover:bg-accent-600 text-white hover:scale-105',
        secondary: 'bg-primary-200 hover:bg-primary-300 text-dark-800',
        outline: 'border-2 border-accent-500 text-accent-500 hover:bg-accent-500 hover:text-white',
        ghost: 'text-dark-700 hover:bg-primary-100',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <motion.button
            whileHover={{ scale: variant === 'ghost' ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
            {...props}
        >
            {children}
        </motion.button>
    );
}
