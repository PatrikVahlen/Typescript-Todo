import express, { Application, json } from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import { setupMongoDB } from "./models/chat-repository"
import chatController from "./controllers/chat-controller"
import passport from "passport";

dotenv.config();

const app: Application = express()
app.use(cors())
app.use(json())
const mongoURL: string = process.env.MONGODB_URL || "mongodb://localhost:27017/myChats"
const port: number = parseInt(process.env.PORT || "3000")

app.use("/chat", chatController)
app.use(passport.initialize)
app.use(passport.session())

app.listen(4000, async function () {
    await setupMongoDB(mongoURL)
    console.log(`App is listening on port ${4000} !`)
})
