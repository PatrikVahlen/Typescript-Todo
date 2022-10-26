import { ChatItem, User } from "@my-todo-app/shared";
import express, { Router, Request, Response } from "express";
import { loadItemById, loadChats, saveChat } from "../services/chat-services";
import { UserModel } from "../models/chat-repository";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import passport from "passport";
import passportLocal from "passport-local"
import mongoose from "mongoose";

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

const JWT_SECRET: string = process.env.JWT || "Example";

chatController.post("/login", async (req: Request<User>, res: Response) => {
    const { name, password } = req.body;
    const result = await UserModel.findOne({ name: name })
    const hashedpassword = result!.password;
    const compare = bcrypt.compareSync(password, hashedpassword);
    if (compare) {
        console.log("Password is a match")
        const payload = { id: result!._id, name: result!.name }
        const token = jwt.sign({ payload }, JWT_SECRET, { expiresIn: '2h' })
        console.log(token)
        res.send({ token: token });
    } else {
        res.sendStatus(403)
        console.log("Password is not a match")
    }
});

chatController.post("/user", async (req: Request, res: Response) => {
    const { token } = req.body;
    try {
        const verify = jwt.verify(token, JWT_SECRET);
        console.log(verify);
        res.send(verify);
    } catch (error) {
        console.log(JSON.stringify(error), "error");
        res.sendStatus(403);
    }
});

chatController.post('/register', async (req: Request<User>, res: Response) => {
    const { name, password } = req.body;
    if (!name || !password || typeof name !== "string" || typeof password !== "string") {
        res.sendStatus(404);
        return;
    }

    UserModel.findOne({ name }, async (err: Error, doc: User) => {
        if (err) throw err;
        if (doc) res.sendStatus(404);
        if (!doc) {
            const hashpassword = await bcrypt.hash(password, 10);
            const newUser = new UserModel({
                name,
                password: hashpassword
            });
            await newUser.save();
            res.sendStatus(200);
        }
    })
});

export default chatController