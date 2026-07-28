import mongoose from "mongoose";
import ProductModel from "../models/Product.models.js";
import { dbGetproducts, dbDeleteproducts, insertproduct, dbGetproductsById, } from '../services/product.service.js'

const getproducts = async (req, res) => {
    try {
        const data = await dbGetproducts();
        res.json({
            msg: "obtener todos los productos",
            data: data
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            msg: "error al obtener productos"
        });
    }
};

const deleteproductos = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await dbDeleteproducts(id);
        //validacion 

        if (data) {
            return res.json(
                {
                    msg: "No se puede eliminar un producto que no se encuentra registrado"
                }
            )
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "el ID proporcionado no se ha podido elimar porque es invalido"
            });
        }

        res.json({
            msg: "eliminar productos",
            data: data

        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "error al encontrar el ID"
        });
    }

};

const postproducts = async (req, res) => {
    try {
        //obtengo los datos enviados en la peticion 
        const inputData = req.body;
        // registra usando el modelo y guarda la respuesta en la constante data 
        const data = await insertproduct(inputData);

        // respondemos al cliente enviado los datos registrados
        res.json({
            data: data
        });
        //respondemos al cliente enviado un mensaje humano 
    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg: "hola chao"
        })
    }
}

const getproductsById = async (req, res) => {
    try {
        const id = req.params.id;
        //VALIDACION DEFENSIVA : CONDICIONAMOS PREVIO A QUE OCURRA EL ERROR  (NUNCA OCURRE)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "el ID proporcionado es invalido"
            });
        }
        const data = await dbGetproductsById(id);
        res.json({
            msg: ("obtiene un producto por id"),
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "error al"
        });

    }



}

const patchproducts = async (req, res) => {
    try {
        const id = req.params.id; //id de la ruta para encontrar el documento que quiero actualizar 

        const inputData = req.body; // obteniendo el objeto con el /los parametros que quiero actualizar
        const data = await ProductModel.findByIdAndUpdate(id, inputData, { new: true });
        if (data) {

            throw new error("no se pudo actualizar el producto")
            if (error.message.includes("no se pudo actualizar el producto")) {
                return res.json({
                    msg: error.message
                });
            }
        }
        res.json({
            msg: "actualizar productos",
            data: data
        });

    } catch (error) {
        console.error(error)
        //validacion execption: manejar cuando ocurre el error
        if (error.name === "CastError") {
            return res.status(400).json({
                msg: "no se pudo actulizar el producto porque el ID es invalido"
            });
        }
        res.status(500).json({
            msg: "hola chao"
        })
    }
}

export {
    getproducts,
    deleteproductos,
    postproducts,
    patchproducts,
    getproductsById
}