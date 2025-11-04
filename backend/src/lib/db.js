import mongoose from "mongoose";

import {ENV} from './env.js'

export const connectDB = async()=>{
  try {
    const conn = await mongoose.connect(ENV.DB_URL)
    console.log(`connected to mongodb : ${conn.connection.host}`)
  } catch (error) {
    console.error("Error in connecting to Mongodb : ",error)
    process.exit(1);
  }
}