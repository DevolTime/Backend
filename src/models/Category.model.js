import { Schema, model } from "mongoose";

// Primera parte: Definir esquema

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        trim: true
    },
    description: String,
    stock: {
        type: Number,
        default: 1,
        min: 1
    },
    image: {
        type: String,
        default: null
    },
    status: {
        type: Boolean,
        default: true,
    }
}, {versionKey:false,
    timestamps: true,
});


// Segunda parte: Definir el model

const CategoryModel = model(
    'Category',             // Category defiene la coleccion que almacena este schema, 
    CategorySchema);        // Asocia la estructura de datos a la coleecion.


export default CategoryModel;
