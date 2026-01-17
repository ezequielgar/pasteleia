/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './pages/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './app/**/*.{js,jsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#FFFEF0',
                    100: '#FFFACD',
                    200: '#FFF59D',
                    300: '#FFF176',
                    400: '#FFEE58',
                    500: '#FFEB3B',
                    600: '#FDD835',
                    700: '#FBC02D',
                    800: '#F9A825',
                    900: '#F57F17',
                },
                accent: {
                    50: '#E3F2FD',
                    100: '#BBDEFB',
                    200: '#90CAF9',
                    300: '#64B5F6',
                    400: '#42A5F5',
                    500: '#2196F3',
                    600: '#1E88E5',
                    700: '#1976D2',
                    800: '#1565C0',
                    900: '#0D47A1',
                },
                brown: {
                    50: '#EFEBE9',
                    100: '#D7CCC8',
                    200: '#BCAAA4',
                    300: '#A1887F',
                    400: '#8D6E63',
                    500: '#795548',
                    600: '#6D4C41',
                    700: '#5D4037',
                    800: '#4E342E',
                    900: '#3E2723',
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
                retro: {
                    bg: '#EDDCD9',
                    border: '#264143',
                    shadow: '#E99F4C',
                    btn: '#DE5499',
                },
            },
            fontFamily: {
                display: ['Anton', 'Bebas Neue', 'Impact', 'sans-serif'],
                sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
                navbar: ['Sour Gummy', 'Poppins', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-down': 'slideDown 0.5s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
                'bounce-slow': 'bounce 3s infinite',
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
