'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, Instagram, Facebook } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ContactoPage() {
    const handleWhatsAppClick = () => {
        const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5493814637258';
        const message = encodeURIComponent('¡Hola! Me gustaría hacer una consulta sobre los productos de Pasteleia.');
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-primary-100 to-primary-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-6xl md:text-7xl font-display text-dark-800 mb-6">
                            CONTACTO
                        </h1>
                        <p className="text-xl text-dark-600">
                            Estamos aquí para ayudarte con tu pedido
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* WhatsApp CTA - Destacado */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-12"
                        >
                            <Card className="p-8 md:p-12 bg-gradient-to-br from-accent-500 to-accent-600 text-white text-center">
                                <MessageCircle className="w-16 h-16 mx-auto mb-4" />
                                <h2 className="text-3xl font-display mb-4">
                                    ¡Chateá con Nosotros por WhatsApp!
                                </h2>
                                <p className="text-lg mb-6 opacity-90">
                                    La forma más rápida de hacer tu pedido o consulta
                                </p>
                                <Button
                                    onClick={handleWhatsAppClick}
                                    variant="secondary"
                                    size="lg"
                                    className="bg-white text-accent-600 hover:bg-gray-100"
                                >
                                    <MessageCircle className="w-5 h-5 mr-2" />
                                    Abrir WhatsApp
                                </Button>
                            </Card>
                        </motion.div>

                        {/* Other Contact Methods */}
                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <Card className="p-6 h-full">
                                    <Phone className="w-10 h-10 text-accent-500 mb-4" />
                                    <h3 className="text-xl font-display text-dark-800 mb-2">
                                        Teléfono
                                    </h3>
                                    <p className="text-dark-600 mb-2">
                                        Llamanos o envianos un mensaje
                                    </p>
                                    <a
                                        href="tel:+5493814637258"
                                        className="text-accent-500 font-semibold hover:underline"
                                    >
                                        +54 9 381 463-7258
                                    </a>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <Card className="p-6 h-full">
                                    <Mail className="w-10 h-10 text-accent-500 mb-4" />
                                    <h3 className="text-xl font-display text-dark-800 mb-2">
                                        Email
                                    </h3>
                                    <p className="text-dark-600 mb-2">
                                        Escribinos y te respondemos pronto
                                    </p>
                                    <a
                                        href="mailto:info@pasteleia.com"
                                        className="text-accent-500 font-semibold hover:underline"
                                    >
                                        info@pasteleia.com
                                    </a>
                                </Card>
                            </motion.div>
                        </div>

                        {/* Social Media */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-8 text-center">
                                <h3 className="text-2xl font-display text-dark-800 mb-4">
                                    Seguinos en Redes Sociales
                                </h3>
                                <p className="text-dark-600 mb-6">
                                    Descubrí nuestras últimas creaciones y promociones
                                </p>
                                <div className="flex justify-center space-x-6">
                                    <a
                                        href="#"
                                        className="w-12 h-12 rounded-full bg-accent-500 flex items-center justify-center text-white hover:bg-accent-600 transition-colors"
                                    >
                                        <Instagram className="w-6 h-6" />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-12 h-12 rounded-full bg-accent-500 flex items-center justify-center text-white hover:bg-accent-600 transition-colors"
                                    >
                                        <Facebook className="w-6 h-6" />
                                    </a>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <h2 className="text-4xl font-display text-dark-800 mb-6">
                                Horarios de Atención
                            </h2>
                            <Card className="p-8">
                                <div className="space-y-4 text-dark-600">
                                    <div>
                                        <p className="font-semibold text-dark-800">Lunes a Viernes</p>
                                        <p>9:00 - 18:00 hs</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-dark-800">Sábados</p>
                                        <p>10:00 - 14:00 hs</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-dark-800">Domingos</p>
                                        <p>Cerrado</p>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <p className="text-sm text-dark-600">
                                        <strong>Nota:</strong> Los pedidos deben realizarse con al menos 48 horas de anticipación.
                                    </p>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}
