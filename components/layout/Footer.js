'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';
import SocialModal from '@/components/ui/SocialModal';

export default function Footer() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedNetwork, setSelectedNetwork] = useState(null);

    const handleSocialClick = (network) => {
        setSelectedNetwork(network);
        setModalOpen(true);
    };

    return (
        <>
            <footer className="bg-dark-800 text-white">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Brand */}
                        <div>
                            <h3 className="text-2xl font-display mb-4">PASTELEIA</h3>
                            <p className="text-gray-300">
                                Pastelería artesanal hecha con amor. Tartas y budines únicos para tus momentos especiales.
                            </p>
                        </div>

                        {/* Links */}
                        <div>
                            <h4 className="font-semibold mb-4">Enlaces</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/" className="text-gray-300 hover:text-accent-400 transition-colors">
                                        Inicio
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/nosotros" className="text-gray-300 hover:text-accent-400 transition-colors">
                                        Nosotros
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/productos" className="text-gray-300 hover:text-accent-400 transition-colors">
                                        Productos
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contacto" className="text-gray-300 hover:text-accent-400 transition-colors">
                                        Contacto
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="font-semibold mb-4">Contacto</h4>
                            <ul className="space-y-3">
                                <li className="flex items-center space-x-2">
                                    <Phone className="w-4 h-4" />
                                    <span className="text-gray-300">+54 9 381 463-7258</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <Mail className="w-4 h-4" />
                                    <span className="text-gray-300">info@pasteleia.com</span>
                                </li>
                            </ul>

                            {/* Social Media */}
                            <div className="flex space-x-4 mt-4">
                                <button
                                    onClick={() => handleSocialClick('instagram')}
                                    className="text-gray-300 hover:text-accent-400 transition-colors cursor-pointer"
                                >
                                    <Instagram className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={() => handleSocialClick('facebook')}
                                    className="text-gray-300 hover:text-accent-400 transition-colors cursor-pointer"
                                >
                                    <Facebook className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col items-center gap-4 text-center">
                        <p className="text-gray-400 text-sm">
                            &copy; {new Date().getFullYear()} Pasteleia. Todos los derechos reservados.
                        </p>
                        <Link href="/admin/login" className="text-gray-600 hover:text-gray-500 text-xs transition-colors">
                            Admin
                        </Link>

                        {/* Developer Credit */}
                        <div className="flex flex-col items-center gap-3 mt-10">
                            <span className="text-xs text-gray-600 uppercase tracking-[0.2em] font-medium">Desarrollado por</span>

                            <div className="group relative w-80 h-40 cursor-pointer">
                                {/* Glow Effect / Background Light */}
                                <div className="absolute inset-0 bg-accent-400/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Logo with Animation */}
                                <div className="relative w-full h-full transition-transform duration-300 ease-out group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                                    <Image
                                        src="/images/1768453136838.png"
                                        alt="Lechugas Web Design"
                                        fill
                                        className="object-contain"
                                    />
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Social Media Modal */}
            <SocialModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                network={selectedNetwork}
            />
        </>
    );
}
