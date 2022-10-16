import ChatItem from "@my-todo-app/shared"
import { connect, model, Schema } from "mongoose"

const ToDoSchema = new Schema({
    name: String,
    text: String,
    timeStamp: Date
});

const TodoModel = model<ChatItem>("TodoItem", ToDoSchema);

export const setupMongoDB = async (url: string) => {
    await connect(url)
};

export const loadAllChatItems = async (): Promise<ChatItem[]> => {
    return TodoModel.find({}).exec()
}

export const loadTodoItem = async (todoId: string): Promise<ChatItem | null> => {
    return TodoModel.findById(todoId).exec()
}

export const saveChatItem = async (todoItem: ChatItem): Promise<void> => {
    const newModel = new TodoModel(todoItem)
    newModel.save()
}