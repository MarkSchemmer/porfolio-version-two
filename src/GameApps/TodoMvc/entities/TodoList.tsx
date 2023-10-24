import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { DeleteTodoById, MakeAllTodosEditFalse, MakeTodoCannotEdit, selectTodos, UpdateTodoById } from "../../../store/slices/tododListSlice";
import { Todo } from './Todo';
import GenericInput from '../../../components/GenericInput/GenericInput';
import { replaceAll } from '../../../Utils/Util';
import { TodoOperations } from './TodoOperations';


const NoneEditableDisplayTodo = (props: {todo: Todo, todoStyles : React.CSSProperties}) => {

    const dispatch = useDispatch();

    const deleteTodoById = () => {
        dispatch(DeleteTodoById(props.todo.id));
    }

    return (
        <>
            <button className='complete-button' onClick={deleteTodoById} />
            <span contentEditable={props.todo.canEdit} style={props.todoStyles} className="todo-text">
                    {props.todo.str}
            </span>
        </>
    );
}

const TodoComponent = (props: {todo: Todo}) => {

    const todoStyles: React.CSSProperties = {
        // width: "100%",
        // height: "100%",
        // position: "absolute",
        // right: 0,
        // padding: "5px"
    }

    const genericInputStyles: React.CSSProperties = {
        // width: "100%",
        // height: "100%"
    }

    const dispatch = useDispatch();
    const [mvctext, setText] = useState(props.todo.str);
    const [placeholderText, setPlaceHolderText] = useState(props.todo.str);

    const deleteTodoById = () => {
        dispatch(DeleteTodoById(props.todo.id));
    }

    let clearTodoBar = (e:any) => {
        setText("");
        e.target.value = "";
    }
    
    let setTextWrapper = (e:any) => {
        let nextStr: string = e.target.value;
        let isOnlyWhiteSpace = replaceAll(nextStr, " ", "", false).length > 0;
        
        if (e.key === "Enter" && isOnlyWhiteSpace) 
        {
          dispatch(UpdateTodoById({ ...props.todo, str: nextStr, canEdit: false }));
          clearTodoBar(e);
        }
        else 
        {
          setText(nextStr);
        }
    }

    return (
        <div className="todo" 
        onClick={(evt) => {
            evt.preventDefault();
        }}
        onDoubleClick={(event) => {
            dispatch(MakeAllTodosEditFalse(null))
            dispatch(UpdateTodoById({...props.todo, canEdit: true}));
        }}>
          { props.todo.canEdit === false ?  <NoneEditableDisplayTodo todo={props.todo} todoStyles={todoStyles} /> : 
                    <>
                      <button className='complete-button' onClick={deleteTodoById} />
                        <GenericInput
                            operationForInput={TodoOperations.UpdateTodo}
                            todo={props.todo}
                            placeholder=''
                            contentEditable={true}
                            classNames='todo-text todo-input'
                            txt={props.todo.str}
                            styleObj={genericInputStyles}
                            onKeyUp={setTextWrapper}
                            /> 
                    </>
         }
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