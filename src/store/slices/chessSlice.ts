import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../../GameApps/TodoMvc/entities/Todo";
import { Board } from "../../GameApps/Chess/board/Board";
import { PieceColor, PieceNames } from "../../GameApps/Chess/utils/Utils";
import { Square } from "../../GameApps/Chess/board/Square";

const localTesting = {
  horozontal: false,
  vertical: false,
  diagonal: false,
  knight: false,
  queen: false,
  rook: false,
};

type MoveHistory = {
  cur: Square | null;
};

const initMoveHistory: MoveHistory = {
  cur: null,
};

type pieceManSelected = {
  name: PieceNames | null;
  pieceColor: PieceColor | null;
};

const initialPiecceSelected: pieceManSelected = {
  name: null,
  pieceColor: null,
};

const pieceManipulationTesting = {
  active: false,
  pieceSelected: initialPiecceSelected, // will be object {color, pieceName} or null. if active {black, rook} or {white, queen} etc. etc. etc.
};

// pondPromotionControl
const PondPromotionControl = {
  IsOpen: false,
  pieceName: null,
  pieceColor: null,
  coordinateToPromote: null
}

const initialState = {
  testing: localTesting,
  pieceManipulation: pieceManipulationTesting,
  board: new Board(),
  selectedPiece: initMoveHistory,
  PondPromotionControl
};

export const chessSlice = createSlice({
  name: "chess",
  initialState,
  reducers: {
    UpdateChessTestingState: (
      state,
      action: { type: string; payload: any }
    ) => {
      state.testing = action.payload;
    },
    UpdateChessBoard: (state, action: { type: string; payload: any }) => {
      const newBoard = new Board();
      newBoard.board = action.payload.board;
      newBoard.turn = action.payload.turn;
      newBoard.rootNode = action.payload.rootNode;
      newBoard.moveBuffer = action.payload.moveBuffer;
      newBoard.positionHistory = action.payload.positionHistory;
      newBoard.blackPieceAndAttacksCache = newBoard.reCacheBlackPieces();
      newBoard.whitePieceAndAttacksCache = newBoard.reCacheWhitePieces();
      
      state.board = newBoard;
    },
    updatePieceManipulationTesting: (
      state,
      action: { type: string; payload: any }
    ) => {
      if (
        action.payload.name === state.pieceManipulation?.pieceSelected?.name
      ) {
        state.pieceManipulation = pieceManipulationTesting;
      } else {
        state.pieceManipulation = {
          pieceSelected: { ...action.payload },
          active: true,
        };
      }
    },
    updateSelectedPiece: (state, action: { type: string; payload: any }) => {
      state.selectedPiece = {
        cur: action.payload,
      };
    },
    updatePondPromotion: (state, action: {type: string; payload: any}) => {
        state.PondPromotionControl = {...state.PondPromotionControl, ...action.payload } // overwrites generically
    },
  },
});

export const {
  UpdateChessTestingState,
  UpdateChessBoard,
  updatePieceManipulationTesting,
  updateSelectedPiece,
  updatePondPromotion
} = chessSlice.actions;
export const getTestingState = (state: any) => state.chessState.testing;
export const getBoard = (state: any) => state.chessState.board;
export const getCurrentPieceBeingManipulated = (state: any) =>
  state.chessState.pieceManipulation;
export const getMoveHistory = (state: any) => state.chessState.selectedPiece;
export const getPondPromotion = (state: any) => state.chessState.PondPromotionControl;
export default chessSlice.reducer;
