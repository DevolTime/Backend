import ProductModel from "../models/Product.models.js";
import { dbGetproducts, dbDeleteproducts, insertproduct, dbGetproductsById, } from '../service/product.service.js'

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
    const data = await dbGetproductsById(id);
    res.json({
        msg: ("obtiene un producto por id"),
        data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json ({
            msg:"error al"
        });

    }
   

    
}

const patchproducts = async (req, res) => {
    try {
        const id = req.params.id; //id de la ruta para encontrar el documento que quiero actualizar 

        const inputData = req.body; // obteniendo el objeto con el /los parametros que quiero actualizar
        const data = await ProductModel.findByIdAndUpdate(id, inputData, { new: true });
        res.json({
            msg: "actualizar productos",
            data: data
        });

    } catch (error) {
        console.error(error)
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