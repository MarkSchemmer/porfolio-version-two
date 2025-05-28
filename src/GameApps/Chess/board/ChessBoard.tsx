import { Box, Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { Board } from "./Board";
import { MathCoordinate, Square } from "./Square";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateChessBoard,
  getBoard,
  getPondPromotion,
  getCurrentPieceBeingManipulated,
  getMoveHistory,
  getTestingState,
  updateSelectedPiece,
  updatePondPromotion,
} from "../../../store/slices/chessSlice";
import {
  clearBoard,
  coordinateToLetterValueMap,
  getHorizontalRow,
  getNode,
  HandleSquareClickWithPiece,
  isSameSquare,
  PieceColor,
  PieceFactory,
} from "../utils/Utils";
import { current } from "@reduxjs/toolkit";
import { PondPromotion } from "./ChessBoardDialogs/PondPromotion/PondPromotion";

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
            // in future we need to know also that
            // if we move fromTo and it causes check then the method is cancelled
            // And we won't update the board but reset it to current place
            // so we have a moveFromTo and then a check making sure to we can actually do this
            // other wise we just reset...

            // needing an if check if this is a king moving double left or double right then rest of the state ment in the else
            // block

            if (
              boardobj.logic.IsWhiteKingAndDoubleMovingLeft(
                selectedPiece as Square,
                currentSquareClick as Square
              )
            ) {
              console.log("Moving double left");

              boardobj.movePieceFromTo(
                selectedPiece?.mathematicalCoordinate as MathCoordinate,
                currentSquareClick.mathematicalCoordinate
              );

              boardobj.movePieceFromTo([1, 1], [1, 4]);

              const chessBoard = clearBoard(boardobj);
              updateBoardAndSelectedPiece(chessBoard, null);
            } else if (
              boardobj.logic.IsWhiteKingAndDoubleMovingRight(
                selectedPiece as Square,
                currentSquareClick as Square
              )
            ) {
              console.log("Moving double right");

              boardobj.movePieceFromTo(
                selectedPiece?.mathematicalCoordinate as MathCoordinate,
                currentSquareClick.mathematicalCoordinate
              );

              boardobj.movePieceFromTo([1, 8], [1, 6]);

              const chessBoard = clearBoard(boardobj);
              updateBoardAndSelectedPiece(chessBoard, null);
            } else if (
              boardobj.logic.IsBlackKingAndDoubleMovingLeft(
                selectedPiece as Square,
                currentSquareClick as Square
              )
            ) {
              console.log("Moving double left - black");

              boardobj.movePieceFromTo(
                selectedPiece?.mathematicalCoordinate as MathCoordinate,
                currentSquareClick.mathematicalCoordinate
              );

              boardobj.movePieceFromTo([8, 1], [8, 4]);

              const chessBoard = clearBoard(boardobj);
              updateBoardAndSelectedPiece(chessBoard, null);
            } else if (
              boardobj.logic.IsBlackKingAndDoubleMovingRight(
                selectedPiece as Square,
                currentSquareClick as Square
              )
            ) {
              console.log("Moving double right - black");

              boardobj.movePieceFromTo(
                selectedPiece?.mathematicalCoordinate as MathCoordinate,
                currentSquareClick.mathematicalCoordinate
              );

              boardobj.movePieceFromTo([8, 8], [8, 6]);

              const chessBoard = clearBoard(boardobj);
              updateBoardAndSelectedPiece(chessBoard, null);
            } else {
              /*
                The idea is, if white moves does that cause white to be in check, 
                if it is in cheeck we can't move it.

                so If I'm trying to move white, then I take blacks pieces and I check if black is checking white
            
            */
              const currentPlayerColorMoving = selectedPiece?.piece
                ?.pieceColor as PieceColor;

              const chessBoardCopy = boardobj.deepClone();

              chessBoardCopy.movePieceFromTo(
                selectedPiece?.mathematicalCoordinate as MathCoordinate,
                currentSquareClick.mathematicalCoordinate
              );

              const isCausingCheck =
                currentPlayerColorMoving === PieceColor.WHITE
                  ? boardobj.logic.IsWhiteInCheck(chessBoardCopy)
                  : boardobj.logic.IsBlackInCheck(chessBoardCopy);

              if (isCausingCheck === false) {
                boardobj.movePieceFromTo(
                  selectedPiece?.mathematicalCoordinate as MathCoordinate,
                  currentSquareClick.mathematicalCoordinate
                );
              }

              const chessBoard = clearBoard(boardobj);
              updateBoardAndSelectedPiece(chessBoard, null);
            }

            // theoretically we could test if pond moved and hit the end row
            // then trigger a popup.
            if (boardobj.logic.ShouldPondPromote(currentSquareClick)) {
              // trigger screen that cannot be dismissed until
              // show which piece to promote to
              // save that value and then activate a board update where
              // promote that piece to the one selected then of course the turn is ended.
              // make a PondPromotion slice
              // IsOpen, Close ect...
              // beautify the promotion screen
              // add highlighting when hovered over
              // add functionality for black.
              dispatch(
                updatePondPromotion({
                  IsOpen: true,
                  coordinateToPromote:
                    currentSquareClick.mathematicalCoordinate,
                  pieceColor: currentSquareClick?.piece?.pieceColor,
                })
              );
            }

            // going to check if move is causing check
            // so I need all the current players turns moves
            // and color...

            // console.log(allAttackingSquaresWithPieceAndSameColor);

            const currentPlayerColor = currentSquareClick.piece
              ?.pieceColor as PieceColor;

            const isCheck =
              currentPlayerColor === PieceColor.WHITE
                ? boardobj.logic.IsBlackInCheck(boardobj)
                : boardobj.logic.IsWhiteInCheck(boardobj);

            if (isCheck) {
              /*
                  The process is the currPlayerColor is the first move 
                  upon move we calculate the check 
              */
              console.log(
                currentPlayerColor +
                  " Is checking " +
                  (currentPlayerColor === PieceColor.WHITE
                    ? PieceColor.BLACK
                    : PieceColor.WHITE)
              );
              // later on in the future we will place checkmate here if it is so... a check for that.

              // wait to implement king moves first
              // currentPlayerColor is checking
              // player who is in check is opposite color of currentPlayerColor
              const playerChecking = currentPlayerColor;

              const checkCheckMate =
                playerChecking === PieceColor.WHITE
                  ? boardobj.logic.WhiteCheckMatingBlack(boardobj)
                  : boardobj.logic.BlackCheckMatingWhite(boardobj);

              if (checkCheckMate) {
                console.log(
                  currentPlayerColor +
                    " CheckMated " +
                    (currentPlayerColor === PieceColor.WHITE
                      ? PieceColor.BLACK
                      : PieceColor.WHITE)
                );
              }
            }
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
  const isOpen = useSelector(getPondPromotion);
  const chB = boardobj.board;

  return (
    <>
      <PondPromotion IsOpen={isOpen.IsOpen} />
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
    </>
  );
};
