import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../../GameApps/TodoMvc/entities/Todo';

/*

  public AddTodo = (todo: string) => this.setTodoList([...this.list, new Todo(todo)])

  public GetTodos = () => this.list

*/

const todos: Todo[] = [];

const initialState = {
    todos: todos
}

export const todoListSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        AddTodo: (state, action: {type: string, payload: Todo}) => {
            state.todos = [action.payload, ...state.todos];
        },
        UpdateTodoById: (state, action: { type: string, payload: Todo}) => {
            const id = action.payload.id;
            const idx = state.todos.findIndex(t => t.id === id);
            state.todos[idx] = action.payload;
        }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { AddTodo, UpdateTodoById } = todoListSlice.actions

  export const selectTodos = (state: {todoList: { todos: Todo[]}}) => state.todoList.todos; 


  
  export default todoListSlice.reducer