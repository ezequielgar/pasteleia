'use client';

import { motion } from 'framer-motion';

export function TextAnimate({ children, animation = "blurInUp", by = "character", duration = 1 }) {
    const text = String(children);
    const characters = text.split('');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: duration / characters.length,
            },
        },
    };

    const blurInUpVariants = {
        hidden: {
            opacity: 0,
            filter: 'blur(10px)',
            y: 20,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                duration: 0.4,
            },
        },
    };

    const variantMap = {
        blurInUp: blurInUpVariants,
    };

    const selectedVariant = variantMap[animation] || blurInUpVariants;

    if (by === 'character') {
        return (
            <motion.span
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ display: 'inline-block' }}
            >
                {characters.map((char, index) => (
                    <motion.span
                        key={`${char}-${index}`}
                        variants={selectedVariant}
                        style={{ display: 'inline-block', whiteSpace: 'pre' }}
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.span>
        );
    }

    // Fallback: animate entire text
    return (
        <motion.span
            variants={selectedVariant}
            initial="hidden"
            animate="visible"
            style={{ display: 'inline-block' }}
        >
            {text}
        </motion.span>
    );
}
