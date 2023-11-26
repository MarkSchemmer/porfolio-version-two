import { createSlice } from "@reduxjs/toolkit";
import { Square } from "../entities/Square";
import { TicTacToeResult, TicTacToeWinnerSet } from "../Utils/utils";

export enum TicTacToeEnum {
    X = "X",
    O = "O", 
    Tie = "Tie"
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
    winner: any;
}

const initialState: State = {
    board: generatedBoard,
    turn: whosTurn,
    winner: null
};

export const TicTacToeSlice = createSlice({
    name: "TicTacToeState",
    initialState: initialState,
    reducers: {
        HandleTicTacToeClick: (state, action: {type: string, payload: {sqaure: Square}}) => {
            let x = action.payload.sqaure.x;
            let y = action.payload.sqaure.y;
            state.board = JSON.parse(JSON.stringify(state.board));
            state.board[x][y].value = state.turn;
        },
        SwitchTurn:  (state, action: {type: string, payload: null}) => {
            let nextTurn: TicTacToeEnum = state.turn === TicTacToeEnum.X ? TicTacToeEnum.O : TicTacToeEnum.X;
            state.turn = nextTurn;
        },
        HasWinner: (state, action: {type: string, payload: null}) => {
            state.winner = TicTacToeResult(state.board);
        },
        HighlightWinningSquares: (state, action: {type: string, payload: null}) => {

            if (state.winner === TicTacToeEnum.O || state.winner === TicTacToeEnum.X) 
            {
                let board: Square[][] = JSON.parse(JSON.stringify(state.board));
                
                TicTacToeWinnerSet(board)?.forEach((square: Square) => {
                    square.winningSquare = true;
                });

                state.board = board;
            }
        }
    }
});

export const { HandleTicTacToeClick, SwitchTurn, HasWinner, HighlightWinningSquares } = TicTacToeSlice.actions;
export const sliceBoard = (state: {TicTacToeState: {board: Square[][], turn: TicTacToeEnum}}) => state.TicTacToeState.board;
export const sliceTurn = (state: {TicTacToeState: {board: Square[][], turn: TicTacToeEnum}}) => state.TicTacToeState.turn;
export const sliceWinner = (state: {TicTacToeState: {winner: TicTacToeEnum }}) => state.TicTacToeState.winner;
export default TicTacToeSlice.reducer;
