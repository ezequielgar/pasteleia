import './globals.css';
import { Bebas_Neue, Inter, Yellowtail } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/lib/context/CartContext';
import CartButton from '@/components/cart/CartButton';

const bebasNeue = Bebas_Neue({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-bebas',
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

const yellowtail = Yellowtail({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-yellowtail',
});

export const metadata = {
    title: 'Pasteleia - Pastelería Artesanal',
    description: 'Tartas y budines artesanales hechos con amor. Pedidos por encargo.',
    keywords: 'pastelería, tartas, budines, artesanal, pedidos',
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body className={`${bebasNeue.variable} ${inter.variable} ${yellowtail.variable} font-sans antialiased text-dark-900 bg-white selection:bg-primary-200 selection:text-primary-900`}>
                <CartProvider>
                    <Header />
                    {children}
                    <Footer />
                    <CartButton />
                </CartProvider>
            </body>
        </html>
    );
}
