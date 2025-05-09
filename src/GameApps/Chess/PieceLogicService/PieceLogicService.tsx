// piece logic layer will be a dependency that is injected into the board...
// via the constructor... Maybe a singleton but basically upon usage 
// it will determine what squares can be visible to move to
// and what not... it can also determine things like a possible castle, 
// check, piece taking piece maybe even that... 

import { Square } from "../board/Square";

export class PieceLogicService {
    public pieceIsOtherColor = (fromSquare: Square, toSquare: Square) => {
        const fromPiece = fromSquare?.piece;
        const toPiece = toSquare?.piece;

        // empty square can move there... 
        if (toPiece === null)
            return true;
        // same color meaning making it false
        // but if different colors then true you can move here... 
        return !(fromPiece?.pieceColor === toPiece?.pieceColor);
    }

    public pieceIsSameColor = (fromSquare: Square, toSquare: Square) => {
        const fromPiece = fromSquare?.piece;
        const toPiece = toSquare?.piece;

        // empty square can move there... 
        if (toPiece === null)
            return true;
        // same color meaning making it false
        // but if different colors then true you can move here... 
        return (fromPiece?.pieceColor === toPiece?.pieceColor);
    }
}