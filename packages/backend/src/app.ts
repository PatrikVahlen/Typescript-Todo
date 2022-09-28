import express, { Application, json } from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import { setupMongoDB } from "./models/todos-repository"
import todosController from "./controllers/todos-controller"

dotenv.config();

const app: Application = express()
app.use(cors()) //TODO Configure the CORS properly to make the app secure.
app.use(json())
const mongoURL: string = process.env.MONGO_URL || "mongodb://localhost:27017/mytodos"
const port: number = parseInt(process.env.SERVER_PORT || "3001")

app.use("/todos", todosController)

app.listen(port, async function () {
    await setupMongoDB(mongoURL)
    console.log(`App is listening on port ${port} !`)
})
