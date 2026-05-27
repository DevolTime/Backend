import ProductModel from "../models/Product.models.js";
import { dbDeleteproducts, insertproduct } from "../service/product.service.js";
import { dbGetproducts } from "../service/product.service.js";
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
const data = await dbDeleteproducts (id);

    res.json({
        msg: "eliminar productos",
        data : data

    });
    } catch (error) {
        console.error(error);
        res.status (500).json({
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
    res.status (500).json({
msg: "hola chao"
    })
    
   }


}
const patchproducts = (req, res) => {
    res.json({
        msg: "actualizar productos"
    })
}

export {
    getproducts,
    deleteproductos,
    postproducts,
    patchproducts
}