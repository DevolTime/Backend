import { Schema, model } from "mongoose";
import { AllOWED_ROLES, ROLES } from "../config/global.config.js";
import { AllOWED_STATUS, STATUS } from "../config/status.config.js";

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
        required : true
    },
    confirmPassword: {
        type: String,
        trim: true,
        required : true
    },
    email: {
        type: String,
        unique: true,
        lowercase:true,
    

    },
    status: {
        type: String,
        enum: AllOWED_STATUS,
        default: STATUS.DISPONIBLE
    },
    avatar :{
     type: String,
        default:''
    },
    // createBy: {
    //     type : Schema.Types.ObjectId,
    //     ref: "user"
    // },
    role:{
        type: String,
        enum:AllOWED_ROLES,
        default :ROLES.SUBSCRIBER

    }

}, {
    versionKey: false,
    timestamps: true,
});

//2da parte definir el modelo 
const usermodel = model(`user`, userShema);


export default usermodel;