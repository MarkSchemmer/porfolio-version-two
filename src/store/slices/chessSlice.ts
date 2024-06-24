import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../../GameApps/TodoMvc/entities/Todo';
import { Board } from '../../GameApps/Chess/board/Board';

/*

  public AddTodo = (todo: string) => this.setTodoList([...this.list, new Todo(todo)])

  public GetTodos = () => this.list

*/

const localTesting = {
    detectHorizontalSquares: false
}


const initialState = {
    testing: localTesting,
    board: new Board()
}

export const chessSlice = createSlice({
    name: 'chess',
    initialState,
    reducers: {
        UpdateChessTestingState: (state, action: {type: string, payload: any}) => {
            state.testing = action.payload;
        },
        UpdateChessBoard: (state, action: {type: string, payload: any}) => {
            const newBoard = new Board();
            newBoard.board = action.payload.board;
            newBoard.rootNode = action.payload.rootNode;
            state.board = newBoard;
        }
    },
  });

  export const { UpdateChessTestingState, UpdateChessBoard } = chessSlice.actions;
  export const getTestingState = (state:any) => state.chessState.testing;
  export const getBoard = (state: any) => state.chessState.board;
  
  export default chessSlice.reducer