import { model, Schema } from "mongoose";
import { ALLOWED_PRODUCT_STATUS, PRODUCT_STATUS } from "../config/global.config.js";


// 1ira parte: definir el esquema 
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 4
    },
    description: String,
    price: {
        type: Number,
        default: 0,
        min: 0
    },
    status: {
        type: String,
        enum: ALLOWED_PRODUCT_STATUS,
        default: PRODUCT_STATUS.AVAIABLE
    },
    createBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
}, {
    versionKey: false,
    timestamps: true
});

// 2da parte : definir el modelo 

const ProductModel = model("product", //define el nombre d el acoleccion que almacenara el objeto creado con este schema
    ProductSchema // asocia la estructura de datos a la coleccion 
);

export default ProductModel;
