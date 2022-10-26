import { ChatItem, User } from "@my-todo-app/shared"
import { connect, model, Schema } from "mongoose"


const ChatSchema = new Schema({
    name: String,
    text: String,
    timeStamp: Date
});

const UserSchema = new Schema({
    name: String,
    password: String
})


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
    newModel.save()
}

// export const saveUserItem = async (userItem: User): Promise<void> => {
//     const hashpassword = await bcrypt.hash(password, 10);
//     const newUser = new UserModel({
//         username: req.body.username,
//         password: hashpassword
//     })
// }