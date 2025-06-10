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
    /*
  
        1. Stalemate (above)

        2. Insufficient Material
        Neither side can checkmate:

        King vs King

        King vs King + Bishop

        King vs King + Knight

        Detection: count active pieces and types.

        3. Threefold Repetition
        Same position occurs 3 times (not necessarily consecutively).

        Detection: requires position hashing (Zobrist hash or similar) and storing a move history.

        4. 50-Move Rule
        If 50 consecutive moves happen without a pawn move or capture, either player can claim a draw.

        Detection:

        Maintain a halfMoveClock counter.

        Reset to 0 on pawn move or capture.

        5. Mutual Agreement (manual)
        Not programmatically enforced unless you're building a GUI/UI interface for draw offers.
  
  
  */

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
      console.log(otherPlayerBeingChecked + " Has no moves, STALEMATE.");
    }

    const isInsuficientMaterial = chessBoard.logic.InsuficentMaterial(chessBoard);

    console.log(isInsuficientMaterial)

    if (isInsuficientMaterial) {
      console.log(" Insuficient Material Stalemate ");
    }
  }
};
