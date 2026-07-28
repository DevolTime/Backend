import { AllOWED_STATUS, STATUS_LABELS } from "../config/status.config.js"

const dbGetStatus=()=>{
    return AllOWED_STATUS.map((status)=>{
        return{
            id:status,
            name:STATUS_LABELS[status]
        }
    })
}
export default dbGetStatus