/*
    Shared types, and pure methods. 

    To avoid the issues of dealing with classes and types performing in their Typescript way. 
*/

import { MathCoordinate, Square } from "../board/Square";

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

    //console.log(res);
    return res;
}

export const getNode = ([x, y]: MathCoordinate, board: Square[][]): Square | undefined => {
    for (let row = 0; row < 8; row++){
        for (let col = 0; col < 8; col++) {
            const sq = board[row][col];
            const [sqX, sqY] = sq.mathematicalCoordinate;
            if (x === sqX && y === sqY) { return sq; }
        }
    } 
    return undefined;
}

// This will go right -> 
// Then when it hits max it go to basically the start and increment x
// left to right
// bottom to top is the movement of the square node. 
export const incrementSquareNode = (sq: Square) => {

}


// connect left to right helper
const connectLToR = (board: Square[][], rootNode: Square) => {
    // break guard
    if (rootNode === null || rootNode === undefined) {return;}
    // connecting 1-1 to 1-8
    // connecting only one line  left to right.
    const [rootX, rootY] = rootNode.mathematicalCoordinate;
    let nextNode = getNode([rootX, rootY+1], board);

    if (nextNode) {
        rootNode.right = nextNode;
        nextNode.left = rootNode;
        connectLToR(board, nextNode);
    }
}

// connect bottom to top helper 
const connectBToT = (board: Square[][], rootNode: Square) => {
    // break guard
    if (rootNode === null || rootNode === undefined) {return;}
    // connecting 1-1 to 1-8
    // connecting only one line  left to right.
    const [rootX, rootY] = rootNode.mathematicalCoordinate;
    let nextNode = getNode([rootX+1, rootY], board);

    if (nextNode) {
        rootNode.forward = nextNode;
        nextNode.back = rootNode;
        connectBToT(board, nextNode);
    }
}

// connect diagonal left to diagonal right
const connectDiagLToDiagR = () => {

}

// connect diagonal right to diagonal left
const connectDiagRToDiagL = () => {

}

export const connectAllSquares = (board: Square[][], rootNode: Square) => {
    // connect left to right -> now we can iterate forwards and backwards
    // so for example 1-1 will be all connected with 1-8
    connectLToR(board, rootNode);

    // connecting bottom top
    // so for example 1-1 will be all connected with 8-1
    connectBToT(board, rootNode);
}

// I can add a layer of chess rules to determine if we can get that square. 
// and the pieces themselves can use these methods for finding next moves ect. 
export const getHorizontalRow = (node: Square | undefined, squares: Square[]): any => {
    return node === undefined ? squares : getHorizontalRow(node.right, [...squares, node])
}

// I can add a layer of chess rules to determine if we can get that square. 
// and the pieces themselves can use these methods for finding next moves ect. 
export const getVerticalColumn = (node: Square | undefined, squares: Square[]): any => {
    return node === undefined ? squares : getVerticalColumn(node.forward, [...squares, node])
}

export function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}