import usermodel from "../models/user.model.js"

const dbnewUser= async(newUser)=>{
 return await usermodel.create(newUser)
}
const dbgetUsers = async ()=> {
    return await usermodel.find();
}

const dbdeleteUser = async (id)=>{
   return await usermodel.findOneAndDelete({ _id:id});
   return await usermodel.findByIdAndDelete(id);

}
 const dbupdateUser = async (id, inputData) =>{
     return await usermodel.findByIdAndUpdate(id, inputData)
 }


export{
    dbgetUsers,
    dbnewUser,
    dbdeleteUser,
    dbupdateUser
}