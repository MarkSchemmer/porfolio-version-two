export class Piece {
    public pieceName: string;
    public pieceImageName: string;
    public hasMoved: boolean = false;
    
    constructor(pieceName: string, pieceImageName: string) {
        this.pieceName = pieceName;
        this.pieceImageName = pieceImageName;

    }
}