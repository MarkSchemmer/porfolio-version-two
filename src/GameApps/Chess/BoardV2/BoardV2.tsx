import React from "react";
import { ChessDashboard } from "../ChessDashboard/ChessDashboard";
import { Box, Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBoard,
  getCurrentPieceBeingManipulated,
  getMoveHistory,
  getPondPromotion,
  UpdateChessBoard,
  updatePondPromotion,
  updateSelectedPiece,
} from "../../../store/slices/chessSlice";
import { Board } from "../board/Board";
import { PondPromotion } from "../board/ChessBoardDialogs/PondPromotion/PondPromotion";
import {
  clearBoard,
  coordinateToLetterValueMap,
  HandleSquareClickWithPiece,
  isSameSquare,
  PieceColor,
  PieceFactory,
} from "../utils/Utils";
import { MathCoordinate, Square } from "../board/Square";
import { MoveState } from "../ChessMoveBuffer/Move";
import { EndGameHandler } from "../utils/EndGameHandler";
import SettingsService from "../SettingsService/SettingsService";

const BoardPiece = (props: {
  sq: Square;
  xy: [x: number, y: number];
  bottomRight: string;
}) => {
  const [x, y] = props.xy;
  const bottomRight = props.bottomRight;
  return (
    <Box width={"100%"} height={"100%"}>
      <Box padding={"5px"}>
        {y === 1 ? (
          <Box style={{ position: "absolute", left: 1, fontWeight: "bolder" }}>
            {x}
          </Box>
        ) : null}

        {x === 1 ? (
          <Box
            style={{
              position: "absolute",
              bottom: 0,
              left: 1,
              fontWeight: "bolder",
            }}
          >
            {bottomRight}
          </Box>
        ) : null}

        {props.sq?.SquareHasPiece() ? (props as any)?.sq?.piece?.draw() : null}
      </Box>
    </Box>
  );
};

export const BoardV2 = () => {
  // will update the input into Board later to be proper.
  const boardobj = useSelector(getBoard) as Board;
  const playerToMove =
    boardobj.turn % 2 === 0 ? PieceColor.WHITE : PieceColor.BLACK;
  const isOpen = useSelector(getPondPromotion);
  const chB = boardobj.board;
  const dispatch = useDispatch();

  const selectedPiece = useSelector(getMoveHistory).cur as Square | null;

  const updateBoardAndSelectedPiece = (board: Board, piece: Square | null) => {
    dispatch(UpdateChessBoard(board));
    dispatch(updateSelectedPiece(piece));
  };

  return (
    <>
      <PondPromotion IsOpen={isOpen.IsOpen} />
      <Box display={"flex"} flexDirection={"row"}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            gridTemplateRows: "repeat(8, 1fr)",
            width: "80%",
            height: "80%",
            maxWidth: "min(80vmin, 80vh)",
            aspectRatio: "1",
            border: "4px solid black",
            marginRight: "25px",
            minWidth: "400px",
            borderRadius: "5px",
          }}
        >
          {boardobj.board
            .flatMap((s) => s)
            .map((sq: Square) => {
              const [x, y] = sq.mathematicalCoordinate;
              const bottomRight = (coordinateToLetterValueMap as any)[
                y.toString()
              ];
              const currentSquareClick = boardobj.getSquare([x, y]);
              // if we select square and it has a piece we populate with this square.
              const bgColor = SettingsService.GetBackGroundColor(sq);

              return (
                <div
                  key={sq.id}
                  onClick={() => {
                    console.log(sq.mathematicalCoordinate);
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
                      const chessBoard = HandleSquareClickWithPiece(
                        [x, y],
                        boardobj
                      );
                      updateBoardAndSelectedPiece(
                        chessBoard,
                        currentSquareClick
                      );
                    } else if (currentSquareClick.canMoveHere() && selectedPiece?.piece?.pieceColor === playerToMove) {
                      // in future we need to know also that
                      // if we move fromTo and it causes check then the method is cancelled
                      // And we won't update the board but reset it to current place
                      // so we have a moveFromTo and then a check making sure to we can actually do this
                      // other wise we just reset...

                      // needing an if check if this is a king moving double left or double right then rest of the state ment in the else
                      // block

                      const craftMove = boardobj.craftMove(
                        selectedPiece?.mathematicalCoordinate as MathCoordinate,
                        currentSquareClick.mathematicalCoordinate,
                        boardobj,
                        false
                      );
                      /*
                    The idea is, if white moves does that cause white to be in check, 
                    if it is in cheeck we can't move it.

                    so If I'm trying to move white, then I take blacks pieces and I check if black is checking white
            
              */
                      const currentPlayerColorMoving = selectedPiece?.piece
                        ?.pieceColor as PieceColor;

                      boardobj.moveBuffer.recordMove(craftMove);

                      boardobj.makeMove(
                        boardobj.moveBuffer.LastMove as MoveState
                      );

                      const isCausingCheck =
                        currentPlayerColorMoving === PieceColor.WHITE
                          ? boardobj.logic.IsWhiteInCheck(boardobj)
                          : boardobj.logic.IsBlackInCheck(boardobj);

                      if (isCausingCheck) {
                        const lastMove =
                          boardobj.moveBuffer.deepUndo() as MoveState;
                        boardobj.undoMove(lastMove);
                      }

                      const chessBoard = clearBoard(boardobj) as Board;
                      const hash = chessBoard.generateHash(
                        chessBoard,
                        chessBoard.turn
                      );
                      // console.log(hash);
                      chessBoard.updatePositionHistory(hash);
                      updateBoardAndSelectedPiece(chessBoard, null);
                      //console.log(chessBoard.turn);
                      // theoretically we could test if pond moved and hit the end row
                      // then trigger a popup.
                      if (craftMove.special.promotion) {
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

                      // Going to check
                      // - Check
                      // - CheckMate
                      // - Stalemate
                      EndGameHandler(
                        currentSquareClick.piece?.pieceColor as PieceColor,
                        boardobj
                      );
                    } else {
                      // Right now this is clicking a none blue square and just unselects the piece
                      // should unselect piece and clearboard.
                      const chessboard = clearBoard(boardobj);
                      updateBoardAndSelectedPiece(chessboard, null);
                    }
                  }}
                  style={{
                    border: "1px solid black",
                    backgroundColor: bgColor,
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <BoardPiece
                    key={sq.id}
                    sq={sq}
                    bottomRight={bottomRight}
                    xy={[x, y]}
                  />
                </div>
              );
            })}
        </div>
        <ChessDashboard />
      </Box>
    </>
  );
};
