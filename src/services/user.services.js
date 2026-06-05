import usermodel from "../models/user.model.js"

const dbnewUser = async (newUser) => {
    return await usermodel.create(newUser)
}
const dbgetUsers = async () => {
    return await usermodel.find();
}

const dbdeleteUser = async (id) => {
    return await usermodel.findOneAndDelete(id);
    return await usermodel.findByIdAndDelete(id);

}
const dbupdateUser = async (id, inputData) => {
    return await usermodel.findByIdAndUpdate(id, inputData)
}

const dbGetUserByEmail = async (email) => {
    if (!email) {throw new Error ('se olvido la propiedad email en el login')}

    
    return await usermodel.findOne({ email: email.toLowerCase() })
}
export {
    dbgetUsers,
    dbnewUser,
    dbdeleteUser,
    dbupdateUser,
    dbGetUserByEmail
}