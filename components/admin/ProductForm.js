'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';

export default function ProductForm({ product, onSuccess, onCancel }) {
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(product?.image_url || null);

    // Form state
    const [formData, setFormData] = useState({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        stock: product?.stock || 0,
        category: product?.category || 'tartas',
        active: product?.active ?? true
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category: product.category,
                active: product.active
            });
            setPreviewUrl(product.image_url);
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const uploadImage = async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(filePath, file);

        if (uploadError) {
            throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath);

        return publicUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = formData.image_url || product?.image_url;

            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            const dataToSave = {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                image_url: imageUrl
            };

            let error;
            if (product?.id) {
                // Update
                const { error: updateError } = await supabase
                    .from('products')
                    .update(dataToSave)
                    .eq('id', product.id);
                error = updateError;
            } else {
                // Create
                const { error: insertError } = await supabase
                    .from('products')
                    .insert([dataToSave]);
                error = insertError;
            }

            if (error) throw error;

            onSuccess();
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Error al guardar el producto: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-6">
                {/* Image Upload Area */}
                <div className="w-1/3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Imagen
                    </label>
                    <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-primary-500 transition-colors">
                        {previewUrl ? (
                            <>
                                <Image
                                    src={previewUrl}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImageFile(null);
                                        setPreviewUrl(null);
                                    }}
                                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md text-red-500 hover:bg-red-50"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <Upload className="w-8 h-8 mb-2" />
                                <span className="text-xs text-center p-2">Click para subir</span>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </div>
                </div>

                {/* Main Fields */}
                <div className="w-2/3 space-y-4">
                    <Input
                        label="Nombre"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Precio"
                            name="price"
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Stock"
                            name="stock"
                            type="number"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Categoría
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300 transition-all font-sans"
                        >
                            <option value="tartas">Tartas</option>
                            <option value="budines">Budines</option>
                            <option value="cookies">Cookies</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descripción
                    </label>
                    <textarea
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300 transition-all font-sans resize-none"
                    ></textarea>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="active"
                        name="active"
                        checked={formData.active}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
                        Producto Activo (Visible en la web)
                    </label>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <Button variant="outline" type="button" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button type="submit" loading={loading}>
                    {product?.id ? 'Actualizar Producto' : 'Crear Producto'}
                </Button>
            </div>
        </form>
    );
}
