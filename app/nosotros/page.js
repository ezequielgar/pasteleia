'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Users, Award, Sparkles } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function NosotrosPage() {
    const values = [
        {
            icon: Heart,
            title: 'Pasión',
            description: 'Amamos lo que hacemos y se nota en cada producto que elaboramos.',
        },
        {
            icon: Award,
            title: 'Calidad',
            description: 'Solo utilizamos ingredientes premium y técnicas artesanales tradicionales.',
        },
        {
            icon: Users,
            title: 'Compromiso',
            description: 'Nos comprometemos a superar tus expectativas en cada pedido.',
        },
        {
            icon: Sparkles,
            title: 'Creatividad',
            description: 'Innovamos constantemente para ofrecerte sabores únicos y especiales.',
        },
    ];

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
                            SOBRE NOSOTROS
                        </h1>
                        <p className="text-xl text-dark-600">
                            Conoce la historia detrás de cada tarta y budín artesanal
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative h-96 rounded-2xl overflow-hidden"
                        >
                            <Image
                                src="/images/hero-bundt-cake.jpg"
                                alt="Nuestra Historia"
                                fill
                                className="object-cover"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-display text-dark-800 mb-6">
                                Nuestra Historia
                            </h2>
                            <p className="text-dark-600 mb-4 leading-relaxed">
                                Pasteleia nació de una pasión por la repostería artesanal y el deseo de compartir
                                momentos dulces con quienes más queremos. Lo que comenzó como un hobby en la cocina
                                de casa, se transformó en un emprendimiento dedicado a crear tartas y budines únicos.
                            </p>
                            <p className="text-dark-600 mb-4 leading-relaxed">
                                Cada receta es el resultado de años de experimentación, perfeccionamiento y amor por
                                el arte de la pastelería. Nos inspiramos en técnicas tradicionales, pero no tenemos
                                miedo de innovar para crear sabores que sorprendan y deleiten.
                            </p>
                            <p className="text-dark-600 leading-relaxed">
                                Hoy, seguimos trabajando con la misma dedicación del primer día, elaborando cada
                                producto a mano, con ingredientes de primera calidad y sin conservantes artificiales.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl font-display text-dark-800 mb-4">
                            Nuestra Filosofía
                        </h2>
                        <p className="text-lg text-dark-600 max-w-2xl mx-auto">
                            Creemos en la producción artesanal, limitada y personalizada
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        <Card className="p-8 md:p-12">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-display text-dark-800 mb-3">
                                        🎂 Artesanal
                                    </h3>
                                    <p className="text-dark-600 leading-relaxed">
                                        Cada producto es elaborado completamente a mano, siguiendo recetas tradicionales
                                        y técnicas que garantizan la máxima calidad. No usamos mezclas pre-elaboradas
                                        ni atajos industriales.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-display text-dark-800 mb-3">
                                        ✨ Ingredientes Premium
                                    </h3>
                                    <p className="text-dark-600 leading-relaxed">
                                        Seleccionamos cuidadosamente cada ingrediente. Mantequilla de primera,
                                        chocolate belga, vainilla natural, frutas frescas. Sin conservantes ni
                                        aditivos artificiales.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-display text-dark-800 mb-3">
                                        🌟 Producción Limitada
                                    </h3>
                                    <p className="text-dark-600 leading-relaxed">
                                        Trabajamos bajo pedido para garantizar la frescura absoluta. Cada tarta y
                                        budín es horneado especialmente para ti, asegurando que llegue en su punto
                                        perfecto de sabor y textura.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-display text-dark-800 mb-3">
                                        💝 Personalización
                                    </h3>
                                    <p className="text-dark-600 leading-relaxed">
                                        Entendemos que cada celebración es única. Por eso ofrecemos la posibilidad
                                        de personalizar nuestros productos según tus preferencias y necesidades especiales.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl font-display text-dark-800 mb-4">
                            Nuestros Valores
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="p-6 text-center h-full">
                                    <div className="w-16 h-16 rounded-full bg-accent-500 flex items-center justify-center mx-auto mb-4">
                                        <value.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-display text-dark-800 mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-dark-600 text-sm">
                                        {value.description}
                                    </p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
