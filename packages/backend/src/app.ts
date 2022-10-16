import express, { Application, json } from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import { setupMongoDB } from "./models/chat-repository"
import chatController from "./controllers/chat-controller"

dotenv.config();

const app: Application = express()
app.use(cors())
app.use(json())
const mongoURL: string = process.env.MONGO_URL || "mongodb://localhost:27017/mytodos"
const port: number = parseInt(process.env.SERVER_PORT || "3001")

app.use("/chat", chatController)

app.listen(port, async function () {
    await setupMongoDB(mongoURL)
    console.log(`App is listening on port ${port} !`)
})
