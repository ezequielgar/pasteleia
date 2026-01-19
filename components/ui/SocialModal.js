'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

export default function SocialModal({ isOpen, onClose, network }) {
    if (!isOpen) return null;

    const images = {
        instagram: '/images/404 ig.png',
        facebook: '/images/404 fb.png'
    };

    const titles = {
        instagram: '¡Pronto en Instagram! 📸',
        facebook: '¡Pronto en Facebook! 👍'
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
            onClick={onClose}
        >
            <div
                className="relative max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                    aria-label="Cerrar"
                >
                    <X className="w-6 h-6 text-gray-700" />
                </button>

                {/* Content */}
                <div className="p-8 text-center">
                    <h2 className="text-3xl font-display text-dark-900 mb-4">
                        {titles[network]}
                    </h2>
                    <p className="text-dark-600 mb-6">
                        Estamos trabajando en nuestras redes sociales. ¡Volvé pronto!
                    </p>

                    {/* 404 Image */}
                    <div className="relative w-full aspect-square max-w-md mx-auto">
                        <Image
                            src={images[network]}
                            alt={`${network} 404`}
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
