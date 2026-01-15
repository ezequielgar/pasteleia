'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { BookOpen, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RecetasPage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expandedRecipe, setExpandedRecipe] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        yield: '',
        ingredients: '',
        instructions: ''
    });
    const [submitting, setSubmitting] = useState(false);

    const fetchRecipes = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('recipes')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setRecipes(data || []);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const { error } = await supabase
                .from('recipes')
                .insert([formData]);

            if (error) throw error;

            setIsModalOpen(false);
            setFormData({
                name: '',
                description: '',
                yield: '',
                ingredients: '',
                instructions: ''
            });
            fetchRecipes();
        } catch (error) {
            console.error('Error saving recipe:', error);
            alert('Error al guardar la receta');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation(); // Prevent toggling expand
        if (!confirm('¿Estás seguro de eliminar esta receta?')) return;

        try {
            const { error } = await supabase.from('recipes').delete().eq('id', id);
            if (error) throw error;
            fetchRecipes();
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    const toggleExpand = (id) => {
        setExpandedRecipe(expandedRecipe === id ? null : id);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display text-dark-800">Recetario</h1>
                    <p className="text-gray-600 text-sm">Guarda tus recetas secretas</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-5 h-5 mr-2" />
                    Nueva Receta
                </Button>
            </div>

            <div className="grid gap-4">
                {loading ? (
                    <div className="text-center py-12 text-gray-500">Cargando recetario...</div>
                ) : recipes.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                        <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">Tu recetario está vacío</h3>
                        <p className="text-gray-500 mb-4">Empieza guardando tu primera receta</p>
                        <Button onClick={() => setIsModalOpen(true)}>Crear Receta</Button>
                    </div>
                ) : (
                    recipes.map((recipe) => (
                        <div
                            key={recipe.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                        >
                            <div
                                onClick={() => toggleExpand(recipe.id)}
                                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-primary-100 rounded-lg text-primary-700">
                                        <BookOpen className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{recipe.name}</h3>
                                        <p className="text-sm text-gray-500">{recipe.description || 'Sin descripción'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    {recipe.yield && (
                                        <span className="text-sm px-3 py-1 bg-gray-100 rounded-full text-gray-600 hidden sm:inline-block">
                                            Rinde: {recipe.yield}
                                        </span>
                                    )}
                                    <button
                                        onClick={(e) => handleDelete(recipe.id, e)}
                                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    {expandedRecipe === recipe.id ? (
                                        <ChevronUp className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    )}
                                </div>
                            </div>

                            <AnimatePresence>
                                {expandedRecipe === recipe.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="border-t border-gray-100"
                                    >
                                        <div className="p-6 grid md:grid-cols-2 gap-8 bg-gray-50/50">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                    🥕 Ingredientes
                                                </h4>
                                                <div className="bg-white p-4 rounded-lg border border-gray-200 whitespace-pre-wrap text-sm text-gray-700 font-mono leading-relaxed">
                                                    {recipe.ingredients}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                    📝 Instrucciones
                                                </h4>
                                                <div className="bg-white p-4 rounded-lg border border-gray-200 whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
                                                    {recipe.instructions}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Nueva Receta"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Nombre de la Receta"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Descripción Corta"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Ej: Tarta clásica para eventos"
                        />
                        <Input
                            label="Rendimiento"
                            value={formData.yield}
                            onChange={(e) => setFormData({ ...formData, yield: e.target.value })}
                            placeholder="Ej: 8 porciones"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ingredientes
                        </label>
                        <textarea
                            rows={6}
                            value={formData.ingredients}
                            onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300 transition-all font-sans font-mono text-sm"
                            placeholder={"- 500g Harina\n- 200g Azúcar\n- 4 Huevos"}
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Instrucciones / Procedimiento
                        </label>
                        <textarea
                            rows={6}
                            value={formData.instructions}
                            onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300 transition-all font-sans text-sm"
                            placeholder={"1. Batir los huevos...\n2. Incorporar la harina..."}
                            required
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" loading={submitting}>
                            Guardar Receta
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
