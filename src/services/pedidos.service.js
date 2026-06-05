import pedidosModel from "../models/models.pedidos.js"

const createpedido = async (newpedido) => {
    return await pedidosModel.create(newpedido);
}
const getpedido = async () => {
    return await pedidosModel.find();
}

const deletepedido = async (id) => {
    return await pedidosModel.findOneAndDelete(id);
    return await pedidosModel.findByIdAndDelete(id);
}
const updatepedido = async (id) => {
    return await pedidosModel.findByIdAndUpdate(id,)
}

export {
    createpedido, getpedido, deletepedido, updatepedido
}