import ProductModel from "../models/Product.models.js";
import { insertproduct } from "../service/product.service.js";

const getproducts = (req, res) => {
    res.json({
        msg: "listar productos"
    });

}
const deleteproductos = (req, res) => {
    res.json({
        msg: "eliminar productos"
    })
}

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