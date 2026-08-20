import { Schema, model } from "mongoose";

const CartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
            unique: true
        },

        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "product",
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                    min: 1
                },

                price: {
                    type: Number,
                    required: true,
                    min: 0
                }
            }
        ]
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const CartModel = model("Cart", CartSchema);

export default CartModel;