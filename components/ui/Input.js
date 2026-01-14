'use client';

export default function Input({
    label,
    error,
    className = '',
    ...props
}) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-dark-700 mb-2">
                    {label}
                </label>
            )}
            <input
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors duration-200 ${error
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gray-300 focus:border-accent-500'
                    } ${className}`}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
