import { Schema, model } from "mongoose";

// Primera parte: Definir esquema

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la categoria es obligatorio.'],
        minLength: [5, 'El nombre debe contener al menos 3 caracteres.'],
        trim: true,
        unique: true
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
    },
    createBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, {
    versionKey: false,
    timestamps: true,
});


// Segunda parte: Definir el model

const CategoryModel = model(
    'Category',             // Category defiene la coleccion que almacena este schema, 
    CategorySchema);        // Asocia la estructura de datos a la coleecion.


export default CategoryModel;
