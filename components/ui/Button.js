'use client';
import { Loader2 } from 'lucide-react';

export default function Button({ children, loading, variant = 'primary', className = '', ...props }) {
    const variants = {
        primary: 'bg-primary-500 text-dark-900 hover:bg-primary-600',
        secondary: 'bg-accent-500 text-white hover:bg-accent-600',
        outline: 'border-2 border-primary-500 text-primary-700 hover:bg-primary-50',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        ghost: 'hover:bg-gray-100 text-gray-700',
        brutalist: 'font-navbar border-2 border-black rounded-[7px] bg-primary-500 text-black shadow-[5px_5px_0px_#000000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]',
        'brutalist-white': 'font-navbar border-2 border-black rounded-[7px] bg-white text-black shadow-[5px_5px_0px_#000000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]'
    };

    return (
        <button
            className={`
                px-4 py-2 rounded-lg font-bold transition-all duration-200 
                flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed
                ${variants[variant]} ${className}
            `}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {children}
        </button>
    );
}
