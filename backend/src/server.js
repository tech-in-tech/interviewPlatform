import express from 'express'
import { ENV } from './lib/env.js'
import path from "path";
import cors from 'cors'
import { clerkMiddleware } from '@clerk/express'
import {serve} from 'inngest/express'
import { connectDB } from './lib/db.js';
import { inngest,functions } from './lib/inngest.js';
// import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js"

  

const app = express();

const __dirname = path.resolve()

// moiddlewares 
app.use(express.json())
// 
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))

app.use(clerkMiddleware()) // this adds auth field to request object : req.auth() 

app.use("/api/inngest",serve({client:inngest,functions}))

app.use("/api/chat",chatRoutes)

app.get('/health', (req, res) => {
  res.status(200).json({ msg: "api is up and running" })
})






// make our app redy for deployment
if (ENV.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  })
}



const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => console.log(`server is running on port : ${ENV.PORT}`))
  } catch (error) {
    console.error("Error starting in server : ",error)
  }
}

startServer()