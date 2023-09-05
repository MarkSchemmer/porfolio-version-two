import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectTodos, UpdateTodoById } from "../../../store/slices/tododListSlice";
import { Todo } from './Todo';


const TodoComponent = (props: {todo: Todo}) => {

    const dispatch = useDispatch();

    const todoStyles: React.CSSProperties = {
        float: "left",
        width: "100%",
        height: "100%",
    }

    return (
        <div className="todo" 
        onClick={(evt) => {
            evt.preventDefault();
        }}
        onDoubleClick={(event) => {
            dispatch(UpdateTodoById({...props.todo, canEdit: true}));
        }}>
            <span contentEditable={props.todo.canEdit} style={todoStyles} className="todo-text">
                {props.todo.str}
            </span>
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