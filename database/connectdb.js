import mongoose from "mongoose";

try {
    await mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.URI_MONGO);
    console.log("Conectado");
} catch (error) {
    console.log(`Error ${error}`);
    
};