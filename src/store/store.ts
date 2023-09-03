import { configureStore } from '@reduxjs/toolkit'
import todoListReducer from '../store/slices/tododListSlice';

export default configureStore({
  reducer: {
    todoList: todoListReducer
  },
})