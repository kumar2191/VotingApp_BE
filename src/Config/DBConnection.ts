import logger from "../Middleware/logger";
import mongoose from "mongoose";

const config=async()=>{
    try {
       mongoose.set('strictQuery', true);

  await mongoose.connect(process.env.DBPORT)
    console.log("DataBase Connected");
    
    
   } catch (error) {
   logger.error("error",error);
   }
}

export default config;