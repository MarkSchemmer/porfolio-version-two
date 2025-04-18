export class Piece {
    public pieceName: string;
    public hasMoved: boolean = false;
    
    constructor(pieceName: string) {
        this.pieceName = pieceName;
    }
}