import pedidosModel from "../models/models.pedidos.js";


// ==========================================
// OBTENER TODOS LOS PEDIDOS
// ==========================================

const getPedido = async (req, res) => {
    try {

        const data = await pedidosModel.find();

        res.status(200).json({
            msg: "obtener todos los pedidos",
            data: data
        });

    } catch (error) {

        console.error("ERROR GET PEDIDOS:", error);

        res.status(500).json({
            msg: "Error al obtener los pedidos",
            error: error.message
        });

    }
};


// ==========================================
// CREAR PEDIDO
// ==========================================

const createPedido = async (req, res) => {

    try {

        console.log("BODY RECIBIDO:", req.body);

        const {
            name_usuario,
            direccion_entrega,
            direccion_opcional,
            barrio,
            telefeno,
            productos,
            precio_total,
            status
        } = req.body;


        const nuevoPedido = new pedidosModel({

            name_usuario: name_usuario,

            usuario_id: "cliente",

            direccion_entrega: direccion_entrega,

            direccion_opcional: direccion_opcional || "",

            barrio: barrio,

            telefeno: Number(telefeno),

            productos: productos,

            precio_total: Number(precio_total),

            status: status || "Pendiente",

            identificacion_pedido: Date.now(),

            tienda_id: "crunch-chicken",

            domiciliario_id: null

        });


        const data = await nuevoPedido.save();


        console.log("PEDIDO GUARDADO:", data);


        res.status(201).json({

            msg: "Pedido creado correctamente",

            data: data

        });


    } catch (error) {

        console.error("ERROR CREANDO PEDIDO:", error);

        res.status(500).json({

            msg: "Error al crear el pedido",

            error: error.message

        });

    }
};


// ==========================================
// ELIMINAR PEDIDO
// ==========================================

const deletePedido = async (req, res) => {

    try {

        const { id } = req.params;

        const data = await pedidosModel.findByIdAndDelete(id);

        if (!data) {

            return res.status(404).json({
                msg: "Pedido no encontrado"
            });

        }

        res.status(200).json({

            msg: "Pedido eliminado correctamente",

            data: data

        });

    } catch (error) {

        console.error("ERROR ELIMINANDO:", error);

        res.status(500).json({

            msg: "Error al eliminar el pedido",

            error: error.message

        });

    }
};


// ==========================================
// ACTUALIZAR PEDIDO
// ==========================================

const updatePedido = async (req, res) => {

    try {

        const { id } = req.params;

        const data = await pedidosModel.findByIdAndUpdate(

            id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );


        if (!data) {

            return res.status(404).json({
                msg: "Pedido no encontrado"
            });

        }


        res.status(200).json({

            msg: "Pedido actualizado correctamente",

            data: data

        });


    } catch (error) {

        console.error("ERROR ACTUALIZANDO:", error);

        res.status(500).json({

            msg: "Error al actualizar el pedido",

            error: error.message

        });

    }
};


export {
    getPedido,
    createPedido,
    deletePedido,
    updatePedido
};