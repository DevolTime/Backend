import { Schema, model } from "mongoose";

const Cartschema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    items: [{
        product: {
            type: String,
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: {
            type: Number,
        }
    }],
    createBy: {
        type: Schema.Types.ObjectId,
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