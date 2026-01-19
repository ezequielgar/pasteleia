/**
 * Generate WhatsApp message for order
 */
export function generateWhatsAppMessage(cart, customerName, customerPhone) {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    let message = `🍰 *Nuevo Pedido - Pasteleia*\n\n`;
    message += `👤 *Cliente:* ${customerName}\n`;
    message += `📱 *Teléfono:* ${customerPhone}\n\n`;
    message += `📦 *Productos:*\n`;

    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   Cantidad: ${item.quantity}\n`;
        message += `   Precio unitario: $${item.price.toFixed(2)}\n`;
        message += `   Subtotal: $${(item.price * item.quantity).toFixed(2)}\n\n`;
    });

    message += `💰 *Total: $${total.toFixed(2)}*\n\n`;
    message += `¡Gracias por tu pedido! 🎉`;

    return message;
}

/**
 * Create WhatsApp link with pre-filled message
 */
export function createWhatsAppLink(cart, customerName, customerPhone, businessPhone) {
    const message = generateWhatsAppMessage(cart, customerName, customerPhone);
    const encodedMessage = encodeURIComponent(message);

    // Remove any non-numeric characters from phone number
    const cleanPhone = businessPhone.replace(/\D/g, '');

    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Open WhatsApp with order
 */
export function sendOrderViaWhatsApp(cart, customerName, customerPhone) {
    const businessPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5493814637258';
    const whatsappLink = createWhatsAppLink(cart, customerName, customerPhone, businessPhone);

    // Open WhatsApp in new tab
    window.open(whatsappLink, '_blank');
}
