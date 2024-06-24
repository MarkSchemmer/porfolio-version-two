import { configureStore, } from '@reduxjs/toolkit'
import todoListReducer from '../store/slices/tododListSlice';
import todoFilterReducer from '../store/slices/todoFilterSlice';
import ticTacToeReducer from '../../src/GameApps/TicTacToe/slices/TicTacToeSlice';
import ChessReducer  from '../store/slices/chessSlice';


// import {
//   createSerializableStateInvariantMiddleware,
//   isPlain,
// } from '@reduxjs/toolkit'
// import { Iterable } from 'ts-iterable/dist/iterable';

// Augment middleware to consider Immutable.JS iterables serializable
// const isSerializable = (value: any) =>
//   Iterable.isIterable(value) || isPlain(value)

// const getEntries = (value: any) =>
//   Iterable.isIterable(value) ? value.entries() : Object.entries(value)

// const serializableMiddleware = createSerializableStateInvariantMiddleware({
//   isSerializable,
//   getEntries,
// })

/*

import isPlainObject from './isPlainObject'

export function isPlain(val: any) {
  return (
    typeof val === 'undefined' ||
    val === null ||
    typeof val === 'string' ||
    typeof val === 'boolean' ||
    typeof val === 'number' ||
    Array.isArray(val) ||
    isPlainObject(val)
  )
} 


*/

export default configureStore({
  reducer: {
    todoList: todoListReducer,
    todoFilter: todoFilterReducer,
    TicTacToeState: ticTacToeReducer,
    chessState: ChessReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})