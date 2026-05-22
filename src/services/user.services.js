import usermodel from "../models/user.model.js"

const insertUser= async(newUser)=>{
 return await usermodel.create(newUser)
}


export{
    insertUser
}