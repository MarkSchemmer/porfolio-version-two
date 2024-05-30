/*
    Shared types, and pure methods. 

    To avoid the issues of dealing with classes and types performing in their Typescript way. 
*/

import { Square } from "../board/Square";

export enum PieceNames {
    POND = "POND",
    ROOK = "ROOK",
    KNIGHT = "KNIGHT",
    BISHOP = "BISHOP",
    QUEEN = "QUEEN",
    KING = "KING",
}

export enum letterCoordinate {
    A,
    B,
    C,
    D, 
    E,
    F,
    G,
    H
}

export const letterCoordinateValueMap = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8
}

export const generateBoardOfSquares = (): Square[][] => {
    let res = Object.entries(letterCoordinateValueMap).reverse()
    .map(([key, value]) => {
        return Array(8).fill(0).map((_, i) => new Square([value, i+1]))
    });

    console.log(res);
    return res;
}

export function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }