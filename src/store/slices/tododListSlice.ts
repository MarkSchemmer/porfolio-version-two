import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../../GameApps/TodoMvc/entities/Todo';

/*

  public AddTodo = (todo: string) => this.setTodoList([...this.list, new Todo(todo)])

  public GetTodos = () => this.list

*/




const todos: Todo[] = [];

const initialState = {
    todos: todos,

}



const selectTodoById = (todos: Todo[], id: string) => {
    var todo = todos.filter(todo => todo.id === id);

    if (todo.length > 0) 
        return todo[0];
    else 
        return null;
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
        },
        MakeTodoCannotEdit: (state, action: { type: string, payload: string}) => {
            var todoById = selectTodoById(state.todos, action.payload);

            if (todoById) {
                todoById.canEdit = false;
            }
        },
        DeleteTodoById: (state, action: {type: string, payload: string}) => {
            state.todos = state.todos.filter(t => t.id != action.payload);
        },
        MakeAllTodosEditFalse: (state, action: {type: string, payload: null}) => {
            state.todos = state.todos.map(todo => { todo.canEdit = false; return todo;});
        },
        ClearCompleted: (state, action: {type: string, payload: null}) => {
            state.todos = state.todos.filter(todo => todo.completed == false)
        },
    },
  });


  
  // Action creators are generated for each case reducer function
  export const { AddTodo, UpdateTodoById, MakeTodoCannotEdit, DeleteTodoById, MakeAllTodosEditFalse, ClearCompleted } = todoListSlice.actions
  export const selectTodos = (state: {todoList: { todos: Todo[]}}) => state.todoList.todos;
  export const itemsLeft = (state: {todoList: { todos: Todo[]}}) => state.todoList.todos.filter(todo => todo.completed == false);
  export const completedTodos = (state: {todoList: { todos: Todo[]}}) => state.todoList.todos.filter(todo => todo.completed == true);


//   export const selectTodoById = (id: string, state: {todos: {todos: Todo[]}}) => {
//     var todo = state.todos.todos.filter(todo => todo.id === id);

//     if (todo.length > 0) 
//         return todo[0];
//     else 
//         return null;
//   }


  
  export default todoListSlice.reducer