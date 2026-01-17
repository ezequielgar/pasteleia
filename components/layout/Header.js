'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Menu, X, Facebook, Instagram, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/context/CartContext';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { getTotalItems } = useCart();

    const navLinks = [
        { href: '/', label: 'INICIO' },
        { href: '/nosotros', label: 'NOSOTROS' },
        { href: '/productos', label: 'PRODUCTOS' },
        { href: '/contacto', label: 'CONTACTO' },
    ];

    return (
        <header className="bg-brown-900 text-white">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <span className="text-3xl font-navbar font-bold text-primary-500 tracking-wide">
                            PASTELEIA
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-white hover:text-primary-400 font-navbar font-semibold text-sm tracking-wide transition-colors duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Section */}
                    <div className="hidden md:flex items-center space-x-6">
                        {/* Social Icons */}
                        <div className="flex items-center space-x-3">
                            <Link href="/redes/facebook" className="text-white hover:text-primary-400 transition-colors">
                                <Facebook className="w-4 h-4" />
                            </Link>
                            <Link href="/redes/instagram" className="text-white hover:text-primary-400 transition-colors">
                                <Instagram className="w-4 h-4" />
                            </Link>
                            <a href="#" className="text-white hover:text-primary-400 transition-colors">
                                <Twitter className="w-4 h-4" />
                            </a>
                        </div>

                        {/* Cart Icon */}
                        <Link href="/carrito" className="relative">
                            <ShoppingCart className="w-5 h-5 text-white hover:text-primary-400 transition-colors" />
                            <span className="absolute -top-2 -right-2 bg-primary-500 text-dark-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {getTotalItems()}
                            </span>
                        </Link>

                        {/* Sign In Button */}
                        <Link href="/admin">
                            <button className="bg-primary-500 hover:bg-primary-600 text-dark-900 font-navbar font-bold px-6 py-2 rounded-full text-sm transition-all duration-300 transform hover:scale-105">
                                ADMIN
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 hover:bg-brown-800 rounded-lg transition-colors duration-200"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-white" />
                        ) : (
                            <Menu className="w-6 h-6 text-white" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.nav
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden overflow-hidden border-t border-brown-700"
                        >
                            <div className="py-4 space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="block px-4 py-3 text-white hover:bg-brown-800 hover:text-primary-400 rounded-lg transition-colors duration-200 font-semibold"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="px-4 pt-4 border-t border-brown-700">
                                    <Link href="/carrito" className="flex items-center space-x-2 text-white hover:text-primary-400 py-2">
                                        <ShoppingCart className="w-5 h-5" />
                                        <span>Carrito ({getTotalItems()})</span>
                                    </Link>
                                    <Link href="/admin" className="block mt-2">
                                        <button className="w-full bg-primary-500 hover:bg-primary-600 text-dark-900 font-bold px-6 py-2 rounded-full text-sm">
                                            ADMIN
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
