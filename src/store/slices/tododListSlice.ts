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
        AddTodo: (state, action) => {
            state.todos.push(action.payload);
        }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { AddTodo } = todoListSlice.actions

  export const selectTodos = (state: any) => state.todoList.todos; 


  
  export default todoListSlice.reducer