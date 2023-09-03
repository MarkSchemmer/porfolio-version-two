import { useSelector, useDispatch } from "react-redux";
import { selectTodos } from "../../../store/slices/tododListSlice";


export const TodoList = () => {
    const todos = useSelector(selectTodos);
    return (
        <div>
            { todos.map((t: any) => {
                return <div>{t.id}</div>
            })}
        </div>
    )
}