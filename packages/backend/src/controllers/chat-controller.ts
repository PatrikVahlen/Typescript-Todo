import { ChatItem, User } from "@my-todo-app/shared";
import express, { Request, Response } from "express";
import { loadItemById, loadChats, saveChat, saveUser, loginUser, verifyToken } from "../services/chat-services";
import { UserModel } from "../models/chat-repository";

const chatController = express.Router()

chatController.get('/', async (req: Request, res: Response<ChatItem[]>) => {
    res.send(await loadChats());
});

chatController.get('/:chatId', async (req: Request, res: Response<ChatItem>) => {
    try {
        res.send(await loadItemById(req.params.chatId));
    } catch (e) {
        res.sendStatus(404)
    }

});

chatController.post('/', async (req: Request<ChatItem>, res: Response<ChatItem[]>) => {
    try {
        res.send(await saveChat(req.body))
    } catch (e) {
        res.sendStatus(400)
    }
});

chatController.post('/register', async (req: Request<User>, res: Response) => {

    const { name, password } = req.body;
    const result = await UserModel.findOne({ name: name })

    if (result || !name || !password || typeof name !== "string" || typeof password !== "string") {
        res.sendStatus(404);
        return;
    }

    try {
        await saveUser(req.body);
        res.sendStatus(200)
    } catch (e) {
        res.sendStatus(400)
    }

});

chatController.post("/login", async (req: Request<User>, res: Response) => {

    const { name, password } = req.body;
    if (!name || !password || typeof name !== "string" || typeof password !== "string") {
        res.sendStatus(404);
        return;
    }

    try {
        res.send(await loginUser(req.body));

    } catch (e) {
        res.sendStatus(400)
    }

});

chatController.post("/user", async (req: Request, res: Response) => {
    try {
        res.send(await verifyToken(req.body));

    } catch (e) {
        res.sendStatus(400)
    }
});

export default chatController