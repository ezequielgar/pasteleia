/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './app/**/*.{js,jsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#FAF6F0',
                    100: '#F5E6D3',
                    200: '#E8D4B8',
                    300: '#D4B894',
                    400: '#C09D70',
                    500: '#A67C52',
                    600: '#8B6240',
                    700: '#6B4A30',
                    800: '#4A3320',
                    900: '#2A1D12',
                },
                accent: {
                    50: '#FFF4ED',
                    100: '#FFE4D1',
                    200: '#FFC8A3',
                    300: '#FFA870',
                    400: '#FF8C42',
                    500: '#FF6B1A',
                    600: '#E85500',
                    700: '#C04600',
                    800: '#983700',
                    900: '#702900',
                },
                dark: {
                    50: '#F5F5F5',
                    100: '#E0E0E0',
                    200: '#BDBDBD',
                    300: '#9E9E9E',
                    400: '#757575',
                    500: '#616161',
                    600: '#424242',
                    700: '#303030',
                    800: '#1A1A1A',
                    900: '#0A0A0A',
                },
            },
            fontFamily: {
                display: ['Bebas Neue', 'Oswald', 'sans-serif'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-down': 'slideDown 0.5s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
};
