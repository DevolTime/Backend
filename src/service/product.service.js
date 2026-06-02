import ProductModel from "../models/Product.models.js"

const insertproduct = async (newProduct)=>{
    return await ProductModel.create (newProduct);

}
const dbGetproducts = async (id) => {
    
    return await ProductModel.findOne({_id: id});
}
const dbGetproductsById = async (id) => {
    
    return await ProductModel.findOne ({_id: id});
}
const dbDeleteproducts = async (id) => {
    return await ProductModel.findOneAndDelete({_id: id});
    return await ProductModel.findByIdAndDelete(id);
    
}

const dbUpdateproducts = async (id, inputData) => {
    return await ProductModel.findByIdAndUpdate(id, inputdata)
}
export {
    insertproduct, dbGetproducts, dbDeleteproducts, dbGetproductsById
}