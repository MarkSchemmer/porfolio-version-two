import { useState } from "react";
import { Todo } from "./Todo";

const TodoListState = (todoList: Todo[] = []) => {
    const [list, setTodoList] = useState(todoList);

    return {
        AddTodo: (todo:string) => setTodoList([...list, new Todo(todo)]),
        GetTodos: () => list
    }
}


const TodoTextState = (text: string = "") => {
    const [txt, setText] = useState(text);

    return {
       
    }  
}

const state = {
    TodoListState: TodoListState(),
    TodoTextState: TodoTextState()
};

export default state;