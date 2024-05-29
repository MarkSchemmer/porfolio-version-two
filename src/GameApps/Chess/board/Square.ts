export class Square {
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