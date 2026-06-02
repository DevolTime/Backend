import pedidosModel  from "../models/models.pedidos.js";
import { createpedido, getpedido, deletepedido, updatepedido} from "../service/pedidos.service.js";
const getPedido = async  (req, res) => {
    try {
        const data = await getpedido ();
        res.json ({
            msg: "obtener todos los pedidos",
            data : data
        });
    } catch (error){
        console.error(error);
        res.status(500).json({
            msg: "Error al obtener los pedidos"
        });
    }
};
const deletePedido = async(req, res) => {
    try {
        const data = await getpedido ();
        res.json ({
            msg: "borrar todos los pedidos",
            data : data
        });
    } catch (error){
        console.error(error);
        res.status(500).json({
            msg: "Error al borrar los pedidos"
        });
}
};
const updatePedido = async (req, res) => {
    try{
        const data = await updatepedido ();
        res.json ({
            msg: "actualizar tods los pedidos"
        })
    } catch (error) {
        console.error (error);
        res.status (500).json ({
            msg: "Error al actualizar los pedidos"
        })
    }
};

const createPedido = async (req, res ) => {
    try{
        const data = await updatepedido ();
        res.json ({
            msg: "actualizar tods los pedidos"
        })
    } catch (error) {
        console.error (error);
        res.status (500).json ({
            msg: "Error al actualizar los pedidos"
        })
}
};

export {
    getPedido, createPedido, deletePedido, updatePedido
}