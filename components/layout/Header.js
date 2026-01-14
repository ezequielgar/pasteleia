'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: '/', label: 'Inicio' },
        { href: '/nosotros', label: 'Nosotros' },
        { href: '/productos', label: 'Productos' },
        { href: '/contacto', label: 'Contacto' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-3xl font-display text-dark-800">
                            PASTELEIA
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-dark-700 hover:text-accent-500 font-medium transition-colors duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Cart Icon */}
                        <Link
                            href="/carrito"
                            className="relative p-2 hover:bg-primary-100 rounded-full transition-colors duration-200"
                        >
                            <ShoppingCart className="w-6 h-6 text-dark-700" />
                            {/* Badge de cantidad - se conectará al context del carrito */}
                            <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                0
                            </span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden mt-4 pb-4"
                        >
                            <div className="flex flex-col space-y-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="text-dark-700 hover:text-accent-500 font-medium transition-colors duration-200"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <Link
                                    href="/carrito"
                                    className="flex items-center space-x-2 text-dark-700 hover:text-accent-500 font-medium transition-colors duration-200"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    <span>Carrito (0)</span>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
}
