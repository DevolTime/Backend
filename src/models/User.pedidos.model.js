import { model, Schema } from "mongoose";

const pedidosUserSchema = new Schema({
    name_usuario: {
        type: String,
        required: true,
    },
    direccion_entrega: {
        type: String,
        required: true,
        maxLength: 50,
    },
    direccion_opcional: {
        type: String,
        required: true,
        maxLength: 50,
    },
    barrio: {
        type: String,
        required: true,
        maxLength: 20,
    },
 
    telefeno: {
        type: Number,
        required: true,
        maxLength: 10,
    },

    productos: {
        type: String,
    },
    precio_total: {
        type: Number,
    },
    // status: {
    //     type: String,
    //     enum: ["Pendiente",
    //         "Confirmado",
    //         "En preparación", "Listo para recoger", "En camino", "Entregado", "Pedido retrasado", "Pedido cancelado"],
    //     default: "Pendiente"
    // }
}, {
    versionKey: false,
    timestamps: true
});


const pedidosUserModel = model("PedidosUser", pedidosUserSchema);
export default pedidosUserModel;