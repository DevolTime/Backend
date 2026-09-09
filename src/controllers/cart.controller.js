import mongoose from "mongoose";
import { dbCreateCart, dbDeleteCart, dbGetCart, dbGetCartById, dbUpdateCart, dbClearCart, dbRemoveItemFromCart, dbAddItemToCart, dbUpdateItemQuantity } from "../services/cart.service.js";

const getCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const data = await dbGetCart(userId);
        if (!data) {
            return res.status(404).json({
                msg: 'El usuario no tiene carrito'
            });
        }
        res.json({
            msg: 'Carrito encontrado',
            data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'No se pudo obtener el carrito'
        });
    }
};

const getCartById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'El id proporcionado es invalido'
            });
        }

        const data = await dbGetCartById(id);

        if (!data) {
            return res.status(404).json({
                msg: 'Carrito no encontrado'
            });
        }

        res.json({
            msg: 'Carrito encontrado',
            data: data
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            msg: 'No se pudo obtener el carrito'
        });
    }
};

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
        const userId = req.user._id;
        const productId = req.params.productId;
        const { quantity } = req.body;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                msg: 'El id del producto es invalido'
            });
        }

        if (quantity === undefined || isNaN(quantity)) {
            return res.status(400).json({
                msg: 'La cantidad es obligatoria'
            });
        }

        const data = await dbUpdateItemQuantity(userId, productId, Number(quantity));

        if (!data) {
            return res.status(404).json({
                msg: 'Carrito no encontrado'
            });
        }

        res.json({
            msg: 'Carrito actualizado',
            data
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            msg: 'No se pudo actualizar el carrito'
        });
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
            return res.status(404).json({
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

const addItemToCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({
                msg: 'El productId es obligatorio'
            });
        }
        const data = await dbAddItemToCart(userId, productId);
        res.status(200).json({
            msg: 'Producto agregado al carrito correctamente',
            data
        });
    } catch (error) {
        console.error(error);
        if (error.message === 'PRODUCT_NOT_FOUND') {
            return res.status(404).json({
                msg: 'El producto no existe'
            });
        }
        res.status(500).json({
            msg: 'No se pudo agregar el producto al carrito'
        });
    }
};

const removeItemFromCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                msg: 'El productId proporcionado es invalido'
            });
        }

        const data = await dbRemoveItemFromCart(userId, productId);

        if (!data) {
            return res.status(404).json({
                msg: 'El usuario no tiene carrito'
            });
        }

        res.json({
            msg: 'Producto eliminado del carrito',
            data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'No se pudo eliminar el producto del carrito'
        });
    }
};

const clearCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const data = await dbClearCart(userId);
        if (!data) {
            return res.status(404).json({
                msg: 'Carrito no encontrado'
            });
        }
        res.json({
            msg: 'Carrito vaciado correctamente',
            data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'No se pudo vaciar el carrito'
        });
    }
};

export { getCart, getCartById, createCart, updateCart, DeleteCart, addItemToCart, removeItemFromCart, clearCart };