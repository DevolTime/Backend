import ProductModel from "../models/Product.models.js"

const insertproduct = async (newProduct) => {
    return await ProductModel.create(newProduct);

}
const dbGetproducts = async () => {
    return await ProductModel.find();
}
const dbGetproductsById = async (id) => {
    return await ProductModel.findById(id);
}

const dbDeleteproducts = async (id) => {
    // return await ProductModel.findOneAndDelete(id);
    return await ProductModel.findByIdAndDelete(id);

}

const dbUpdateproducts = async (id, inputData) => {
    return await ProductModel.findByIdAndUpdate(id, inputData)
}
export {
    insertproduct, dbGetproducts, dbDeleteproducts, dbGetproductsById
}