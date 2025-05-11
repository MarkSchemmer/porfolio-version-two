// piece logic layer will be a dependency that is injected into the board...
// via the constructor... Maybe a singleton but basically upon usage 
// it will determine what squares can be visible to move to
// and what not... it can also determine things like a possible castle, 
// check, piece taking piece maybe even that... 


// eventually all pieces will just be passed in with a piece type and two coordinates and board maybe and then logic will 
// happen this is piece of work in time... 
// isolation piece logic as it happens. 

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

    public canPondDoubleMove = (node: Square, n1: Square, n2: Square) => {

        if (n2 === null || n2 === undefined)
            return false;


        return node?.piece?.hasPieceMoved() === false 
        && n1?.SquareHasPiece() === false 
        && n2?.SquareHasPiece() === false; 
    }

    public canPondMoveForwardOneSpace = (node: Square) => {
        if (node === null || node === undefined)
            return false;

        return node?.SquareHasPiece() === false;
    }

    public canPondTake = (fromNode: Square, toNode: Square) => {
        if (toNode === null || toNode === undefined)
            return false;

        return toNode?.SquareHasPiece() && this.pieceIsOtherColor(fromNode, toNode);
    }
}