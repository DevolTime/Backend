import { model, Schema } from "mongoose";


const pedidosSchema = new Schema({

    name_usuario: {

        type: String,

        required: true

    },


    usuario_id: {

        type: String,

        default: "cliente"

    },


    direccion_entrega: {

        type: String,

        required: true,

        maxlength: 50

    },


    direccion_opcional: {

        type: String,

        default: "",

        maxlength: 50

    },


    barrio: {

        type: String,

        required: true,

        maxlength: 20

    },


    telefeno: {

        type: String,

        required: true,

        maxlength: 15

    },


    productos: {

        type: String,

        required: true

    },


    precio_total: {

        type: Number,

        required: true,

        min: 0

    },


    status: {

        type: String,

        enum: [

            "Pendiente",
            "pendiente",
            "Confirmado",
            "confirmado",
            "En preparación",
            "Listo para recoger",
            "En camino",
            "Entregado",
            "entregado",
            "Pedido retrasado",
            "Pedido cancelado",
            "disponible",
            "no disponible",
            "refactorizar",
            "enviado"

        ],

        default: "Pendiente"

    },


    identificacion_pedido: {

        type: Number,

        default: () => Date.now(),

        unique: true

    },


    tienda_id: {

        type: String,

        default: "crunch-chicken"

    },


    domiciliario_id: {

        type: String,

        default: null

    },


    createBy: {

        type: Schema.Types.ObjectId,

        ref: "user",

        default: null

    }

}, {

    versionKey: false,

    timestamps: true

});


const pedidosModel = model("Pedidos", pedidosSchema);


export default pedidosModel;