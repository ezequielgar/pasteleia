/**
 * Genera un mensaje formateado para WhatsApp con los detalles del pedido
 * @param {Object} orderData - Datos del pedido
 * @param {string} orderData.customerName - Nombre del cliente
 * @param {string} orderData.customerPhone - Teléfono del cliente
 * @param {Array} orderData.items - Items del pedido
 * @param {number} orderData.total - Total del pedido
 * @returns {string} URL de WhatsApp con el mensaje
 */
export function generateWhatsAppMessage(orderData) {
    const { customerName, customerPhone, items, total } = orderData;

    let message = `*Nuevo Pedido - Pasteleia*\n\n`;
    message += `👤 *Cliente:* ${customerName}\n`;
    message += `📱 *Teléfono:* ${customerPhone}\n\n`;
    message += `📦 *Productos:*\n`;

    items.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   Cantidad: ${item.quantity}\n`;
        message += `   Precio unitario: $${item.price.toFixed(2)}\n`;
        message += `   Subtotal: $${(item.price * item.quantity).toFixed(2)}\n\n`;
    });

    message += `💰 *Total: $${total.toFixed(2)}*\n\n`;
    message += `¡Gracias por tu pedido! 🎂`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

    return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}

/**
 * Formatea un precio en pesos argentinos
 * @param {number} price - Precio a formatear
 * @returns {string} Precio formateado
 */
export function formatPrice(price) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    }).format(price);
}

/**
 * Valida un número de teléfono argentino
 * @param {string} phone - Número de teléfono
 * @returns {boolean} True si es válido
 */
export function validatePhone(phone) {
    // Acepta formatos: 3816485599, 03816485599, +543816485599
    const phoneRegex = /^(\+?54)?0?[1-9]\d{8,9}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ''));
}
