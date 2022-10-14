import TodoItem from "@my-todo-app/shared"
import { connect, model, Schema } from "mongoose"

const ToDoSchema = new Schema({
    name: String,
    text: String,
    timeStamp: Date
});

const TodoModel = model<TodoItem>("TodoItem", ToDoSchema);

export const setupMongoDB = async (url: string) => {
    await connect(url)
};

export const loadAllTodoItems = async (): Promise<TodoItem[]> => {
    return TodoModel.find({}).exec()
}

export const loadTodoItem = async (todoId: string): Promise<TodoItem | null> => {
    return TodoModel.findById(todoId).exec()
}

export const saveTodoItem = async (todoItem: TodoItem): Promise<void> => {
    const newModel = new TodoModel(todoItem)
    newModel.save()
}