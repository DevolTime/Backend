import mongoose from "mongoose";
import { dbCreateCart, dbDeleteCart, dbGetCart, dbGetCartById, dbUpdateCart } from "../services/cart.service.js";

const getCart = async (req, res) => {

    try {
        const data = await dbGetCart();
        res.json({
            msg: 'Lista de Carrito',
            data: data
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            msg: 'No se pudo obtener el carrito'
        })
    }
}

const getCartById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'El id proporcionado es invalido'
            })
        }

        const data = await dbGetCartById(id);

        if (!data) {
            return res.status(404).json({
                msg: 'Carrito no encontrado'
            })
        }
        res.json({
            mssg: 'Carrito encontrado',
            data: data
        })
    } catch (error) {
        console.error(error);

        
        res.status(500).json({
            msg: 'No se pudo obtener el Carrito'
        })
    }
}

const createCart = async (req, res) => {
    try {
        const inputData = req.body;

        const data = await dbCreateCart(inputData);
        res.status(201).json({
            msg: 'Carrito creato correctamente',
            data
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'No se pudo crear el carrito'
        })

    }
}

const updateCart = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body;

        const data = await dbUpdateCart(id, inputData)

        res.json({
            msg: 'Carrito actualizado',
            data: data
        })
    } catch (error) {
        console.error(error);

        if (error.name === 'CastError') {
            return res.status(400).json({
                msg: 'No se pudo Actualizar el carrito ya que el ID es invalido'
            })
        }

        res.status(500).json({
            msg: 'No se pudo actualizar el Carrito por su id'
        })
    }
};


const DeleteCart = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'el id proporcionado es invalido'
            })
        }

        const data = await dbDeleteCart(id);
        if (!data) {
            return res.status(400).json({
                msg: 'Carrito no encontrado'
            })
        }

        res.json({
            msg: "Carrito eliminado",
            data
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            msg: "No se pudo eliminar el carrito"
        });
    }
};

export {getCart, getCartById, createCart, updateCart, DeleteCart }