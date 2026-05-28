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
    };
};

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
        // Obtengo los datos enviados en la peticion.
        const inputData = req.body;

        // Registra usando modelo y guarda la respeusta en la contante data.
        const data = await dbCreateCategory(inputData);

        // Respondemos al clente enviando los datos registrados. El codigo de estado cuando se crea un recurso nuevo con exito.
        res.status(201).json({
            data: data
        });
    } catch (error) {
        console.error(error)  // para la consola (Desarrollador)

        //  Respondemos al cliente enviando un mensaje humano. El codigo de este estado cuando el server falla.
        res.status(500).json({
            msg: 'No se pudo registrar la categoria'
        });
    };
};

export { getCategory, deleteCategory, updateCategory, createCategory, getCategoryById }