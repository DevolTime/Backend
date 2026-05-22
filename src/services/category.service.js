// Service: su responsabilidad es hablarse con al base de datos

import CategoryModel from "../models/Category.model.js"

const insertCategory = async (newCategory) => {
    return await CategoryModel.create(newCategory)
}

export {
    insertCategory
}