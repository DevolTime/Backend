import { model, Schema } from "mongoose";
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
        enum: ['abierto', 'cerrado'],
        default: 'abierto'
    },
    createBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, {
    versionKey: false,
    timestamps: true,

})
const storemodel = model('store', storeShema)

export default storemodel