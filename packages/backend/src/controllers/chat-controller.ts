import ChatItem from "@my-todo-app/shared";
import express, { Router, Request, Response } from "express";
import { loadItemById, loadChats, saveChat } from "../services/chat-services";


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

export default chatController