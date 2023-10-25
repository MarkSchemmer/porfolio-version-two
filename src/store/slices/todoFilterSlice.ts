import { createSlice } from '@reduxjs/toolkit';

export enum TodoFilter {
    All = "All",
    Completed = "Completed",
    Active = "Active"
} 

const defaultTodoFilter = TodoFilter.All;

const initialStateFilter = {
    filter: defaultTodoFilter
}

export const todoFilterSlice = createSlice({
    name: 'todoFilter',
    initialState: initialStateFilter,
    reducers: {
        MakeFilterAll: (state, action: {type: string, payload: null}) => {
            state.filter = TodoFilter.All;
        },
        MakeFilterActive: (state, action: {type: string, payload: null}) => {
            state.filter = TodoFilter.Active;
        },
        MakeFilterCompleted: (state, action: {type: string, payload: null}) => {
            state.filter = TodoFilter.Completed;
        },
    }
  });

export const { MakeFilterAll, MakeFilterActive, MakeFilterCompleted } = todoFilterSlice.actions;

export const selectFilter = (state: {todoFilter: {filter: TodoFilter}}) => state.todoFilter.filter;

export default todoFilterSlice.reducer;