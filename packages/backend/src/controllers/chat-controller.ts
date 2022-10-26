import { ChatItem, User } from "@my-todo-app/shared";
import express, { Router, Request, Response } from "express";
import { loadItemById, loadChats, saveChat } from "../services/chat-services";
import { UserModel } from "../models/chat-repository";
import bcrypt from "bcryptjs";


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
    const hashpassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new UserModel({
        name: req.body.name,
        password: hashpassword
    });
    await newUser.save();
    res.send("Success")
});

export default chatController