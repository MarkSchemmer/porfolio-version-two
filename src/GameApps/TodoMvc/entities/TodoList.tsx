import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { completedTodos, DeleteTodoById, itemsLeft, MakeAllTodosEditFalse, MakeTodoCannotEdit, selectTodos, UpdateTodoById } from "../../../store/slices/tododListSlice";
import { Todo } from './Todo';
import GenericInput from '../../../components/GenericInput/GenericInput';
import { replaceAll } from '../../../Utils/Util';
import { TodoOperations } from './TodoOperations';
import { faCircle, faCircleCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TodoFilter, selectFilter } from '../../../store/slices/todoFilterSlice';
import { IconProp } from '@fortawesome/fontawesome-svg-core';


const CompleteTodoEdit = (props: {todo: Todo, todoStyles : React.CSSProperties}) => {
    const dispatch = useDispatch();

    const CompletedTrue = () => {
        dispatch(UpdateTodoById( {...props.todo, completed: true } ));
    }

    const CompletedFalse = () => {
        dispatch(UpdateTodoById( {...props.todo, completed: false } ));
    }

    const styles: React.CSSProperties = {
        height: "50px", width: "50px", position: "absolute",
        left: "1%", top: "20px"
    }

    const CompletedCircle: React.CSSProperties = {
        ...styles,
        color: 'green'
    }

    return (
        props.todo.completed ? <FontAwesomeIcon style={CompletedCircle} icon={faCircleCheck as IconProp} onClick={CompletedFalse} /> 
        : <FontAwesomeIcon icon={faCircle as IconProp}  style={styles} onClick={CompletedTrue} /> 
    )
}

const NoneEditableDisplayTodo = (props: {todo: Todo, todoStyles : React.CSSProperties}) => {

    const dispatch = useDispatch();

    const deleteTodoById = () => {
        dispatch(DeleteTodoById(props.todo.id));
    }

    const additionalStyles: React.CSSProperties = {
        ...props.todoStyles,
        left: "63px", top: "calc(50% - 20px)"
    }

    return (
        <>
            <button className='complete-button' onClick={deleteTodoById}>
            <FontAwesomeIcon icon={faTrash as IconProp} />
            </button>
            <CompleteTodoEdit todo={props.todo} todoStyles={{}} />
            <span contentEditable={props.todo.canEdit} style={additionalStyles} className={"todo-text " + (props.todo.completed ? " line-slash " : "")} >
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
                      <button className='complete-button' onClick={deleteTodoById}>
                      <FontAwesomeIcon icon={faTrash as IconProp} />
                      </button>
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
    const filter = useSelector(selectFilter);
    const itemsleftSlice = useSelector(itemsLeft);
    const completed = useSelector(completedTodos);

    let functionGetProperTodo = (f: TodoFilter) => {
        switch(f) {
            case TodoFilter.All : {
                return todos;
            }
            case TodoFilter.Active : {
                return itemsleftSlice;
            }
            case TodoFilter.Completed : {
                return completed;
            }
            default: {
                return todos;
            }
        }
    }

    let displayTodos = functionGetProperTodo(filter);

    return (
        <div className="todos">
            {displayTodos.map((t: Todo) => <TodoComponent key={t.id} todo={t} />)}
        </div>
    )
}