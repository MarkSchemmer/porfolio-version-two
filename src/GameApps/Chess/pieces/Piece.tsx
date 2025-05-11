import { PieceColor } from "../utils/Utils";

export class Piece {
    public pieceName: string;
    public pieceColor: PieceColor;
    public hasMoved: boolean = false;
    
    constructor(pieceName: string, pieceColor: PieceColor) {
        this.pieceName = pieceName;
        this.pieceColor = pieceColor;
    }

    // when piece has moved flip this boolean. 
    public notifyPieceHasMoved = () => {
        this.hasMoved = true;
    }

    public hasPieceMoved = () => this.hasMoved === true;
}