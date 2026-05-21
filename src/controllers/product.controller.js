const getproducts = (req, res) => {
    res.json ({
        msg : "listar productos"
    }) ;

}
const deleteproductos = (req, res) => {
    res.json ({
        msg : "eliminar productos"
    })
}

const postproducts = (req, res ) => {
    res.json ({
        msg : "crear productos"
    })
}
const patchproducts = (req, res ) => {
    res.json ({
        msg : "actualizar productos"
    })
} 

export {
    getproducts,
    deleteproductos,
    postproducts,
    patchproducts
}