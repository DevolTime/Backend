import { Schema } from "mongoose";
const storeShema = Schema({
_id:{
    type:String,
    unique:true
},
name:{
    type:String,
    require: true
},
city:{
    type:String,
    require:true
},
address:{
    type: String,
    require: true
},
phone:{
    type:Number,
    require:true
},
status:{
    type:String,
    enum :['abierto','cerrado'],
    default: 'abierto'

}

})
const storesmodel = ('stores', storesShema)

export default storeShema