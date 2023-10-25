import React from 'react';
import "../../TodoMvc/styles/main.css";
import { TodoList } from './TodoList';
import GenericInput from '../../../components/GenericInput/GenericInput';
import { TodoOperations } from './TodoOperations';
import { TodoListFooter } from './TodoFooter';

function TodoMVC() {
  return (
    <div className="mvc-container">
      <GenericInput
        operationForInput={TodoOperations.AddTodo}
        placeholder="TODO MVC"
        contentEditable={true}
        classNames="todo-mvc-app"
        txt=""
      /> 
      <TodoList />
      <TodoListFooter />
    </div>
  );
}



export default TodoMVC;
