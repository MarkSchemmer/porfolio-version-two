import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClearCompleted, itemsLeft } from '../../../store/slices/tododListSlice';
import { MakeFilterActive, MakeFilterAll, MakeFilterCompleted, TodoFilter, selectFilter } from '../../../store/slices/todoFilterSlice';

export const TodoListFooter = () => {

    const itemsLeftCounter = useSelector(itemsLeft);
    const filter = useSelector(selectFilter);

    const className = "selected";

    const isAll = filter === TodoFilter.All ? className : "";
    const isActive = filter === TodoFilter.Active ? className : "";
    const isCompleted = filter === TodoFilter.Completed ? className : "";

    const dispatch = useDispatch();

    return (
        <div className='footer-todo'>
            <span className='items-left'>
                {itemsLeftCounter.length} Items Left
            </span>
            <span className='control'>
                <span className={'all ' + isAll } onClick={() => { dispatch(MakeFilterAll(null)); }}>All</span>
                <span className={'active ' + isActive} onClick={() => { dispatch(MakeFilterActive(null)); }}>Active</span>
                <span className={'completed ' + isCompleted} onClick={() => { dispatch(MakeFilterCompleted(null)); }}>Completed</span>
            </span>
            <span className='clear-completed' onClick={() => { dispatch(ClearCompleted(null)); }}>Clear Completed</span>
        </div>
    );
}