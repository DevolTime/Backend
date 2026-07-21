import { model, Schema } from "mongoose";

const pedidosSchema = new Schema({
    usuario_id: {
        type: String,
        required: true,

    },
     direccion_entrega: {
        type: String,
        required: true,
         maxLength: 50,
    },

    productos: {
        type: String,

        required: true,
    },
     precio_total: 

        default: null
    },

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

    identificacion_pedido: {
        type: Number,
        required: true
    },


    tienda_id: {
        type: String,
        required: true

    },
    domiciliario_id: {
        type: String,
        default: null
    },
    
    createBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, {
    versionKey: false,
    timestamps: true
});


const pedidosModel = model("Pedidos", pedidosSchema);
export default pedidosModel;