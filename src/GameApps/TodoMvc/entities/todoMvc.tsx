import React, { useEffect, useState } from 'react';
import "../../TodoMvc/styles/main.css";
import { replaceAll } from '../../../Utils/Util';
import { Todo } from './Todo';
import { TodoList } from './TodoList';
import { useDispatch } from 'react-redux';
import { AddTodo } from '../../../store/slices/tododListSlice';
import GenericInput from '../../../components/GenericInput/GenericInput';

function TodoMVC() {
  return (
    <div className="mvc-container">
      <GenericInput
        placeholder="TODO MVC"
        contentEditable={true}
        classNames="todo-mvc-app"
        txt=""
      /> 
      <TodoList />
    </div>
  );
}



export default TodoMVC;
