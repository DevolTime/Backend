import fs from 'fs';
import path from 'path';
import mongoose from "mongoose";
import ProductModel from "../models/Product.models.js";
import { dbGetproducts, dbDeleteproducts, insertproduct, dbGetproductsById } from '../services/product.service.js';

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

        // Validar primero si el ID es válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "el ID proporcionado no se ha podido eliminar porque es invalido"
            });
        }

        // 1. Buscar el producto antes de borrarlo para obtener la ruta de la imagen
        const productToDelete = await dbGetproductsById(id);

        if (!productToDelete) {
            return res.status(404).json({
                msg: "No se puede eliminar un producto que no se encuentra registrado"
            });
        }

        // 2. Si tiene una imagen asociada, borrarla físicamente del servidor
        if (productToDelete.urlImage) {
            const fileName = productToDelete.urlImage.split('/uploads/products/')[1];

            if (fileName) {
                const filePath = path.join(process.cwd(), 'uploads', 'products', fileName);

                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('⚠️ No se pudo eliminar la imagen del servidor:', err.message);
                    } else {
                        console.log('🗑️ Imagen borrada del servidor al eliminar el producto:', fileName);
                    }
                });
            }
        }

        // 3. Eliminar el registro en la base de datos
        const data = await dbDeleteproducts(id);

        res.json({
            msg: "Producto e imagen eliminados correctamente",
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "error al eliminar el producto"
        });
    }
};

const postproducts = async (req, res) => {
    try {
        const inputData = { ...req.body };

        if (req.file) {
            inputData.urlImage =
                `${req.protocol}://${req.get('host')}/uploads/products/${req.file.filename}`;
        }

        const data = await insertproduct(inputData);

        res.status(201).json({
            msg: "Producto creado exitosamente",
            data
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error al registrar el producto",
            error: error.message
        });
    }
};

const getproductsById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "el ID proporcionado es invalido"
            });
        }

        const data = await dbGetproductsById(id);

        if (!data) {
            return res.status(404).json({
                msg: "No se encontró el producto"
            });
        }

        res.json({
            msg: "obtiene un producto por id",
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "error al buscar el producto"
        });
    }
};

const patchproducts = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = { ...req.body };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "no se pudo actualizar el producto porque el ID es invalido"
            });
        }
        // Si se subió una nueva imagen, eliminar la anterior
        if (req.file) {
            const oldProduct = await dbGetproductsById(id);

            if (oldProduct && oldProduct.urlImage) {
                const oldFileName = oldProduct.urlImage.split('/uploads/products/')[1];

                if (oldFileName) {
                    const oldFilePath = path.join(process.cwd(), 'uploads', 'products', oldFileName);

                    fs.unlink(oldFilePath, (err) => {
                        if (err) {
                            console.error('⚠️ No se pudo eliminar la imagen anterior:', err.message);
                        } else {
                            console.log('🗑️ Imagen anterior eliminada con éxito:', oldFileName);
                        }
                    });
                }
            }

            inputData.urlImage = `${req.protocol}://${req.get('host')}/uploads/products/${req.file.filename}`;
        }

        const data = await ProductModel.findByIdAndUpdate(id, inputData, { new: true });

        if (!data) {
            return res.status(404).json({
                msg: "No se encontró el producto para actualizar"
            });
        }

        res.json({
            msg: "actualizar productos",
            data: data
        });

    } catch (error) {
        console.error(error);
        if (error.name === "CastError") {
            return res.status(400).json({
                msg: "no se pudo actualizar el producto porque el ID es invalido"
            });
        }
        res.status(500).json({
            msg: "Error al actualizar el producto"
        });
    }
};

export {
    getproducts,
    deleteproductos,
    postproducts,
    patchproducts,
    getproductsById
};