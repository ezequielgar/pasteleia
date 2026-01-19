'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ProductsLoading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 bg-primary-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent-400 rounded-full blur-3xl"></div>
            </div>

            {/* Logo Container */}
            <div className="relative z-10 flex flex-col items-center gap-6">
                {/* Spinning Logo with Black Hole Effect */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* Outer glow ring */}
                    <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-radial from-primary-400/30 via-primary-500/50 to-transparent"
                        animate={{
                            rotate: 360,
                            scale: [1, 1.3, 1],
                        }}
                        transition={{
                            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                        }}
                    />

                    {/* Inner glow ring */}
                    <motion.div
                        className="absolute inset-2 rounded-full bg-gradient-radial from-primary-300/40 via-primary-600/60 to-transparent"
                        animate={{
                            rotate: -360,
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
                            scale: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
                        }}
                    />

                    {/* Logo Image */}
                    <motion.img
                        src="/images/pastelei_logo_solo.png"
                        alt="Pasteleia Logo"
                        className="relative w-28 h-28 object-contain z-10 drop-shadow-2xl"
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                </div>

                {/* Loading Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                >
                    <p className="text-white text-2xl font-display tracking-wide">
                        Cargando productos...
                    </p>
                    <motion.div
                        className="flex justify-center gap-1 mt-3"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                        <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                        <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
