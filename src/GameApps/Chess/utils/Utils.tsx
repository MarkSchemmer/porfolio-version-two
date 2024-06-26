/*
    Shared types, and pure methods. 

    To avoid the issues of dealing with classes and types performing in their Typescript way. 
*/

import { MathCoordinate, Square } from "../board/Square";


export const isNullOrUndefined = (obj:any) => obj === null || obj === undefined;
export const isValue = (obj:any) => !isNullOrUndefined(obj); 

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
    for (let row = 0; row < 8; row++) {
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
        if (isNullOrUndefined(rootNode.right))
            rootNode.right = nextNode;
        if (isNullOrUndefined(nextNode.left))
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
        if (isNullOrUndefined(rootNode.forward))
            rootNode.forward = nextNode;
        if (isNullOrUndefined(rootNode.back))
            nextNode.back = rootNode;
        connectBToT(board, nextNode);
    }
}

// connect diagonal left to diagonal right
const connectDiagLToDiagR = (board: Square[][], rootNode: Square) => {
    // break guard
    if (rootNode === null || rootNode === undefined) {return;}
    // connecting 1-1 to 1-8
    // connecting only one line  left to right.
    const [rootX, rootY] = rootNode.mathematicalCoordinate;
    let nextNode = getNode([rootX+1, rootY+1], board);

    if (nextNode) {
        
        if (isNullOrUndefined(rootNode.diagonalRight))
            rootNode.diagonalRight = nextNode;
        if (isNullOrUndefined(rootNode.diagonalBackLeft))
            nextNode.diagonalBackLeft = rootNode;
        connectDiagLToDiagR(board, nextNode);
    }
}

// connect diagonal right to diagonal left
const connectDiagRToDiagL = (board: Square[][], rootNode: Square) => {
    // break guard
    if (rootNode === null || rootNode === undefined) {return;}
    // connecting 1-1 to 1-8
    // connecting only one line  left to right.
    const [rootX, rootY] = rootNode.mathematicalCoordinate;
    let nextNode = getNode([rootX+1, rootY-1], board);

    if (nextNode) {
        // && rootNode.diagonalLeft === undefined && nextNode.diagonalBackRight
        if (isNullOrUndefined(rootNode.diagonalLeft))
            rootNode.diagonalLeft = nextNode;
        if (isNullOrUndefined(rootNode.diagonalBackRight))
            nextNode.diagonalBackRight = rootNode;
        connectDiagRToDiagL(board, nextNode);
    }
}

export const connectAllSquares = (board: Square[][], rootNode: Square) => {
    // connect left to right -> now we can iterate forwards and backwards
    // so for example 1-1 will be all connected with 1-8
    connectLToR(board, rootNode);

    // connecting bottom top
    // so for example 1-1 will be all connected with 8-1
    connectBToT(board, rootNode);

    // connecting diagonals, so 1-1 to 8-8...
    connectDiagLToDiagR(board, rootNode);

    // connecting diagonals from right to left so for example
    // 1-8 to 8-1
    connectDiagRToDiagL(board, rootNode);
}

// I can add a layer of chess rules to determine if we can get that square. 
// and the pieces themselves can use these methods for finding next moves ect. 
export const getHorizontalRightRow = (node: Square | undefined, squares: Square[]): any => {
    return node === undefined ? squares : getHorizontalRightRow(node.right, [...squares, node])
}

export const getHorizontalLeftRow = (node: Square | undefined, squares: Square[]): any => {
    return node === undefined ? squares : getHorizontalLeftRow(node.left, [...squares, node])
}

export const getHorizontalRow = (node: Square | undefined, squares: Square[]): any => {
    const rightRow = getHorizontalRightRow(node?.right, []);
    const leftRow = getHorizontalLeftRow(node?.left, []);
    return [...leftRow, node, ...rightRow];
}





// I can add a layer of chess rules to determine if we can get that square. 
// and the pieces themselves can use these methods for finding next moves ect. 
export const getVerticalForwardColumn = (node: Square | undefined, squares: Square[]): any => {
    return node === undefined ? squares : getVerticalForwardColumn(node.forward, [...squares, node])
}

export const getVerticalBackColumn = (node: Square | undefined, squares: Square[]): any => {
    return node === undefined ? squares : getVerticalBackColumn(node.back, [...squares, node])
}

export const getVerticalRow = (node: Square | undefined, squares: Square[]): any => {
    const forwardRow = getVerticalForwardColumn(node?.forward, []);
    const backwardRow = getVerticalBackColumn(node?.back, []);
    return [...forwardRow, node, ...backwardRow];
}

export const getDiagonalLeftToRight = (node: Square | undefined, squares: Square[]): any => {
    return node === undefined ? squares : getDiagonalLeftToRight(node.diagonalRight, [...squares, node])
}

export const getDiagonalRightToLeft = (node: Square | undefined, squares: Square[]): any => {
    return node === undefined ? squares : getDiagonalRightToLeft(node.diagonalLeft, [...squares, node])
}

export function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}