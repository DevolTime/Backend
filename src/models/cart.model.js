import { Schema, model } from "mongoose";

const Cartschema = new Schema({
    user: String,
    product: String,
    quantity: {
        type: Number,
        default: 1
    }, 
    createBy: {
        type : Schema.Types.ObjectId,
        ref: "user"
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