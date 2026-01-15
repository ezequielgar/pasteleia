import { supabase } from '@/lib/supabase/client';

export async function getProducts() {
    // Admin view: all products
    return await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
}

export async function getFeaturedProducts(limit = 6) {
    // Public view: active products only
    return await supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .limit(limit)
        .order('created_at', { ascending: false });
}

export async function createProduct(productData) {
    return await supabase
        .from('products')
        .insert([productData]);
}

export async function updateProduct(id, updates) {
    return await supabase
        .from('products')
        .update(updates)
        .eq('id', id);
}

export async function deleteProduct(id) {
    return await supabase
        .from('products')
        .delete()
        .eq('id', id);
}

export async function uploadImage(file) {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(filePath, file);

        if (uploadError) {
            throw uploadError;
        }

        const { data } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath);

        return data.publicUrl;
    } catch (error) {
        console.error('Error uploading image:', error);
        return null; // Handle error appropriately in UI
    }
}
