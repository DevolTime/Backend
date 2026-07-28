import { Schema, model } from "mongoose";


// 2. DEFINICIÓN DEL ESQUEMA (Estructura de la colección)
const CategorySchema = new Schema({
    // Nombre de la categoría con validaciones estrictas
    name: {
        type: String,
        required: [true, 'El nombre de la categoria es obligatorio.'],
        minLength: [3, 'El nombre debe contener al menos 3 caracteres.'],
        trim: true,  // Remueve espacios vacíos al principio y al final
        unique: true // Garantiza que no existan categorías duplicadas en la DB
    },

    // URL o ruta estática de la imagen procesada previamente por Multer
    urlImage: {
        type: String,
        default: null
    },

    // Estado lógico de la categoría (Habilitada / Deshabilitada)
    status: {
        type: Boolean,
        default: true,
    },

    // Referencia al usuario creador (Relación con la colección de usuarios)
    createdBy: {
        type: Schema.Types.ObjectId, // Tipo ID especial de MongoDB
        ref: 'user',                 // Modelo con el que se relaciona
        required: false
    }
}, {
    versionKey: false, // Desactiva el campo __v interno de Mongoose
    timestamps: true,  // Agrega automáticamente los campos createdAt y updatedAt
});



// 3. COMPILACIÓN Y EXPORTACIÓN DEL MODELO
// Mongoose asociará el modelo 'Category' a la colección 'categories' en MongoDB
const CategoryModel = model('Category', CategorySchema);
export default CategoryModel;