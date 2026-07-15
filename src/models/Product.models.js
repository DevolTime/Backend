import { model, Schema } from "mongoose";

// 1ira parte: definir el esquema 
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 12
    },
    description: String,
    price: {
        type: Number,
        default: 0,
        min: 0

    },

    status: {
        type: String,
        enum: ["disponible", "no disponible", "refactorizado", "pendiente", "enviado"],
        default: "disponible"

    },
    createBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }


}, {
    versionKey: false,
    timestamps: true
});

// 2da parte : definir el modelo 

const ProductModel = model("product", //define el nombre d el acoleccion que almacenara el objeto creado con este schema
    ProductSchema // asocia la estructura de datos a la coleccion 
);

export default ProductModel;
