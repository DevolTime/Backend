import mongoose from "mongoose";
 const DB_mongo =process.env.DB_URI ||'mongodb://localhost:27017/crunch'
async function crunchConnect() {
    try {
        await mongoose.connect(DB_mongo);
        console.log('conneted to MongoDB')
    } catch (error) {
        console.log(error);
        console.log(`Connect Failed!`)
    }
}

export default crunchConnect;