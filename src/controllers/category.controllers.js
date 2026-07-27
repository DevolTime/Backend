import fs from 'fs'; // Módulo nativo para interactuar con el sistema de archivos (borrar imágenes)
import path from 'path'; // Módulo nativo para manipular rutas de archivos de forma multiplataforma
import mongoose from "mongoose";

import {
    dbGetCategory,
    dbCreateCategory,
    dbDeleteCategory,
    dbUpdateCategory,
    dbGetCategoryById
} from "../services/category.service.js";

// 2. CONTROLADORES CRUD
// Obtener el listado general de categorías
const getCategory = async (req, res) => {
    try {
        const data = await dbGetCategory();
        res.json({
            msg: 'lista categorias',
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'No se pudo encontrar la categoria'
        });
    }
};

// Eliminar una categoría y remover su imagen física asociada del disco
const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;

        // Validación defensiva: verifica que el ID tenga la estructura de un ObjectId de Mongo
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'No se pudo eliminar la categoria ya que el id proporcionado es invalido'
            });
        }

        // 1. Obtiene la categoría de la DB para extraer la ruta de su imagen antes de borrarla
        const categoryToDelete = await dbGetCategoryById(id);

        if (!categoryToDelete) {
            return res.status(400).json({
                msg: 'No se puede eliminar una categoria que no se encuentra registrada'
            });
        }

        // 2. Si tiene una URL de imagen asociada, elimina el archivo físico del disco
        if (categoryToDelete.urlImage) {
            const fileName = categoryToDelete.urlImage.split('/uploads/categories/')[1];

            if (fileName) {
                const filePath = path.join(process.cwd(), 'uploads', 'categories', fileName);

                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('⚠️ No se pudo eliminar la imagen del servidor:', err.message);
                    } else {
                        console.log('🗑️ Imagen borrada del servidor al eliminar la categoría:', fileName);
                    }
                });
            }
        }

        // 3. Elimina el registro de la base de datos
        const data = await dbDeleteCategory(id);

        res.json({
            msg: 'Categoría e imagen eliminadas correctamente',
            data: data
        });
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        res.status(500).json({
            msg: 'No se pudo eliminar la Categoria'
        });
    }
};

// Obtener el detalle de una categoría por su ID
const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id;

        // Validación defensiva del parámetro ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'No se pudo buscar la categorua ya que el id proporcionado es invalido'
            });
        }

        const data = await dbGetCategoryById(id);

        if (!data) {
            return res.status(400).json({
                msg: 'No se puede buscar una categoria que no se encuentra registrado'
            });
        }

        res.json({
            msg: 'Obtiene una Categoria por id',
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'No se pudo encontrar la categoria'
        });
    }
};

// Actualizar datos/estado de una categoría y reemplazar su imagen previa en disco
const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = { ...req.body };

        // Convierte el valor 'status' de String a Boolean si proviene de FormData
        if (typeof inputData.status === 'string') {
            inputData.status = inputData.status === 'true';
        }

        // Si se envió un nuevo archivo mediante el middleware Multer
        if (req.file) {
            // 1. Consulta la imagen vieja registrada
            const oldCategory = await dbGetCategoryById(id);
            if (oldCategory && oldCategory.urlImage) {
                const oldFileName = oldCategory.urlImage.split('/uploads/categories/')[1];
                if (oldFileName) {
                    const oldFilePath = path.join(process.cwd(), 'uploads', 'categories', oldFileName);
                    // 2. Elimina la imagen antigua de la carpeta del servidor
                    fs.unlink(oldFilePath, (err) => {
                        if (err) {
                            console.error('⚠️ No se pudo eliminar la imagen anterior:', err.message);
                        } else {
                            console.log('🗑️ Imagen anterior eliminada con éxito:', oldFileName);
                        }
                    });
                }
            }
            // 3. Asigna la nueva URL accesible públicamente al objeto de datos
            inputData.urlImage = `${req.protocol}://${req.get('host')}/uploads/categories/${req.file.filename}`;
        }
        const data = await dbUpdateCategory(id, inputData);
        res.json({
            msg: 'Actualiza una categorias',
            data: data
        });
    } catch (error) {
        console.error(error);
        if (error.name === 'CastError') {
            return res.status(400).json({
                msg: 'No se pudo actualizar la categoria ya que el ID proporcioando es invalido'
            });
        }
        res.status(500).json({
            msg: 'No se pudo actualizar la categoria por su id'
        });
    }
};

// Registrar una nueva categoría en el sistema
const createCategory = async (req, res) => {
    try {
        const inputData = { ...req.body };
        // Parsea 'status' proveniente de un FormData
        if (typeof inputData.status === 'string') {
            inputData.status = inputData.status === 'true';
        }
        // Si se subió un archivo de imagen, genera la ruta estática accesible
        if (req.file) {
            inputData.urlImage = `${req.protocol}://${req.get('host')}/uploads/categories/${req.file.filename}`;
        }
        const data = await dbCreateCategory(inputData);
        return res.status(201).json({
            msg: 'Categoría creada con éxito',
            data: data
        });
    } catch (error) {
        console.error('Error al crear categoría:', error);
        // Control de duplicados en índices de MongoDB (ej. nombre de categoría único)
        if (error.code === 11000) {
            return res.status(400).json({
                msg: 'Error: Esta categoría ya existe.'
            });
        }
        // Control de errores de validación definidos en el Schema de Mongoose
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                msg: 'Error de validación en los datos enviados',
                details: error.message
            });
        }
        return res.status(500).json({
            msg: 'No se pudo registrar la categoria',
            error: error.message
        });
    }
};

export {
    getCategory,
    deleteCategory,
    updateCategory,
    createCategory,
    getCategoryById
};