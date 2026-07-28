import { model, Schema } from "mongoose";
import { AllOWED_STATUS, STATUS } from "../config/status.config.js";
const storeShema = new Schema({
    name: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    status: {
        type: String,
                required:true,
                enum: AllOWED_STATUS,
                default: STATUS.DISPONIBLE
    },
    createBy: {
            type : Schema.Types.ObjectId,
            ref: "user"
        }
}, {
    versionKey: false,
    timestamps: true,

})
const storemodel = model('store', storeShema)

export default storemodel