import storemodel from "../models/stores.model.js";
 
const dbnewStore = async (newStore)=>{
    return await storemodel.create(newStore);
}

const dbupdateStore =async (id, inputData)=>{
    return await storemodel.findByIdAndUpdate({_id:id}, inputData)
}
 const dbgetStore = async ()=>{
    return await storemodel.find();
 }
 const dbdeleteStore = async (id)=>{
    return await storemodel.findOneAndDelete({_id:id})
 }
 export{
    dbdeleteStore,
    dbgetStore,
    dbnewStore,
    dbupdateStore
 }