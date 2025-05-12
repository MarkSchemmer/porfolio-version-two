import { Box, Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { Board } from "./Board";
import { MathCoordinate, Square } from "./Square";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateChessBoard,
  getBoard,
  getCurrentPieceBeingManipulated,
  getMoveHistory,
  getTestingState,
  updateSelectedPiece,
} from "../../../store/slices/chessSlice";
import {
  clearBoard,
  coordinateToLetterValueMap,
  getHorizontalRow,
  getNode,
  HandleSquareClickWithPiece,
  isSameSquare,
  PieceFactory,
} from "../utils/Utils";
import { current } from "@reduxjs/toolkit";

// Will draw the board.
const RowHolder = (props: any) => {
  return (
    <Flex wrap="wrap" justifyContent="space-between" bg={props.bg || "none"}>
      {props.squares.map((sq: Square) => (
        <BoardPiece key={sq.id} sq={sq} />
      ))}
    </Flex>
  );
};

const BoardPiece = (props: any) => {
  const [state, setState] = useState({ color: "none" });
  const [x, y] = props.sq.mathematicalCoordinate as [number, number];
  const dispatch = useDispatch();
  const testing = useSelector(getTestingState);
  const boardobj = useSelector(getBoard) as Board;
  const chessPieceManipulation = useSelector(getCurrentPieceBeingManipulated);

  const bottomRight = (coordinateToLetterValueMap as any)[y.toString()];
  const currentSquareClick = boardobj.getSquare([x, y]);
  // if we select square and it has a piece we populate with this square.
  const selectedPiece = useSelector(getMoveHistory).cur as Square | null;

  const updateBoardAndSelectedPiece = (board: Board, piece: Square | null) => {
    dispatch(UpdateChessBoard(board));
    dispatch(updateSelectedPiece(piece));
  };

  return (
    <Flex
      alignItems={"center"}
      onClick={() => {
        if (Object.values(testing).some((v) => v)) {
          // console.log('testing block')
          // console.log(testing)
          if (testing.horozontal) {
            // get left and right squares make them blue and
            // the selected root node of this square gold...
            boardobj.clearBoardBgColor();
            boardobj.updateBoardHorizontal([x, y]);
            dispatch(UpdateChessBoard(boardobj));
          }

          if (testing.vertical) {
            // get left and right squares make them blue and
            // the selected root node of this square gold...
            boardobj.clearBoardBgColor();
            boardobj.updateBoardVertical([x, y]);
            dispatch(UpdateChessBoard(boardobj));
          }

          if (testing.diagonal) {
            boardobj.clearBoardBgColor();
            boardobj.updateBishopMoves([x, y]);
            dispatch(UpdateChessBoard(boardobj));
          }

          if (testing.rook) {
            boardobj.clearBoardBgColor();
            boardobj.updateRookMoves([x, y]);
            dispatch(UpdateChessBoard(boardobj));
          }

          if (testing.knight) {
            boardobj.clearBoardBgColor();
            boardobj.updateKnightMoves([x, y]);
            dispatch(UpdateChessBoard(boardobj));
          }

          if (testing.queen) {
            boardobj.clearBoardBgColor();
            boardobj.updateQueenMoves([x, y]);
            dispatch(UpdateChessBoard(boardobj));
          }
        } else if (chessPieceManipulation.active === true) {
          // console.log('piece manipulation block');
          const { name, pieceColor } = chessPieceManipulation.pieceSelected;
          const piece = PieceFactory(name, pieceColor);
          boardobj.populateSquareWithPiece([x, y], piece);
          dispatch(UpdateChessBoard(boardobj));
        } else {
          // if the board is click check if piece is there then if the piece is there
          // we need a signal that activates and store active piece, [x, y] coordinate as well
          // I'm guessing what I can do is I can pass the piecename, coordinate, and finally piece color
          // use this information to check if a piece exists in this coordinate if so then we calculate the moves it can move

          // ------------------------------------------------------------------------------------------------------------------
          // ------------------------------------------------------------------------------------------------------------------

          // the code below this, will click a piece and render the moves on the board
          // But now we need a mechanism for an active piece so... we can click a square and move that if it's
          // one of the valid squares it can actually move to.

          // I clicked a square but it's already  been selected we unselect this square so we clear the board.
          if (
            currentSquareClick.SquareHasPiece() &&
            selectedPiece &&
            isSameSquare(
              currentSquareClick.mathematicalCoordinate,
              selectedPiece.mathematicalCoordinate
            )
          ) {
            const chessboard = clearBoard(boardobj);
            // update board and make unselect piece by making it null.
            updateBoardAndSelectedPiece(chessboard, null);
          }
          // need to check if we are clicking a square that has a piece if it does then we select that piece and show moves to make
          else if (
            currentSquareClick.SquareHasPiece() &&
            selectedPiece === null
          ) {
            const chessBoard = HandleSquareClickWithPiece([x, y], boardobj);
            updateBoardAndSelectedPiece(chessBoard, currentSquareClick);
          } else if (currentSquareClick.canMoveHere()) {
            boardobj.movePieceFromTo(
              selectedPiece?.mathematicalCoordinate as MathCoordinate,
              currentSquareClick.mathematicalCoordinate
            );
            const chessBoard = clearBoard(boardobj);
            updateBoardAndSelectedPiece(chessBoard, null);
          } else {
            // Right now this is clicking a none blue square and just unselects the piece
            // should unselect piece and clearboard.
            const chessboard = clearBoard(boardobj);
            updateBoardAndSelectedPiece(chessboard, null);
          }
        }

        // dispatch for next calculation...

        //console.log("prev square: ", currentHistory.prev?.mathematicalCoordinate);
        //console.log("current square: ", currentHistory.current?.mathematicalCoordinate);
      }}
      // bg={(x=== 1 && y === 1) ? "red": state.color}
      w={"99px"}
      h={"100px"}
      border={"1px solid black"}
      display={"inline-block"}
      bg={props.sq.SquareBgColor}
    >
      {y === 1 ? (
        <strong
          style={{
            paddingLeft: "5px",
            paddingTop: "5px",
            position: "absolute",
          }}
        >
          {x}
        </strong>
      ) : null}
      {props.sq.piece ? (
        <Box position={"absolute"}>{props.sq.piece.draw()}</Box>
      ) : null}
      {/*     
                    width: 10px;
                    margin-left: calc(100% - 20px); */}
      {x === 1 ? (
        <strong
          style={{
            position: "absolute",
            paddingLeft: "82px",
            paddingTop: "70px",
          }}
        >
          {bottomRight}
        </strong>
      ) : null}
    </Flex>
  );
};

export const ChessBoard = () => {
  // will update the input into Board later to be proper.
  const boardobj = useSelector(getBoard);
  const chB = boardobj.board;

  return (
    <Box
      w={"802px"}
      h={"802px"}
      border={"1px solid black"}
      m={"auto"}
      mt={"50px"}
    >
      {chB.map((row: Square[], idx: number) => (
        <RowHolder key={idx} squares={row} />
      ))}
    </Box>
  );
};
