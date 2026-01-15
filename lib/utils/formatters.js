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
    if (!price && price !== 0) return '$0'

    // Convert to number if string
    const numPrice = typeof price === 'string' ? parseFloat(price) : price

    // Format with thousands separator (dot) and no decimals
    return `$${numPrice.toLocaleString('es-AR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })}`
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

/**
 * Format date to readable format
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date
 */
export function formatDate(date) {
    if (!date) return ''

    const dateObj = typeof date === 'string' ? new Date(date) : date

    return dateObj.toLocaleDateString('es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

/**
 * Get product badge based on product data
 * @param {Object} product - Product object
 * @returns {string|null} Badge text or null
 */
export function getProductBadge(product) {
    if (!product) return null

    // Check if product is new (created in last 7 days)
    const createdAt = new Date(product.created_at)
    const daysSinceCreation = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24)

    if (daysSinceCreation <= 7) {
        return 'NUEVO'
    }

    // Check if low stock
    if (product.stock > 0 && product.stock <= 3) {
        return 'ÚLTIMAS UNIDADES'
    }

    // Check if popular (budines category)
    if (product.category === 'budines') {
        return 'POPULAR'
    }

    // Check if special (premium products)
    if (product.price >= 9000) {
        return 'ESPECIAL'
    }

    return null
}

/**
 * Get category display name
 * @param {string} category - Category slug
 * @returns {string} Display name
 */
export function getCategoryName(category) {
    const categories = {
        tartas: 'Tartas',
        budines: 'Budines',
        cookies: 'Cookies',
    }

    return categories[category] || category
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 100) {
    if (!text) return ''
    if (text.length <= maxLength) return text

    return text.substring(0, maxLength).trim() + '...'
}

/**
 * Check if product is in stock
 * @param {Object} product - Product object
 * @returns {boolean} True if in stock
 */
export function isInStock(product) {
    return product && product.stock > 0
}

/**
 * Get stock status message
 * @param {Object} product - Product object
 * @returns {string} Stock status message
 */
export function getStockStatus(product) {
    if (!product) return 'No disponible'

    if (product.stock === 0) {
        return 'Sin stock'
    }

    if (product.stock <= 3) {
        return `Solo ${product.stock} disponibles`
    }

    return 'Disponible'
}
