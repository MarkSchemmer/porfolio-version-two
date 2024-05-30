/*
    Create an algorithm for generating the board and giving each square a coordinate. 

    Find a algorithm for splitting all squares into 8. 

    Then render all squares with mathematical coordinate
*/

import { uuidv4 } from "../utils/Utils";

export class Square {

    public id = uuidv4();

    public left?: Square;
    public right?: Square;
    public forward?: Square;
    public back?:Square;
    public diagonalLeft?: Square;
    public diagonalRight?: Square;
    public diagonalBackLeft?: Square;
    public diagonalBackRight?: Square;

    public mathematicalCoordinate: [number, number];

    constructor(mathematicalCoordinate: [number, number]) {
        this.mathematicalCoordinate = mathematicalCoordinate;
    }
}