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

const JWT_SECRET: string = process.env.JWT || "asjdasd";

chatController.post("/login", async (req: Request<User>, res: Response) => {
    const { name, password } = req.body;
    const result = await UserModel.findOne({ name: name })
    const hashedpassword = result!.password;
    console.log("Password", hashedpassword);
    const compare = bcrypt.compareSync(password, hashedpassword);
    if (compare) {
        console.log("Här")
        const payload = { id: result!._id, name: result!.name }
        const token = jwt.sign({ payload }, JWT_SECRET, { expiresIn: '2h' })
        console.log(token);
    } else {
        console.log("Stämmer inte")
    }
    console.log('Hashed password matches secret password:', compare);
});

chatController.get("/user", (req, res) => {
    res.send(req.user);
});

chatController.post('/register', async (req: Request<User>, res: Response) => {
    const { name, password } = req.body;
    if (!name || !password || typeof name !== "string" || typeof password !== "string") {
        res.send("Improper Values");
        return;
    }

    UserModel.findOne({ name }, async (err: Error, doc: User) => {
        if (err) throw err;
        if (doc) res.send("User Already Exists");
        if (!doc) {
            const hashpassword = await bcrypt.hash(password, 10);
            const newUser = new UserModel({
                name,
                password: hashpassword
            });
            await newUser.save();
            res.send("Success")
        }
    })
});

export default chatController