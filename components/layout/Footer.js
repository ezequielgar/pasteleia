import Link from 'next/link';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';

export default function Footer() {
    return (
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
                                <span className="text-gray-300">+54 9 381 6485599</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Mail className="w-4 h-4" />
                                <span className="text-gray-300">info@pasteleia.com</span>
                            </li>
                        </ul>

                        {/* Social Media */}
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="text-gray-300 hover:text-accent-400 transition-colors">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-accent-400 transition-colors">
                                <Facebook className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} Pasteleia. Todos los derechos reservados.</p>
                    <Link href="/admin/login" className="mt-2 md:mt-0 opacity-50 hover:opacity-100 transition-opacity">
                        Admin
                    </Link>
                </div>
            </div>
        </footer>
    );
}
