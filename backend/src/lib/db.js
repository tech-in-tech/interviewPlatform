import mongoose from "mongoose";

import {ENV} from './env.js'

export const connectDB = async()=>{
  try {
    if(!ENV.DB_URL){
      throw new Error("DB_URL is not define in environment variable")
    }
    const conn = await mongoose.connect(ENV.DB_URL)
    console.log(`connected to mongodb : ${conn.connection.host}`)
  } catch (error) {
    console.error("Error in connecting to Mongodb : ",error)
    process.exit(1);
  }
}