import CategoryModel from "../models/Category.model.js"; // Modelo con la estructura y esquema de categorías


// 1. MÉTODOS DE SERVICIO (Consultas directas a MongoDB)
const dbCreateCategory = async (newCategory) => {
    return await CategoryModel.create(newCategory);
};

// Obtener el listado completo de categorías
const dbGetCategory = async () => {
    return await CategoryModel.find();
};

// Eliminar un documento de categoría mediante su ID único
const dbDeleteCategory = async (id) => {
    return await CategoryModel.findByIdAndDelete(id);
};

// Actualizar los campos de una categoría existente
const dbUpdateCategory = async (id, inputData) => {
    return await CategoryModel.findByIdAndUpdate(id, inputData, { returnDocument: 'after' });
};


// Obtener una categoría específica por su ID único

const dbGetCategoryById = async (id) => {
    return await CategoryModel.findById(id);
};

export {
    dbCreateCategory,
    dbGetCategory,
    dbDeleteCategory,
    dbUpdateCategory,
    dbGetCategoryById
};