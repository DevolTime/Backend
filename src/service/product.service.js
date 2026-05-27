import ProductModel from "../models/Product.models.js"

const insertproduct = async (newProduct)=>{
    return await ProductModel.create (newProduct);

}
const dbGetproducts = async ()=> {
    return await ProductModel.find ();
}
const dbDeleteproducts = async (id) => {
    return await ProductModel.findOneAndDelete({_id: id});
    return await ProductModel.findByIdAndDelete(id);
    
}

const dbUpdateproducts = async (id, inputData) => {
    return await ProductModel.findByIdAndUpdate(id, inputdata)
}
export {
    insertproduct, dbGetproducts, dbDeleteproducts, 
}