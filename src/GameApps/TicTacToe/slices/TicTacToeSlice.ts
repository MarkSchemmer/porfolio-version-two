import { createSlice } from "@reduxjs/toolkit";
import { Square } from "../entities/Square";
import { type } from "os";

export enum TicTacToeEnum {
    X = "X",
    O = "O"
};
const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

let genBoard = () => board.map((row, rowIdx) => {
    return row.map((columnItem, columnIdx) => new Square(columnItem, rowIdx, columnIdx))
});

let generatedBoard: Square[][] = genBoard();

let whosTurn: TicTacToeEnum = TicTacToeEnum.X;

type State = {
    board: Square[][];
    turn: TicTacToeEnum;
}

const initialState: State = {
    board: generatedBoard,
    turn: whosTurn
};

export const TicTacToeSlice = createSlice({
    name: "TicTacToeState",
    initialState: initialState,
    reducers: {
        HandleTicTacToeClick: (state, action: {type: string, payload: {sqaure: Square}}) => {
            console.log(action.payload.sqaure);
            let x = action.payload.sqaure.x;
            let y = action.payload.sqaure.y;
            state.board = JSON.parse(JSON.stringify(state.board));
            state.board[x][y].value = state.turn;
        },
        SwitchTurn:  (state, action: {type: string, payload: null}) => {
            let nextTurn: TicTacToeEnum = state.turn === TicTacToeEnum.X ? TicTacToeEnum.O : TicTacToeEnum.X;
            state.turn = nextTurn;
        }
    }
});

export const { HandleTicTacToeClick, SwitchTurn } = TicTacToeSlice.actions;

export const sliceBoard = (state: {TicTacToeState: {board: Square[][], turn: TicTacToeEnum}}) => state.TicTacToeState.board;
export const sliceTurn = (state: {board: Square[][], turn: TicTacToeEnum}) => state.turn;

export default TicTacToeSlice.reducer;