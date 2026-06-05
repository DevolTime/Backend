import storemodel from "../models/stores.model.js";

const dbnewStore = async (newStore) => {
   return await storemodel.create(newStore);
}

const dbupdateStore = async (id, inputData) => {
   return await storemodel.findByIdAndUpdate(id, inputData)
}
const dbgetStore = async () => {
   return await storemodel.find();
}
const dbdeleteStore = async (id) => {
   return await storemodel.findOneAndDelete(id)
}
export {
   dbdeleteStore,
   dbgetStore,
   dbnewStore,
   dbupdateStore
}