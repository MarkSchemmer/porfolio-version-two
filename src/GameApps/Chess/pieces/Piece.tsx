import { PieceColor, PieceNames } from "../utils/Utils";

export type EnPassantDetails = {
    turn: number, CanEnPassant: boolean
  }

export class Piece {
    public pieceName: string;
    public pieceColor: PieceColor;
    public hasMoved: boolean = false;

    public pondDoubleMoveTurn: number = 0;

    public enPassantDetails: EnPassantDetails = {
        turn: 0, CanEnPassant: false
    }
      
    
    constructor(pieceName: string, pieceColor: PieceColor) {
        this.pieceName = pieceName;
        this.pieceColor = pieceColor;
    }

    // when piece has moved flip this boolean. 
    public notifyPieceHasMoved = () => {
        this.hasMoved = true;
    }

    public hasPieceMoved = () => this.hasMoved === true;
    public hasPieceNotMoved = () => this.hasMoved === false;
    public IsWhite = () => this.pieceColor === PieceColor.WHITE;
    public IsBlack = () => this.pieceColor === PieceColor.BLACK;

    public ComparePieceType = (pieceName: PieceNames) => {
        return pieceName === this.pieceName;
    }


    public ResetEnPassantDetails = () => {
        this.enPassantDetails = {
            turn: 0, CanEnPassant: false
        }
    }

    public setPondDoubleMoveTurn = (turn: number) => {
        this.pondDoubleMoveTurn = turn;
    }
}