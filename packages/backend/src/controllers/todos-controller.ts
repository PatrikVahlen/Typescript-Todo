import ChatItem from "@my-todo-app/shared";
import express, { Router, Request, Response } from "express";
import { loadItemById, loadChats, saveChat } from "../services/todo-services";


const todosController = express.Router()

todosController.get('/', async (req: Request, res: Response<ChatItem[]>) => {
    res.send(await loadChats());
});

todosController.get('/:chatId', async (req: Request, res: Response<ChatItem>) => {
    try {
        res.send(await loadItemById(req.params.chatId));
    } catch (e) {
        res.sendStatus(404)
    }

});

todosController.post('/', async (req: Request<ChatItem>, res: Response<ChatItem[]>) => {
    try {
        res.send(await saveChat(req.body))
    } catch (e) {
        res.sendStatus(400)
    }
});

export default todosController