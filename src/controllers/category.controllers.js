import mongoose from "mongoose";
import CategoryModel from "../models/Category.model.js";
import { dbGetCategory, dbCreateCategory, dbDeleteCategory, dbUpdateCategory, dbGetCategoryById } from "../services/category.service.js"

const getCategory = async (req, res) => {

    try {
        const data = await dbGetCategory();
        res.json({
            msg: 'lista categorias',
            data: data
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg: 'No se pudo encontrar la categoria'
        })
    }
}


const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        // validacion defensiva: condicionamos antes que ocurra el error (no pasa)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'No se pudo eliminar la categoria ya que el id proporcionado es invalido'
            })
        }
        const data = await dbDeleteCategory(id);
        //  Validacion
        if (!data) {
            return res.status(400).json({
                msg: 'No se puede eliminar una categoria que no se encuentra registrado'
            })
        }
        res.json({
            msg: 'Eliminar una categorias',
            data: data
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg: 'No se pudo eliminar la Categoria'
        })
    }
};

const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        // validacion defensiva: condicionamos antes que ocurra el error (no pasa)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'No se pudo buscar la categorua ya que el id proporcionado es invalido'
            })
        }
        const data = await dbGetCategoryById(id);
        //  Validacion
        if (!data) {
            return res.status(400).json({
                msg: 'No se puede buscar una categoria que no se encuentra registrado'
            })
        }
        res.json({
            msg: 'Obtiene una Categoria por id',
            data: data
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'No se pudo encontrar la categoria'
        })
    };
};

const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body;
        if (req.file) {
            inputData.urlImage = `${req.protocol}://${req.get('host')}/uploads/categories/${req.file.filename}`;
        }
        const data = await dbUpdateCategory(id, inputData)

        //const data = await CategoryModel.findOneAndUpdate({ _id: id }, inputData)
        res.json({
            msg: 'Actualiza una categorias',
            data: data
        });
    } catch (error) {
        console.error(error);
        // Validacion exepcion: Manejar cuando ocurre el error
        if (error.name === 'CastError') {
            return res.status(400).json({
                msg: 'No se pudo actualizar la categoria ya que el ID proporcioando es invalido'
            })
        }
        res.status(500).json({
            msg: 'No se pudo actualizar la categoria por su id'
        })
    }
};

const createCategory = async (req, res) => {
    try {
        // Obtenemos los datos recibidos
        const inputData = { ...req.body };

        // Parseamos 'status' si viene como string desde FormData ('true' -> true)
        if (typeof inputData.status === 'string') {
            inputData.status = inputData.status === 'true';
        }

        // Si Multer subió un archivo, le asignamos la URL pública
        if (req.file) {
            // Nota: Ajusta 'uploads' o 'uploads/categories' según la carpeta real donde guarda Multer
            inputData.urlImage = `${req.protocol}://${req.get('host')}/uploads/categories/${req.file.filename}`;
        }

        const data = await dbCreateCategory(inputData);

        return res.status(201).json({
            msg: 'Categoría creada con éxito',
            data: data
        });

    } catch (error) {
        console.error('Error al crear categoría:', error);

        // Error por campo duplicado en MongoDB (código 11000)
        if (error.code === 11000) {
            return res.status(400).json({
                msg: 'Error: Esta categoría ya existe.'
            });
        }

        // Error de validación de Mongoose
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


export { getCategory, deleteCategory, updateCategory, createCategory, getCategoryById }