import React, { useEffect, useState } from 'react';
import "../TodoMvc/styles/main.css";
import { replaceAll } from '../../Utils/Util';
import { Todo } from './entities/Todo';
import { TodoList } from './entities/TodoList';
import state from './entities/StateComponents';



function TodoMVC() {
  const [mvctext, setText] = useState("");
  const [placeholderText, setPlaceHolderText] = useState("Todo MVC");

  let clearTodoBar = (e:any) => {
      setText("");
      e.target.value = "";
  }

  let setTextWrapper = (e:any) => {
    let nextStr: string = e.target.value;
    let isOnlyWhiteSpace = replaceAll(nextStr, " ", "", false).length > 0;
    console.log(isOnlyWhiteSpace);

    if (e.code === "Enter" && isOnlyWhiteSpace) 
    {
      // Need to add Todo to List then clear
      state.TodoListState.AddTodo(nextStr);
      clearTodoBar(e);
    }
    else 
    {
      console.log(e);
      setText(nextStr);
    }
  }

  useEffect(() => {
      if (mvctext.length != 0) {
        setPlaceHolderText("");
      } else {
        setPlaceHolderText("Todo MVC");
      }

  }, [mvctext])

  return (
    <div className="mvc-container">
      <input 
      placeholder={placeholderText}
      contentEditable={true} 
      className="todo-mvc-app" 
      onKeyUp={(e: any) => {
        setTextWrapper(e);
      }} />
      <TodoList />
    </div>

  );
}

export default TodoMVC;
