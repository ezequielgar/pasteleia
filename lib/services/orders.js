import { supabase } from '@/lib/supabase/client';

export async function createOrder(orderData, items) {
    try {
        // 1. Create the order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert([orderData])
            .select()
            .single();

        if (orderError) throw orderError;

        // 2. Prepare order items
        const orderItems = items.map(item => ({
            order_id: order.id,
            product_id: item.product_id, // Ensure this matches your cart item structure
            quantity: item.quantity,
            price: item.price,
            product_name: item.product_name
        }));

        // 3. Insert order items
        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

        if (itemsError) throw itemsError;

        // 4. Update Stock (Sequential update for simplicity)
        // Note: For high concurrency, use an RPC. For now, this suffices.
        for (const item of items) {
            const { error: stockError } = await supabase.rpc('decrement_stock', {
                product_id: item.product_id,
                quantity_to_decrement: item.quantity
            });

            // Fallback if RPC doesn't exist (manual update)
            if (stockError) {
                // Fetch current stock
                const { data: product } = await supabase
                    .from('products')
                    .select('stock')
                    .eq('id', item.product_id)
                    .single();

                if (product) {
                    await supabase
                        .from('products')
                        .update({ stock: product.stock - item.quantity })
                        .eq('id', item.product_id);
                }
            }
        }

        return { data: order, error: null };
    } catch (error) {
        console.error('Error creating order:', error);
        return { data: null, error };
    }
}

export async function getOrders() {
    return await supabase
        .from('orders')
        .select(`
            *,
            order_items (*)
        `)
        .order('created_at', { ascending: false });
}

export async function updateOrderStatus(id, status) {
    return await supabase
        .from('orders')
        .update({ status })
        .eq('id', id);
}
