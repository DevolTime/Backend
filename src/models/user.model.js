import {   Schema, model} from "mongoose";

// 1era parte para definir el esquema 

const userShema = new Schema({
    id:{
        type:String,
        unique:true

    },
    name :{
        type: String,
        required: true 
    },
    lastname :{
        type: String,
        required: true 
    },
    
    password:{
        type:String,
        trim:true,
    },
    email:{
        type: String,
        unique:true

    },
    status:{
        type: String,
        enum :[`disponible`,`no disponible`,`pendiente`],
        default:`disponible`
    }

},{
    versionKey: false,
    timestamps: true,
});

//2da parte definir el modelo 
const usermodel = model (`user`,userShema);


export default usermodel;