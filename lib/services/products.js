import { supabase } from '@/lib/supabase/client';

/**
 * Get all active products (public)
 */
export async function getProducts() {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('active', true)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error fetching products:', error);
        return { data: null, error };
    }
}

/**
 * Get featured products for homepage (limit to specified number)
 */
export async function getFeaturedProducts(limit = 3) {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('active', true)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error fetching featured products:', error);
        return { data: null, error };
    }
}

/**
 * Get products by category
 */
export async function getProductsByCategory(category) {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('active', true)
            .eq('category', category)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error fetching products by category:', error);
        return { data: null, error };
    }
}

/**
 * Get all products including inactive (admin only)
 */
export async function getAllProducts() {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error fetching all products:', error);
        return { data: null, error };
    }
}

/**
 * Get product by ID
 */
export async function getProductById(id) {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error fetching product:', error);
        return { data: null, error };
    }
}

/**
 * Create new product (admin only)
 */
export async function createProduct(productData) {
    try {
        const { data, error } = await supabase
            .from('products')
            .insert([{
                name: productData.name,
                description: productData.description,
                price: productData.price,
                image_url: productData.image_url,
                stock: productData.stock || 0,
                active: productData.active !== undefined ? productData.active : true,
                category: productData.category || 'tartas',
            }])
            .select()
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error creating product:', error);
        return { data: null, error };
    }
}

/**
 * Update product (admin only)
 */
export async function updateProduct(id, productData) {
    try {
        const updateData = {
            ...productData,
            updated_at: new Date().toISOString(),
        };

        const { data, error } = await supabase
            .from('products')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error updating product:', error);
        return { data: null, error };
    }
}

/**
 * Delete product (admin only)
 */
export async function deleteProduct(id) {
    try {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { error: null };
    } catch (error) {
        console.error('Error deleting product:', error);
        return { error };
    }
}

/**
 * Update product stock
 */
export async function updateStock(id, quantity) {
    try {
        // Get current stock
        const { data: product, error: fetchError } = await supabase
            .from('products')
            .select('stock')
            .eq('id', id)
            .single();

        if (fetchError) throw fetchError;

        const newStock = product.stock + quantity;

        const { data, error } = await supabase
            .from('products')
            .update({ stock: newStock, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error updating stock:', error);
        return { data: null, error };
    }
}

/**
 * Upload product image to Supabase Storage
 */
export async function uploadProductImage(file, productId) {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${productId}-${Date.now()}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { data, error } = await supabase.storage
            .from('product-images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (error) throw error;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath);

        return { data: { path: filePath, url: publicUrl }, error: null };
    } catch (error) {
        console.error('Error uploading image:', error);
        return { data: null, error };
    }
}
