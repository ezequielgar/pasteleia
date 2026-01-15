'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function FacebookPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-brown-50 via-primary-50 to-accent-50 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl w-full"
            >
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Image Section */}
                    <div className="relative w-full h-96 bg-gradient-to-br from-brown-100 to-primary-100">
                        <Image
                            src="/images/facebook-404.png"
                            alt="Esta Página Se La Comieron"
                            fill
                            className="object-contain p-8"
                            priority
                        />
                    </div>

                    {/* Content Section */}
                    <div className="p-8 text-center">
                        <h1 className="text-4xl font-display text-dark-900 mb-4">
                            ¡Ups! Nuestro Bichón Maltés fue más rápido
                        </h1>
                        <p className="text-lg text-dark-600 mb-6">
                            Todavía estamos preparando nuestra página de Facebook.
                            Mientras tanto, seguinos en nuestras otras redes o visitá nuestra tienda.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/">
                                <Button className="bg-primary-500 hover:bg-primary-600 text-black font-navbar font-bold">
                                    <Home className="w-5 h-5 mr-2" />
                                    Volver al Inicio
                                </Button>
                            </Link>
                            <Link href="/productos">
                                <Button variant="outline" className="border-brown-600 text-brown-600 hover:bg-brown-600 hover:text-white font-navbar font-bold">
                                    Ver Productos
                                </Button>
                            </Link>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <p className="text-sm text-dark-500">
                                💡 <strong>Tip:</strong> Mientras esperás, podés hacer tu pedido por WhatsApp o visitarnos en nuestro local
                            </p>
                        </div>
                    </div>
                </div>

                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mt-6"
                >
                    <Link href="/" className="inline-flex items-center text-dark-700 hover:text-dark-900 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        <span className="font-semibold">Volver a la página principal</span>
                    </Link>
                </motion.div>
            </motion.div>
        </main>
    );
}
