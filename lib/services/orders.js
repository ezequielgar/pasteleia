import { supabase } from '@/lib/supabase/client';

/**
 * Create order with items (Client-side only)
 */
export async function createOrder(orderData, items) {
    try {
        // Start a transaction by creating the order first
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert([{
                customer_name: orderData.customer_name,
                customer_phone: orderData.customer_phone,
                total: orderData.total,
                status: 'pending',
            }])
            .select()
            .single()

        if (orderError) throw orderError

        // Create order items
        const orderItems = items.map(item => ({
            order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
            product_name: item.product_name,
        }))

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems)

        if (itemsError) throw itemsError

        // Update stock for each product
        for (const item of items) {
            const { error: stockError } = await supabase.rpc('decrement_stock', {
                product_id: item.product_id,
                quantity_to_decrement: item.quantity,
            })

            // If RPC doesn't exist, update manually
            if (stockError && stockError.code === '42883') {
                const { data: product } = await supabase
                    .from('products')
                    .select('stock')
                    .eq('id', item.product_id)
                    .single()

                if (product) {
                    await supabase
                        .from('products')
                        .update({ stock: product.stock - item.quantity })
                        .eq('id', item.product_id)
                }
            } else if (stockError) {
                throw stockError
            }
        }

        return { data: order, error: null }
    } catch (error) {
        console.error('Error creating order:', error)
        return { data: null, error }
    }
}

/**
 * Get all orders (Client-side only)
 */
export async function getOrders() {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select(`
        *,
        order_items (
          *
        )
      `)
            .order('created_at', { ascending: false })

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error('Error fetching orders:', error)
        return { data: null, error }
    }
}

/**
 * Get order by ID with items (Client-side only)
 */
export async function getOrderById(id) {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select(`
        *,
        order_items (
          *
        )
      `)
            .eq('id', id)
            .single()

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error('Error fetching order:', error)
        return { data: null, error }
    }
}

/**
 * Update order status (Client-side only)
 */
export async function updateOrderStatus(id, status) {
    try {
        const { data, error } = await supabase
            .from('orders')
            .update({ status })
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error('Error updating order status:', error)
        return { data: null, error }
    }
}
