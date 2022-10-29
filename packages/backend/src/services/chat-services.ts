import { ChatItem, User } from "@my-todo-app/shared"
import { loadAllChatItems, loadChatItem, saveChatItem, saveUserItem, loginUserItem, verifyTokenItem, UserModel } from "../models/chat-repository"

export const saveChat = async (chatItem: ChatItem): Promise<ChatItem[]> => {
    if (!chatItem.text || chatItem.text == "") {
        throw new Error("Invalid text on chat item!")
    }

    chatItem.timeStamp = new Date()

    await saveChatItem(chatItem)

    return await loadAllChatItems()
}

export const saveUser = async (userItem: User): Promise<void> => {
    await saveUserItem(userItem)
}

export const loginUser = async (userItem: User): Promise<void> => {
    return await loginUserItem(userItem)
}

export const verifyToken = async (tokenItem: any): Promise<void> => {
    return await verifyTokenItem(tokenItem)
}

export const loadChats = async (): Promise<ChatItem[]> => {
    return await loadAllChatItems();
}

export const loadItemById = async (chatId: string): Promise<ChatItem> => {
    const item = await loadChatItem(chatId);
    if (!item) {
        throw new Error(`Can't find item with id ${chatId}`)
    }
    return item
}

