import { AllOWEB_STATUS, STATUS_LABELS } from "../config/status.config.js"

const dbGetStatus=()=>{
    return AllOWEB_STATUS.map((status)=>{
        return{
            id:status,
            name:STATUS_LABELS[status]
        }
    })
}
export default dbGetStatus