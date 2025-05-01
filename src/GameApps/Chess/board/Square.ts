/*
    Create an algorithm for generating the board and giving each square a coordinate. 

    Find a algorithm for splitting all squares into 8. 

    Then render all squares with mathematical coordinate
*/

import { Piece } from "../pieces/Piece";
import { uuidv4 } from "../utils/Utils";

export type MathCoordinate = [ number, number ]; 

export class Square {

    public id = uuidv4();

    public possiblePieceMove: boolean = false;

    public left?: Square;
    public right?: Square;
    public forward?: Square;
    public back?:Square;
    public diagonalLeft?: Square;
    public diagonalRight?: Square;
    public diagonalBackLeft?: Square;
    public diagonalBackRight?: Square;

    public mathematicalCoordinate: MathCoordinate;

    public piece: Piece | null | undefined = null;

    // Testing props will be commented out later.
    // Do not use.
    public SquareBgColor: string = "none";

    constructor(mathematicalCoordinate: [number, number]) {
        this.mathematicalCoordinate = mathematicalCoordinate;
    }

    public SquareHasPiece = (): boolean => {
        return this.piece !== null && this.piece !== undefined;
    }

    public makeSquareMoviable = (bgColor: string) => {
        this.SquareBgColor = bgColor;
        this.possiblePieceMove = true;
    }

    public canMoveHere = (): boolean => this.possiblePieceMove === true;
}