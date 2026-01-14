export default function Badge({
    children,
    variant = 'default',
    className = ''
}) {
    const variants = {
        default: 'bg-primary-200 text-dark-800',
        accent: 'bg-accent-500 text-white',
        success: 'bg-green-500 text-white',
        warning: 'bg-yellow-500 text-white',
        danger: 'bg-red-500 text-white',
    };

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}
