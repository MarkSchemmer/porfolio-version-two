import React, { KeyboardEventHandler, useState } from 'react';
import "../TodoMvc/styles/main.css";

function TodoMVC() {
  const [mvctext, setText] = useState("");
  return (
    <div className="mvc-container">
      <div 
      placeholder={"Todo MVC"}
      contentEditable={true} 
      className="todo-mvc-app" 
      onKeyUp={(e: any) => {
        setText(e.target.innerText);
      }}>
      </div>
      {mvctext}
    </div>

  );
}

export default TodoMVC;
