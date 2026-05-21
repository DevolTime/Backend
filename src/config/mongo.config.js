import mongoose from "mongoose";

async function crunchConnect (){
    try{
    await mongoose.connect('mongodb://localhost:27017/crunch');
    console.log('conneted to MongoDB')
    } catch (error){
        console.log(error);
        console.log(`Connect Failed!`)
    }
}

export default crunchConnect;