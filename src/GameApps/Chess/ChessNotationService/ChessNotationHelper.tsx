import { Box } from "@chakra-ui/react";
import { MoveState } from "../ChessMoveBuffer/Move";
import {
  coordinateToLetterValueMap,
  PieceColor,
  pieceImages,
  PieceNames,
} from "../utils/Utils";
import { MathCoordinate } from "../board/Square";

const chessNotationSymbols = {
  capture: "x",
  draw: "1/2 - 1/2",
  enPassant: "e.p.",
  check: "+",
  checkMate: "#",
  promotion: "=",
  kingSideCastle: "O-O",
  queenSideCastle: "O-O-O",
};

class ChessNotationHelper {
  public chessNotationSymbols = chessNotationSymbols;

  public convertChessCoordinateToNotation = (coordinate: MathCoordinate) => {
    const [x, y] = coordinate;

    const xCoord = (coordinateToLetterValueMap as any)[y.toString()];

    return (
      <strong>
        {xCoord}
        {x}
      </strong>
    );
  };

  public pieceImageFactory = (
    pieceName: PieceNames,
    pieceColor: PieceColor
  ) => {
    const isWhite = pieceColor === PieceColor.WHITE;
    switch (pieceName) {
      case PieceNames.POND: {
        return isWhite ? pieceImages.whitePondImg : pieceImages.blackPondImg;
      }
      case PieceNames.KNIGHT: {
        return isWhite
          ? pieceImages.whiteKnightImg
          : pieceImages.blackKnightImg;
      }
      case PieceNames.BISHOP: {
        return isWhite
          ? pieceImages.whiteBishopImg
          : pieceImages.blackBishopImg;
      }
      case PieceNames.ROOK: {
        return isWhite ? pieceImages.whiteRookImg : pieceImages.blackRookImg;
      }
      case PieceNames.QUEEN: {
        return isWhite ? pieceImages.whiteQueenImg : pieceImages.blackQueenImg;
      }
      case PieceNames.KING: {
        return isWhite ? pieceImages.whtieKingImg : pieceImages.blackKingImg;
      }
      default: {
        return "";
      }
    }
  };

  public processMoveForDisplay = (move: MoveState) => {
    const isCheck = move.isCheck === true && !move.isCheckMate;
    const isCheckMate = move.isCheck === true && move.isCheckMate === true;
    const isCastle = move?.special?.castleKing?.desc;
    const isEnpassant = move?.special?.enPassantCapture;
    const isPromotion = move?.special?.promotion;
    const promotedTo = isPromotion ? <img
            style={{ height: "3vh", opacity: 0.5 }}
            src={this.pieceImageFactory(
              move.special.promotion?.piecePromotedTo?.pieceName as PieceNames,
              move.special.promotion?.piecePromotedTo?.pieceColor as PieceColor
            )}
          /> : null;
    const display = isCastle ? (
      isCastle
    ) : (
      <>
        <span>
          <img
            style={{ height: "3vh", opacity: 0.5 }}
            src={this.pieceImageFactory(
              move.movedPiece.pieceName,
              move.movedPiece.pieceColor
            )}
          />
        </span>
        {(move.capturedPiece  || isEnpassant) ? this.chessNotationSymbols.capture : null}
        {" "}
        {this.convertChessCoordinateToNotation(move.to)}
        {isPromotion ? (this.chessNotationSymbols.promotion) : null} {promotedTo}
        {isEnpassant ? chessNotationSymbols.enPassant : null}
      </>
    );
    return (
      <Box
        key={JSON.stringify(move)}
        style={{
          display: "flex",
          alignItems: "center", // aligns items vertically centered (inline baseline)
          gap: "0.5rem",
          border: move.currentMove ? '3px solid black' : '',
          padding: '5px',
          borderRadius: '3px'
        }}
      >
        <Box minWidth="3rem" textAlign="left">
          * {move.currentTurn} -
        </Box>
        {display}
        {(isCheck && chessNotationSymbols.check) || null}{" "}
        {(isCheckMate && chessNotationSymbols.checkMate) || null}
      </Box>
    );
  };
}

export default new ChessNotationHelper();
