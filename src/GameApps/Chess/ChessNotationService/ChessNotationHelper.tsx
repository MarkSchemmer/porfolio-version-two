import { Box } from "@chakra-ui/react";
import { MoveState } from "../ChessMoveBuffer/Move";
import {
  coordinateToLetterValueMap,
  PieceColor,
  pieceImages,
  PieceNames,
} from "../utils/Utils";
import { MathCoordinate } from "../board/Square";

class ChessNotationHelper {
  public convertChessCoordinateToNotation = (coordinate: MathCoordinate) => {
    const [x, y] = coordinate;

    const xCoord = (coordinateToLetterValueMap as any)[y.toString()];

    return (
      <strong>
        {xCoord}-{x}
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
    return (
      <Box
        style={{
          display: "flex",
          alignItems: "center", // aligns items vertically centered (inline baseline)
          gap: "0.5rem",
        }}
      >
      <Box minWidth="3rem" textAlign="left">
        * {move.currentTurn} - 
      </Box>
        <span>
          <img
            style={{ height: "3vh", opacity: 0.4 }}
            src={this.pieceImageFactory(
              move.movedPiece.pieceName,
              move.movedPiece.pieceColor
            )}
          />
        </span>
        {this.convertChessCoordinateToNotation(move.to)}
      </Box>
    );
  };
}

export default new ChessNotationHelper();
