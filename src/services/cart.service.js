import CartModel from "../models/cart.model.js";
import ProductModel from "../models/Product.models.js";

const dbCreateCart = async (newCart) => {
    return await CartModel.create(newCart);
};

const dbGetCart = async (userId) => {
    return await CartModel.findOne({ user: userId })
        .populate('items.product');
};

const dbGetCartById = async (id) => {
    return await CartModel.findById(id)
        .populate('items.product');
};

const dbUpdateCart = async (id, inputData) => {
    return await CartModel.findByIdAndUpdate(
        id,
        inputData,
        {
            new: true,
            runValidators: true
        }
    );
};

const dbDeleteCart = async (id) => {
    return await CartModel.findByIdAndDelete(id);
};


// AGREGAR PRODUCTO AL CARRITO
const dbAddItemToCart = async (userId, productId) => {

    // 1. Buscar producto
    const product = await ProductModel.findById(productId);

    if (!product) {
        throw new Error('PRODUCT_NOT_FOUND');
    }

    // 2. Buscar carrito del usuario
    let cart = await CartModel.findOne({ user: userId });

    // 3. Si no existe, crear carrito
    if (!cart) {
        cart = await CartModel.create({
            user: userId,
            items: []
        });
    }

    // 4. Buscar si el producto ya está en el carrito
    const existingItem = cart.items.find(
        item => item.product.toString() === productId.toString()
    );

    if (existingItem) {

        // Si ya existe, aumentar cantidad
        existingItem.quantity += 1;

    } else {

        // Si no existe, agregarlo
        cart.items.push({
            product: product._id,
            quantity: 1,
            price: product.price
        });
    }

    // 5. Guardar carrito
    await cart.save();

    // 6. Devolver carrito con información del producto
    return await CartModel.findById(cart._id)
        .populate('items.product');
};

const dbRemoveItemFromCart = async (userId, productId) => {
    const cart = await CartModel.findOne({ user: userId });

    if (!cart) {
        return null;
    }

    cart.items = cart.items.filter(
        item => item.product.toString() !== productId.toString()
    );

    await cart.save();

    return await CartModel.findById(cart._id)
        .populate('items.product');
};

const dbClearCart = async (userId) => {
    return await CartModel.findOneAndUpdate(
        { user: userId },
        { $set: { items: [] } },
        { new: true }
    );
};

export {
    dbCreateCart,
    dbGetCart,
    dbGetCartById,
    dbUpdateCart,
    dbDeleteCart,
    dbAddItemToCart,
    dbRemoveItemFromCart,
    dbClearCart
};