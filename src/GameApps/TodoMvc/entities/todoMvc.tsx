import React, { useEffect, useState } from 'react';
import "../../TodoMvc/styles/main.css";
import { replaceAll } from '../../../Utils/Util';
import { Todo } from './Todo';
import { TodoList } from './TodoList';



function TodoMVC() {
  const [mvctext, setText] = useState("");
  const [placeholderText, setPlaceHolderText] = useState("Todo MVC");

  const todoList: Todo[] = [];
  const [list, setTodoList] = useState(todoList);

  let wrapper = new TodoListWrapper(list, setTodoList);

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
      wrapper.AddTodo(nextStr);
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

class TodoListWrapper {
  public list: Todo[] = [];
  public setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  constructor(list: Todo[], setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>) {
    this.list = list;
    this.setTodoList = setTodoList;
  }

  public AddTodo = (todo: string) => this.setTodoList([...this.list, new Todo(todo)])

  public GetTodos = () => this.list
}

export default TodoMVC;
