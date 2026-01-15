import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/lib/context/CartContext';
import CartButton from '@/components/cart/CartButton';

export const metadata = {
    title: 'Pasteleia - Pastelería Artesanal',
    description: 'Tartas y budines artesanales hechos con amor. Pedidos por encargo.',
    keywords: 'pastelería, tartas, budines, artesanal, pedidos',
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>
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
