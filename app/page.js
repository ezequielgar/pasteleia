'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Award, Clock, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function Home() {
    const features = [
        {
            icon: Heart,
            title: 'Hecho con Amor',
            description: 'Cada producto es elaborado artesanalmente con ingredientes de primera calidad y mucho cariño.',
        },
        {
            icon: Award,
            title: '100% Artesanal',
            description: 'Producción limitada y personalizada. Sin conservantes ni aditivos artificiales.',
        },
        {
            icon: Clock,
            title: 'Siempre Fresco',
            description: 'Elaboramos bajo pedido para garantizar la máxima frescura en cada bocado.',
        },
    ];

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] bg-gradient-to-br from-primary-100 via-primary-50 to-white overflow-hidden">
                {/* Decorative Diagonal Stripes */}
                <div className="absolute bottom-0 left-0 right-0 h-32 diagonal-stripe opacity-90"></div>
                <div className="absolute top-20 right-0 w-64 h-64 bg-accent-500 rounded-full blur-3xl opacity-10"></div>

                <div className="container mx-auto px-4 py-20 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Orange Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-block mb-6"
                            >
                                <Badge variant="accent" className="text-sm px-6 py-2">
                                    Descubre el Arte de Nuestra Pastelería Artesanal
                                </Badge>
                            </motion.div>

                            {/* Main Title */}
                            <h1 className="text-7xl md:text-8xl font-display text-dark-800 leading-none mb-6">
                                BAKED
                                <br />
                                GOODS
                            </h1>

                            {/* Description */}
                            <p className="text-lg text-dark-600 mb-8 max-w-md">
                                Bienvenido a nuestra pastelería, donde la pasión se encuentra con la perfección en cada bocado.
                                Sumérgete en el encantador mundo de nuestros productos artesanales, meticulosamente elaborados
                                para deleitar tu paladar.
                            </p>

                            {/* 100% Original Badge */}
                            <div className="flex items-center space-x-6 mb-8">
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-full border-4 border-dark-800 flex items-center justify-center bg-white">
                                        <div className="text-center">
                                            <div className="text-xs font-bold text-dark-800">100%</div>
                                            <div className="text-xs font-bold text-dark-800">Artesanal</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <Link href="/productos">
                                    <Button size="lg" className="group">
                                        Ver Productos
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                                <Link href="/contacto">
                                    <Button variant="outline" size="lg">
                                        Contactanos
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right Content - Product Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative flex items-center justify-center"
                        >
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="relative w-80 h-80 md:w-96 md:h-96"
                            >
                                <Image
                                    src="/images/hero-bundt-cake.jpg"
                                    alt="Tarta Bundt Artesanal"
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    priority
                                />
                            </motion.div>

                            {/* Decorative Text */}
                            <div className="absolute -bottom-10 left-0 right-0">
                                <div className="diagonal-stripe py-4 text-center overflow-hidden">
                                    <motion.div
                                        animate={{ x: [0, -1000] }}
                                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                        className="whitespace-nowrap text-2xl font-display text-white"
                                    >
                                        TRY NOW ✦ TRY NOW ✦ TRY NOW ✦ TRY NOW ✦ TRY NOW ✦ TRY NOW ✦
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-6xl font-display text-dark-800 mb-4">
                            WHY CHOOSE US
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <Card className="p-8 h-full">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 rounded-full bg-accent-500 flex items-center justify-center">
                                                <feature.icon className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-display text-dark-800 mb-2">
                                                {feature.title}
                                            </h3>
                                            <p className="text-dark-600">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative h-96 rounded-2xl overflow-hidden"
                        >
                            <Image
                                src="/images/about-product.jpg"
                                alt="Sobre Nosotros"
                                fill
                                className="object-cover"
                            />
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-6xl font-display text-dark-800 mb-6">
                                ABOUT US
                            </h2>
                            <p className="text-dark-600 mb-6 leading-relaxed">
                                En Pasteleia, creemos que cada celebración merece algo especial. Nuestra pasión por
                                la repostería artesanal nos impulsa a crear tartas y budines únicos, elaborados con
                                ingredientes premium y mucho amor.
                            </p>
                            <p className="text-dark-600 mb-8 leading-relaxed">
                                Cada producto es hecho a mano, sin conservantes ni aditivos artificiales. Trabajamos
                                con producción limitada y personalizada para garantizar la máxima calidad y frescura
                                en cada bocado.
                            </p>
                            <Link href="/nosotros">
                                <Button variant="outline">
                                    Conoce Nuestra Historia
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-dark-800 text-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-6xl font-display mb-6">
                            ¿Listo para Endulzar tu Día?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Haz tu pedido ahora y disfruta de nuestras deliciosas tartas y budines artesanales
                        </p>
                        <Link href="/productos">
                            <Button size="lg" className="bg-accent-500 hover:bg-accent-600">
                                Ver Todos los Productos
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
