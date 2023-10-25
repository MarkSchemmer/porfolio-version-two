import React from 'react';

export const TodoListFooter = () => {
    return (
        <div className='footer-todo'>
            <span className='items-left'>
                0 Items Left
            </span>
            <span className='control'>
                <span className='all'>All</span>
                <span className='active'>Active</span>
                <span className='completed'>Completed</span>
            </span>
            <span className='clear-completed'>Clear Completed</span>
        </div>
    )
}