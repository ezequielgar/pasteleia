'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const StepperContext = React.createContext({ activeIndex: 0 });

export function Stepper({ children, activeIndex = 0 }) {
    return (
        <StepperContext.Provider value={{ activeIndex }}>
            <div className="space-y-4">
                {children}
            </div>
        </StepperContext.Provider>
    );
}

function Step({ children, index }) {
    const { activeIndex } = React.useContext(StepperContext);
    const isActive = activeIndex === index;
    const isCompleted = activeIndex > index;

    return (
        <div className="relative">
            {children}
        </div>
    );
}

function StepLabel({ children, index }) {
    const { activeIndex } = React.useContext(StepperContext);
    const isActive = activeIndex === index;
    const isCompleted = activeIndex > index;

    return (
        <div className="flex items-center gap-3 mb-2">
            <div
                className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all
                    ${isCompleted
                        ? 'bg-primary-600 text-white'
                        : isActive
                            ? 'bg-primary-600 text-white ring-4 ring-primary-100'
                            : 'bg-gray-200 text-gray-500'
                    }
                `}
            >
                {isCompleted ? (
                    <Check className="w-4 h-4" />
                ) : (
                    <span>{index + 1}</span>
                )}
            </div>
            <h3
                className={`
                    font-semibold transition-colors
                    ${isActive ? 'text-gray-900' : isCompleted ? 'text-gray-700' : 'text-gray-400'}
                `}
            >
                {children}
            </h3>
        </div>
    );
}

function StepContent({ children, index }) {
    const { activeIndex } = React.useContext(StepperContext);
    const isActive = activeIndex === index;

    return (
        <AnimatePresence mode="wait">
            {isActive && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-11 overflow-hidden"
                >
                    <div className="pb-6 text-gray-700">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Attach sub-components
Stepper.Step = Step;
Stepper.Label = StepLabel;
Stepper.Content = StepContent;

export default Stepper;
