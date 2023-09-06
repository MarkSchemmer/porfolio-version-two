import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectTodos, UpdateTodoById } from "../../../store/slices/tododListSlice";
import { Todo } from './Todo';
import GenericInput from '../../../components/GenericInput/GenericInput';
import { replaceAll } from '../../../Utils/Util';


const TodoComponent = (props: {todo: Todo}) => {

    const todoStyles: React.CSSProperties = {
        float: "left",
        width: "100%",
        height: "100%",
    }

    const dispatch = useDispatch();
    const [mvctext, setText] = useState(props.todo.str);
    const [placeholderText, setPlaceHolderText] = useState(props.todo.str);

    let clearTodoBar = (e:any) => {
        setText("");
        e.target.value = "";
    }
    
    let setTextWrapper = (e:any) => {
        let nextStr: string = e.target.value;
        let isOnlyWhiteSpace = replaceAll(nextStr, " ", "", false).length > 0;

        console.log(e.target.selectionStart);
        
        if (e.code === "Enter" && isOnlyWhiteSpace) 
        {
          dispatch(UpdateTodoById({ ...props.todo, str: nextStr, canEdit: false }));
          clearTodoBar(e);
        }
        else 
        {
          // console.log(e);
          setText(nextStr);
        }
    }

    return (
        <div className="todo" 
        onClick={(evt) => {
            evt.preventDefault();
        }}
        onDoubleClick={(event) => {
            dispatch(UpdateTodoById({...props.todo, canEdit: true}));
        }}>
          { props.todo.canEdit === false ?  <span contentEditable={props.todo.canEdit} style={todoStyles} className="todo-text">
                {props.todo.str}
            </span> : <GenericInput
                            placeholder=''
                            contentEditable={true}
                            classNames=''
                            txt={props.todo.str}
                            styleObj={todoStyles}
                            onKeyUp={setTextWrapper}
                            /> }
        </div>
    )
}

export const TodoList = () => {
    const todos = useSelector(selectTodos);
    return (
        <div className="todos">
            {todos.map((t: Todo) => <TodoComponent key={t.id} todo={t} />)}
        </div>
    )
}