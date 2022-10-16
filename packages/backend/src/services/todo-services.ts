import ChatItem from "@my-todo-app/shared"
import { loadAllTodoItems, loadTodoItem, saveTodoItem } from "../models/todos-repository"

export const saveTodo = async (todoItem: ChatItem): Promise<ChatItem[]> => {
    if (!todoItem.text || todoItem.text == "") {
        throw new Error("Invalid text on todo item!")
    }

    todoItem.timeStamp = new Date()

    await saveTodoItem(todoItem)

    return await loadAllTodoItems()
}

export const loadTodos = async (): Promise<ChatItem[]> => {
    return await loadAllTodoItems();
}

export const loadItemById = async (todoId: string): Promise<ChatItem> => {
    const item = await loadTodoItem(todoId);
    if (!item) {
        throw new Error(`Can't find item with id ${todoId}`)
    }
    return item
}