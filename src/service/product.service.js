import ProductModel from "../models/Product.models.js"

const insertproduct = async (newProduct)=>{
    return await ProductModel.create (newProduct);
}
export {
    insertproduct
}