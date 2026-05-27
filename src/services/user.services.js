import usermodel from "../models/user.model.js"

const insertUser= async(newUser)=>{
 return await usermodel.create(newUser)
}
const dbgetUsers = async ()=> {
    return await usermodel.find();
}

export{
    dbgetUsers,
    insertUser
}