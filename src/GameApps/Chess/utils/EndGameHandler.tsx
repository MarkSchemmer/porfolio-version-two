import { Board } from "../board/Board";
import { PieceColor } from "./Utils";

export const EndGameHandler = (
  currentPlayerColor: PieceColor,
  chessBoard: Board
) => {
  const isCheck =
    currentPlayerColor === PieceColor.WHITE
      ? chessBoard.logic.IsBlackInCheck(chessBoard)
      : chessBoard.logic.IsWhiteInCheck(chessBoard);

  const playerChecking = currentPlayerColor;
  const otherPlayerBeingChecked =
    playerChecking === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;

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

    const checkCheckMate =
      playerChecking === PieceColor.WHITE
        ? chessBoard.logic.WhiteCheckMatingBlack(chessBoard)
        : chessBoard.logic.BlackCheckMatingWhite(chessBoard);

    if (checkCheckMate) {
      console.log(
        currentPlayerColor +
          " CheckMated " +
          (currentPlayerColor === PieceColor.WHITE
            ? PieceColor.BLACK
            : PieceColor.WHITE)
      );
    }
  } else {





    // will need to check opposite player
    // because if the opposite player has no moves it's a stalemate
    // needing to check stalmate
    // insuficientmaterial
    // ThreeFold repition
    // 50-move Rule

    const isStaleMate = chessBoard.logic.IsStaleMate(
      otherPlayerBeingChecked,
      chessBoard
    );

    if (isStaleMate) {
        console.log(
            otherPlayerBeingChecked + " Has no moves, STALEMATE."
        );
    }
  }
};
