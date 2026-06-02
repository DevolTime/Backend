import storemodel from "../models/stores.model.js";
import { dbdeleteStore, dbgetStore, dbnewStore, dbupdateStore } from "../services/stores.services.js";
const newStore = async (req, res) => {
    try {
        const inputData = req.body
        const data = await dbnewStore(inputData)
        res.json({
            msg: 'nueva tienda',
            data: data
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg: 'no se registro nueva tienda'
        })
    }
}
const updateStore = async (req, res) => {
    try {
        const id = req.params.idstore
        const inputData = req.body
        const data = await dbupdateStore(id, inputData)
        res.json({
            msg: 'actualiza la nueva sucursal ienda',
            data: data
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg: 'no se actualizo nueva tienda'
        })
    }
}
const getStore = async (req, res) => {
    try {
        const data = await dbgetStore()
        res.json({
            msg: 'listado de tiendas',
            data: data
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg: 'no se Obtener infromacion de las tiendas'
        });
    }

}
const deleteStore = async (req, res) => {
    try {
        const id = req.params.idstore
        const data = await dbdeleteStore(id);

        res.json({
            msg: 'eliminar sucursal',
            data: data
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg: 'no se pudo eliminar la sucursal'
        });

    }
}

export {
    newStore,
    updateStore,
    getStore,
    deleteStore
}