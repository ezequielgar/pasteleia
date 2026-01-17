export default function Input({ label, error, className = '', ...props }) {
    return (
        <div className="w-full">
            {label && (
                <label className="inline-block bg-black text-white px-3 py-1 text-xs font-bold uppercase mb-2">
                    {label}
                </label>
            )}
            <input
                className={`
                    w-full px-4 py-3
                    border-4 ${error ? 'border-red-600' : 'border-black'}
                    bg-white text-gray-900 font-medium
                    focus:outline-none
                    ${error
                        ? 'shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] hover:shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] focus:shadow-[8px_8px_0px_0px_rgba(220,38,38,1)]'
                        : 'shadow-[6px_6px_0px_0px_rgba(0,183,255,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,183,255,1)] focus:shadow-[8px_8px_0px_0px_rgba(0,183,255,1)]'
                    }
                    transition-all duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${className}
                `}
                {...props}
            />
            {error && (
                <p className="text-red-600 text-sm mt-2 font-medium">{error}</p>
            )}
        </div>
    );
}
