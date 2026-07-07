import dbGeproductstatus from "../services/roles.services.js";

const getRoles =  (req, res  ) => {
    const roles = dbGeproductstatus()

    res.json ({
        msg : "obtiene los roles definidos para la aplicacion",
        roles
    });
}

export default getRoles;