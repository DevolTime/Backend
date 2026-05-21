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

const createCategory = (req , res) => {
    res.json({
        msg: 'Crea una categorias'
    })
}

export { getCategory , deleteCategory, updateCategory, createCategory}