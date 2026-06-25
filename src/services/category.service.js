// Service: su responsabilidad es hablarse con al base de datos

import CategoryModel from "../models/Category.model.js"

const dbCreateCategory = async (newCategory) => {
    return await CategoryModel.create(newCategory)
}

const dbGetCategory = async () => {
    return await CategoryModel.find();
}

const dbDeleteCategory = async (id) => {
    return await CategoryModel.findOneAndDelete(id)
}

const dbUpdateCategory = async (id, inputData) => {
    return await CategoryModel.findByIdAndUpdate(id, inputData, { new: true });
}

const dbGetCategoryById = async (id) => {
    return await CategoryModel.findById(id);
}

export {
    dbCreateCategory, dbGetCategory, dbDeleteCategory, dbUpdateCategory, dbGetCategoryById
}; 