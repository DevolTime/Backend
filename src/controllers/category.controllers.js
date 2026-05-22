import CategoryModel from "../models/Category.model.js"

const getCategory = (req, res) => {
    res.json({
        msg: 'lista categorias'
    })
}

const deleteCategory = (req, res) => {
    res.json({
        msg: 'Eliminar una categorias'
    })
}

const updateCategory = (req , res) => {
    res.json({
        msg: 'Actualiza una categorias'
    })
}

const createCategory = async (req , res) => {
    // Obtengo los datos enviados en la peticion.
    const inputData = req.body;

    // Registra usando modelo y guarda la respeusta en la contante data.
    const categoryCreated = await CategoryModel.create(inputData);

    // Respondemos al clente enviando los datos registrados.
    res.json({
        Data: categoryCreated
    })
}

export { getCategory , deleteCategory, updateCategory, createCategory}