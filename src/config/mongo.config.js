import mongoose from "mongoose";
const DB_mongo = process.env.DB_URI
async function crunchConnect() {
    try {
        await mongoose.connect(DB_mongo);
        console.log('🟢 Connected to MongoDB');
    } catch (error) {
        console.error('🔴 Connect Failed!', error);
        process.exit(1);
    }
}

export default crunchConnect;