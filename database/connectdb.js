import mongoose from "mongoose";
import 'dotenv/config'


const MONGODB_HOST = process.env.MONGODB_HOST;
const MONGODB_DATABASE = process.env.MONGODB_DATABASE
const MONGODB_URI = `mongodb://${MONGODB_HOST}/${MONGODB_DATABASE}`
console.log(MONGODB_URI);
try {
    await mongoose.set('strictQuery', true);
    await mongoose.connect(MONGODB_URI, {});
    console.log("Conectado");
} catch (error) {
    console.log(`Error ${error}`);
    
};

