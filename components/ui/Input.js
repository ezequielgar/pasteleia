export default function Input({ label, error, className = '', ...props }) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <input
                className={`
                    w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all font-sans
                    ${error
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                        : 'border-gray-300 focus:border-primary-300 focus:ring-primary-100'}
                    ${className}
                `}
                {...props}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}
