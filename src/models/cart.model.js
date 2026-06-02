import { Schema, model } from "mongoose";

const Cartschema = new Schema({
    user: String,
    product: String,
    quantity: {
        type: Number,
        default: 1
    }
},
    {
        versionKey: false,
        timestamps: true
    });

const CartModel = model(
    'Cart',
    Cartschema);

export default CartModel;