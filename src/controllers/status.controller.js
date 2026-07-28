import dbGetStatus from "../services/status.service.js"

const getStatus = (req, res) =>{
    const status =dbGetStatus()

    const allowed_status = dbGetStatus()
    res.json({
        msg:'obtiene el estados definido', data:status
    })
}
export default getStatus