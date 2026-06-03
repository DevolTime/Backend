import CartModel from "../models/cart.model.js";

const dbCreateCart = async (newCart) => {
    return await CartModel.create(newCart);
};

const dbGetCart = async () => {
    return await CartModel.find()
};

const dbGetCartById = async (id) => {
    return await CartModel.findOne(id)
};

const dbUpdateCart = async (id, inputData) => {
    return await CartModel.findByIdAndUpdate(id, inputData, { new: true })
};

const dbDeleteCart = async (id) => {
    return await CartModel.findByIdAndDelete(id )
}

export { dbCreateCart, dbGetCart, dbGetCartById, dbUpdateCart, dbDeleteCart }