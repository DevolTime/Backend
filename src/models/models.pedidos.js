import { model, Schema } from "mongoose";

const pedidosSchema = new Schema({
    usuario_id: {
        type: String,
        required: true,

    },
    tienda_id: {
        type: String,
        required: true

    },
    domiciliario_id: {
        type: String,
        default: null
    },precio_total: 
    {
        type: Number,   
        required: true,
        min: 0
    },

    status: {
        type: String,
        enum: ["Pendiente",
            "Confirmado",
            "En preparación", "Listo para recoger", "En camino", "Entregado", "Pedido retrasado", "Pedido cancelado"],
        default: "Pendiente"

    },
    direccion_entrega: {
        type: String,
        required: true,
        // maxLength: 200,

    },
    createBy: {
        type : Schema.Types.ObjectId,
        ref: "user"
    }
}, {
    versionKey: false,
    timestamps: true
});


const pedidosModel = model ("Pedidos", pedidosSchema);
export default pedidosModel;