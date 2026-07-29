import dbGetRoles from "../services/roles.service.js"

const getRoles = (req, res) =>{

    const roles = dbGetRoles()

    const allowed_roles = dbGetRoles()
     res.json({
        msg: 'obtiene todos los roles definidos para la aplicacion',data:roles
    })
}

export default getRoles