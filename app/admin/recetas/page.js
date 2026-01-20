'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Stepper from '@/components/ui/Stepper';
import { BookOpen, Plus, Trash2, ChevronDown, ChevronUp, Edit2, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RecetasPage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expandedRecipe, setExpandedRecipe] = useState(null);
    const [editingRecipe, setEditingRecipe] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        yield: '',
        ingredients: '',
        instructions: '',
        useSteps: false,
        steps: []
    });
    const [submitting, setSubmitting] = useState(false);

    // Step editor state
    const [currentStep, setCurrentStep] = useState(0);
    const [stepForm, setStepForm] = useState({ label: '', content: '' });

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

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            yield: '',
            ingredients: '',
            instructions: '',
            useSteps: false,
            steps: []
        });
        setStepForm({ label: '', content: '' });
        setCurrentStep(0);
        setEditingRecipe(null);
    };

    const handleEdit = (recipe) => {
        setEditingRecipe(recipe);
        setFormData({
            name: recipe.name || '',
            description: recipe.description || '',
            yield: recipe.yield || '',
            ingredients: recipe.ingredients || '',
            instructions: recipe.instructions || '',
            useSteps: recipe.steps && recipe.steps.length > 0,
            steps: recipe.steps || []
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const dataToSave = {
                name: formData.name,
                description: formData.description,
                yield: formData.yield,
                ingredients: formData.ingredients,
                instructions: formData.instructions,
                steps: formData.useSteps ? formData.steps : null
            };

            let error;

            if (editingRecipe) {
                // Update existing recipe
                ({ error } = await supabase
                    .from('recipes')
                    .update(dataToSave)
                    .eq('id', editingRecipe.id));
            } else {
                // Create new recipe
                ({ error } = await supabase
                    .from('recipes')
                    .insert([dataToSave]));
            }

            if (error) throw error;

            setIsModalOpen(false);
            resetForm();
            fetchRecipes();
        } catch (error) {
            console.error('Error saving recipe:', error);

            // More detailed error message
            let errorMessage = 'Error al guardar la receta';

            if (error.message?.includes('column') && error.message?.includes('steps')) {
                errorMessage = 'ERROR: La columna "steps" no existe en la base de datos.\n\nDebes ejecutar la migración SQL en Supabase:\n\nALTER TABLE recipes ADD COLUMN IF NOT EXISTS steps JSONB;\n\nVe a supabase/migrations/add_steps_to_recipes.sql';
            } else if (error.message) {
                errorMessage = `Error: ${error.message}`;
            }

            alert(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
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

    // Step management functions
    const addStep = () => {
        if (!stepForm.label.trim() || !stepForm.content.trim()) {
            alert('Por favor completa el título y contenido del paso');
            return;
        }

        setFormData({
            ...formData,
            steps: [...formData.steps, { label: stepForm.label, content: stepForm.content }]
        });
        setStepForm({ label: '', content: '' });
    };

    const removeStep = (index) => {
        setFormData({
            ...formData,
            steps: formData.steps.filter((_, i) => i !== index)
        });
    };

    const handleStepNavigation = (direction) => {
        if (direction === 'next' && currentStep < formData.steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else if (direction === 'back' && currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Filter recipes based on search query
    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display text-dark-800">Recetario</h1>
                    <p className="text-gray-600 text-sm">Guarda tus recetas secretas</p>
                </div>
                <Button onClick={() => { resetForm(); setIsModalOpen(true); }}>
                    <Plus className="w-5 h-5 mr-2" />
                    Nueva Receta
                </Button>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar receta por nombre..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Limpiar búsqueda"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {searchQuery && (
                    <p className="text-sm text-gray-500 mt-2">
                        {filteredRecipes.length} receta(s) encontrada(s)
                    </p>
                )}
            </div>

            <div className="grid gap-4">
                {loading ? (
                    <div className="text-center py-12 text-gray-500">Cargando recetario...</div>
                ) : filteredRecipes.length === 0 && searchQuery ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                        <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">No se encontraron recetas</h3>
                        <p className="text-gray-500 mb-4">Intenta con otro término de búsqueda</p>
                        <Button onClick={() => setSearchQuery('')} variant="outline">
                            Limpiar búsqueda
                        </Button>
                    </div>
                ) : filteredRecipes.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                        <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">Tu recetario está vacío</h3>
                        <p className="text-gray-500 mb-4">Empieza guardando tu primera receta</p>
                        <Button onClick={() => { resetForm(); setIsModalOpen(true); }}>Crear Receta</Button>
                    </div>
                ) : (
                    filteredRecipes.map((recipe) => (
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
                                    {recipe.steps && recipe.steps.length > 0 && (
                                        <span className="text-xs px-2 py-1 bg-blue-100 rounded-full text-blue-700 hidden sm:inline-block">
                                            {recipe.steps.length} pasos
                                        </span>
                                    )}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleEdit(recipe); }}
                                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
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
                                        <div className="p-6 bg-gray-50/50">
                                            {recipe.steps && recipe.steps.length > 0 ? (
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                        📋 Pasos de la Receta
                                                    </h4>
                                                    <Stepper activeIndex={currentStep}>
                                                        {recipe.steps.map((step, index) => (
                                                            <Stepper.Step key={index} index={index}>
                                                                <Stepper.Label index={index}>{step.label}</Stepper.Label>
                                                                <Stepper.Content index={index}>
                                                                    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                                                                        <p className="text-gray-700 whitespace-pre-wrap">{step.content}</p>
                                                                    </div>
                                                                    <div className="flex gap-2">
                                                                        {index > 0 && (
                                                                            <Button
                                                                                size="sm"
                                                                                variant="outline"
                                                                                onClick={() => setCurrentStep(index - 1)}
                                                                            >
                                                                                Anterior
                                                                            </Button>
                                                                        )}
                                                                        {index < recipe.steps.length - 1 && (
                                                                            <Button
                                                                                size="sm"
                                                                                onClick={() => setCurrentStep(index + 1)}
                                                                            >
                                                                                Siguiente
                                                                            </Button>
                                                                        )}
                                                                    </div>
                                                                </Stepper.Content>
                                                            </Stepper.Step>
                                                        ))}
                                                    </Stepper>
                                                </div>
                                            ) : (
                                                <div className="grid md:grid-cols-2 gap-8">
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
                                            )}
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
                onClose={() => { setIsModalOpen(false); resetForm(); }}
                title={editingRecipe ? "Editar Receta" : "Nueva Receta"}
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

                    {/* Steps Toggle */}
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <input
                            type="checkbox"
                            id="useSteps"
                            checked={formData.useSteps}
                            onChange={(e) => setFormData({ ...formData, useSteps: e.target.checked })}
                            className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                        />
                        <label htmlFor="useSteps" className="text-sm font-medium text-gray-700 cursor-pointer">
                            Usar modo paso a paso (los pasos reemplazarán las instrucciones)
                        </label>
                    </div>

                    {/* Ingredientes - Always visible */}
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
                        />
                    </div>

                    {formData.useSteps ? (
                        // Step-by-step mode (replaces instructions)
                        <div className="space-y-4">
                            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                <h4 className="font-semibold text-gray-900 mb-3">Agregar Pasos de Preparación</h4>

                                <div className="space-y-3">
                                    <Input
                                        label="Título del Paso"
                                        value={stepForm.label}
                                        onChange={(e) => setStepForm({ ...stepForm, label: e.target.value })}
                                        placeholder="Ej: Preparar la masa"
                                    />
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Contenido del Paso
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={stepForm.content}
                                            onChange={(e) => setStepForm({ ...stepForm, content: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300 transition-all text-sm"
                                            placeholder="Describe el paso en detalle..."
                                        />
                                    </div>
                                    <Button type="button" onClick={addStep} size="sm" variant="outline">
                                        <Plus className="w-4 h-4 mr-1" /> Agregar Paso
                                    </Button>
                                </div>

                                {formData.steps.length > 0 && (
                                    <div className="mt-4 space-y-2">
                                        <h5 className="text-sm font-semibold text-gray-700">Pasos agregados:</h5>
                                        {formData.steps.map((step, index) => (
                                            <div key={index} className="flex items-start justify-between bg-white p-3 rounded border border-gray-200">
                                                <div className="flex-1">
                                                    <p className="font-medium text-sm text-gray-900">
                                                        {index + 1}. {step.label}
                                                    </p>
                                                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{step.content}</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeStep(index)}
                                                    className="ml-2 p-1 text-red-500 hover:text-red-700"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        // Traditional instructions mode
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
                                required={!formData.useSteps}
                            />
                        </div>
                    )}


                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => { setIsModalOpen(false); resetForm(); }}>
                            Cancelar
                        </Button>
                        <Button type="submit" loading={submitting}>
                            {editingRecipe ? 'Actualizar Receta' : 'Guardar Receta'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
