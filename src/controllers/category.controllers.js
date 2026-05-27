import { dbGetCategory, dbCreateCategory, dbDeleteCategory } from "../services/category.service.js"

const getCategory = async (req, res) => {

    try {
        const data = await dbGetCategory();

        res.json({
            msg: 'lista categorias',
            data: data
        })
    } catch (error) {
        console.error(error)

        res.status(500).json({
            msg: 'No se pudo encontrar la categoria'
        })
    };
};

const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await dbDeleteCategory(id);

        res.json({
            msg: 'Eliminar una categorias',
            data: data
        });
    } catch (error) {
        console.error(error)

        res.status(500).json({
            msg: 'No se pudo eliminar la Categoria'
        })
    }
};

const updateCategory = (req, res) => {
    res.json({
        msg: 'Actualiza una categorias'
    });
};

const createCategory = async (req, res) => {
    try {
        // Obtengo los datos enviados en la peticion.
        const inputData = req.body;

        // Registra usando modelo y guarda la respeusta en la contante data.
        const data = await dbCreateCategory(inputData);

        // Respondemos al clente enviando los datos registrados. El codigo de estado cuando se crea un recurso nuevo con exito.
        res.status(201).json({
            data: data
        });
    } catch (error) {
        console.error(error)  // para la consola (Desarrollador)

        //  Respondemos al cliente enviando un mensaje humano. El codigo de este estado cuando el server falla.
        res.status(500).json({
            msg: 'No se pudo registrar la categoria'
        });
    };
};

export { getCategory, deleteCategory, updateCategory, createCategory }