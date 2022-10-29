import { ChatItem, User } from "@my-todo-app/shared"
import mongoose, { connect, model, Schema } from "mongoose"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const ChatSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: "UserItem" },
    name: String,
    text: String,
    timeStamp: Date
});

const UserSchema = new Schema({
    name: String,
    password: String
})

const JWT_SECRET: string = process.env.JWT || "Example";

const ChatModel = model<ChatItem>("ChatItem", ChatSchema);
export const UserModel = model<User>("UserItem", UserSchema);

export const setupMongoDB = async (url: string) => {
    await connect(url)
};

export const loadAllChatItems = async (): Promise<ChatItem[]> => {
    return ChatModel.find({}).exec()
}

export const loadChatItem = async (chatId: string): Promise<ChatItem | null> => {
    return ChatModel.findById(chatId).exec()
}

export const saveChatItem = async (chatItem: ChatItem): Promise<void> => {
    const newModel = new ChatModel(chatItem)
    console.log(chatItem)
    newModel.save()
}

export const saveUserItem = async (userItem: User): Promise<void> => {
    const { name, password } = userItem
    UserModel.findOne({ name }, async (err: Error, doc: User) => {
        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            name,
            password: hashpassword
        });
        newUser.save();

    })
}

export const loginUserItem = async (userItem: User): Promise<any> => {
    const { name, password } = userItem
    const result = await UserModel.findOne({ name: name })
    const hashedpassword = result!.password;
    const compare = bcrypt.compareSync(password, hashedpassword);
    if (compare) {
        console.log("Password is a match")
        const payload = { id: result!._id, name: result!.name }
        const token = jwt.sign({ payload }, JWT_SECRET, { expiresIn: '2h' })
        console.log(token)
        return { token: token };
    } else {
        return Error("Invalid text on chat item!")
    }
}

export const verifyTokenItem = async (tokenItem: any): Promise<any> => {
    const { token } = tokenItem;
    try {
        const verify = jwt.verify(token, JWT_SECRET);
        console.log(verify);
        return (verify);
    } catch (error) {
        console.log(JSON.stringify(error), "error");
    }
}