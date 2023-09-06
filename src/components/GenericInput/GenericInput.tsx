import React, { useEffect, useState } from "react";
import { IsValue, replaceAll } from "../../Utils/Util";
import { Todo } from "../../GameApps/TodoMvc/entities/Todo";
import { useDispatch } from "react-redux";
import { AddTodo } from "../../store/slices/tododListSlice";

interface IInputProps {
    placeholder?: string;
    contentEditable?: boolean;
    classNames?: string;
    onKeyUp?: (e: any) => void;
    txt: string;
    styleObj?: React.CSSProperties;
    callback?: any;
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
    
    let setTextWrapper = (e:any) => {
        let nextStr: string = e.target.value;
        let isOnlyWhiteSpace = replaceAll(nextStr, " ", "", false).length > 0;
        
        if (e.code === "Enter" && isOnlyWhiteSpace) 
        {
          // Need to add Todo to List then clear
          const newTodo = new Todo(nextStr);
          dispatch(AddTodo(newTodo));
          clearTodoBar(e);
        }
        else 
        {
          // console.log(e);
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

    const genericKeyUp = (e:any) => { setTextWrapper(e); }

    return (
        <input
                // onChange={(e: any) => { setText(mvctext + e.target.value); }}
                value={mvctext}
                style={IsValue(props.styleObj) ? props.styleObj : {}}
                placeholder={placeholderText}
                contentEditable={props.contentEditable}
                className={props.classNames}
                onKeyUp={IsValue(props.onKeyUp) ? props.onKeyUp : genericKeyUp}
            />
    );
}

export default GenericInput;