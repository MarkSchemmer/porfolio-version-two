import React, { useEffect, useState } from "react";
import { IsValue, replaceAll } from "../../Utils/Util";
import { Todo } from "../../GameApps/TodoMvc/entities/Todo";
import { useDispatch } from "react-redux";
import { AddTodo, UpdateTodoById } from "../../store/slices/tododListSlice";
import { TodoOperations } from "../../GameApps/TodoMvc/entities/TodoOperations";

interface IInputProps {
    placeholder?: string;
    contentEditable?: boolean;
    classNames?: string;
    onKeyUp?: (e: any) => void;
    txt: string;
    styleObj?: React.CSSProperties;
    callback?: any;
    operationForInput: TodoOperations;
    todo?: Todo
}

/*
            const input = document.querySelector('input'); // or a textarea
            input.addEventListener('keypress', function() {
            const s = this.selectionStart;
            this.value = this.value.slice(0, s) + this.value.slice(s + 1);
            this.selectionEnd = s;
            }, false);
            <input type="text" value="sample" />

            Need a uniformed way of updating a value of text in an input

            Or I will have to switch to Div or textarea  editable. 

*/

const GenericInput = (props:IInputProps) => {
    const dispatch = useDispatch();
    const [mvctext, setText] = useState(props.txt);
    const [placeholderText, setPlaceHolderText] = useState(props.placeholder);

    let clearTodoBar = (e:any) => {
        setText("");
        e.target.value = "";
    }

    const handlingEnter = (e: any, forceUpdate: boolean = false) => {
      let nextStr: string = mvctext;
      let isOnlyWhiteSpace = replaceAll(mvctext, " ", "", false).length > 0;
      if (!isOnlyWhiteSpace) return;
        const key = e.nativeEvent.key;
        if (key === 'Enter' || forceUpdate) {
          console.log(forceUpdate);
          switch(props.operationForInput) {
            case TodoOperations.AddTodo : {
              const newTodo = new Todo(nextStr);
              dispatch(AddTodo(newTodo));
              clearTodoBar(e);
              break;
            }
            case TodoOperations.UpdateTodo : {
              console.log("ehllo");
              dispatch(UpdateTodoById({...props.todo as Todo, str: nextStr, canEdit: false}));
              break;
            }
            default: {
              console.log("Todo Operations hit default potential error.");
            }
          }

        }
    }
    
    let setTextWrapper = (e:any) => {
          const { selectionStart, value } = e.target;
          const updatedValue = value.slice(0, selectionStart) + value.slice(selectionStart + 1);
          setText(updatedValue);
    }
    
    useEffect(() => {
        if (mvctext.length !== 0) {
          setPlaceHolderText("");
        } else {
          setPlaceHolderText("Todo MVC");
        }
  
    }, [mvctext]);

    return (
      <>
        <input
                onBlur={(e) => { 
                  if (props.todo && props.todo.canEdit) {
                    console.log(props.operationForInput);
                    handlingEnter(e, true);
                  }
                 }}
                onChange={e => { setTextWrapper(e); }}
                onKeyUp={e => { handlingEnter(e); }}
                value={mvctext}
                style={IsValue(props.styleObj) ? props.styleObj : {}}
                placeholder={placeholderText}
                contentEditable={props.contentEditable}
                className={props.classNames}
            />
        </>
    );
}

export default GenericInput;