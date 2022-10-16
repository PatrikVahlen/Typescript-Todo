import ChatItem from "@my-todo-app/shared"
import { connect, model, Schema } from "mongoose"

const ChatSchema = new Schema({
    name: String,
    text: String,
    timeStamp: Date
});

const ChatModel = model<ChatItem>("TodoItem", ChatSchema);

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