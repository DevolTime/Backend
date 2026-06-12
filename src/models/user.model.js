import { Schema, model } from "mongoose";
import { AllOWEB_ROLES, ROLES } from "../config/global.config.js";

// 1era parte para definir el esquema 

const userShema = new Schema({

    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },

    password: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase:true,
    

    },
    status: {
        type: String,
        enum: [`disponible`, `no disponible`, `pendiente`],
        default: `disponible`
    },
    avatar :{
        type: String,
        default:''
    },
    createBy: {
        type : Schema.Types.ObjectId,
        ref: "user"
    },
    role:{
        type: String,
        required : true,
        enum:AllOWEB_ROLES,
        default :ROLES.SUBSCRIBER

    }

}, {
    versionKey: false,
    timestamps: true,
});

//2da parte definir el modelo 
const usermodel = model(`user`, userShema);


export default usermodel;