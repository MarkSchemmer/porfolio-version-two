
// will calculate the moves ect here. 
/*
    A board is 64 squares connected. 

    left - right
    forward back
    dialeft diaright
    diabackleft diabackright 
    each connected to the next. 

    Each square has a coordinate. 

    Every square if a piece is on that square dictactes how we look and move then additional layer
    of logic is overlayed. 

    pieces we will implement and in order are: 

    1. Pond
    2. Rook
    3. Knight
    4. Bishop
    5. Queen

*/

/*

        I generated a board or better yet graph board... so board is a graph that takes 
        a Square[][]. 

        That has a root 1-1 Node, which is a Square, then we can use iteration or 
        Recursion ot some point that design decision can be made later. 

        I'm thinking we will just 
*/

import { connectAllSquares, generateBoardOfSquares, getDiagonalLeftToRight, getDiagonalRightToLeft, getBishopMoves, getHorizontalRow, getKnightMoves, getNode, getQueenMoves, getRookMoves, getVerticalRow } from "../utils/Utils";
import { Square } from "./Square";



export class Board {
    // baord needs to be changed for root, 
    // then in constuctor we have a method that will create our 
    // graph, we will have a root, then methods for iteration ect. 
    // we can create a method for spliting the all the nodes (squares)
    // into chunks which will then be rendered. 
    public board: Square[][] = generateBoardOfSquares();
    public rootNode: Square | undefined = getNode([1, 1], this.board);

    public triggerUpdate: any = Date.now();

    constructor() {
        this.boardSetup();
        this.testingMethodsSetupAndOperation();
    }

    public boardSetup = () => {
        this.connectSquares();
    }



    // for testing and visiual testing
    // if I want to test additional things I 
    // add all the logic if. 
    public testingMethodsSetupAndOperation = () => {
        //this.make8_1Green();
    }
    // setup up method.
    public connectSquares = () => {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                let rootNode = this.board[i][j];
                connectAllSquares(this.board, rootNode as Square);
            }
        }
    }
    /*
        Mehtods below this comment are for testing 

        And will be moved enventually into a unit test 

        Type format... 
    */
    // Testing method only. - will comment out later
    // testing left to right 
    public make1_1RowRed = () => {
        const sqs = getHorizontalRow(this.rootNode, []);
        sqs.forEach((sq: Square) => {
            sq.SquareBgColor = "red";
        });
    }

    // testing method only - will comment out later
    // for testing only
    public make2_1ColBlue = () => {
        const node2_1 = getNode([2, 1], this.board);
        const sqs = getVerticalRow(node2_1, []);
        sqs.forEach((sq: Square) => {
            sq.SquareBgColor = "blue";
        });
    }
    // Testing if diagonal left to right is working. 
    // so 1-1 to 8-8 should be purple. 
    public make1_1Purple = () => {
        const sqs = getDiagonalLeftToRight(this.rootNode, []);
        sqs.forEach((sq: Square) => {
            sq.SquareBgColor = "purple";
        });
    }
    // testing if diagonals right to left 
    // function properly. 
    // testing if diagonal right to left functions as well.
    public make8_1Green = () => {
        const node = getNode([1, 8], this.board);
        const sqs = getDiagonalRightToLeft(node, []);
        console.log(sqs);
        sqs.forEach((sq: Square) => {
            sq.SquareBgColor = "green";
        });
    }

    public clearBoardBgColor = () => {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                let rootNode = this.board[i][j];
                rootNode.SquareBgColor = "";
            }
        }
    }

    // testing only
    public updateBoardHorizontal = (coordinate:any) => {
        const node = getNode(coordinate, this.board) as Square;
        const sqs = getHorizontalRow(node, []);
        sqs.forEach((sq: Square) => { sq.SquareBgColor = "blue"; });
        node.SquareBgColor = "gold";
        // console.log(sqs);
    }

    public updateBoardVertical = (coordinate:any) => {
        const node = getNode(coordinate, this.board) as Square;
        const sqs = getVerticalRow(node, []);
        sqs.forEach((sq: Square) => { sq.SquareBgColor = "blue"; });
        node.SquareBgColor = "gold";
        // console.log(sqs);
    }

    
    public updateBoardDiagonal = (coordinate:any) => {
        const node = getNode(coordinate, this.board) as Square;
        const sqs = getBishopMoves(node, []);
        sqs.forEach((sq: Square) => { sq.SquareBgColor = "blue"; });
        node.SquareBgColor = "gold";
        // console.log(sqs);
    }

    public updateRookMoves = (coordinate:any) => {
        const node = getNode(coordinate, this.board) as Square;
        const sqs = getRookMoves(node, []);
        sqs.forEach((sq: Square) => { sq.SquareBgColor = "blue"; });
        node.SquareBgColor = "gold";
        // console.log(sqs);
    }

    public updateQueenMoves = (coordinate:any) => {
        const node = getNode(coordinate, this.board) as Square;
        const sqs = getQueenMoves(node, []);
        sqs.forEach((sq: Square) => { sq.SquareBgColor = "blue"; });
        node.SquareBgColor = "gold";
        // console.log(sqs);
    }

    public updateKnightMoves = (coordinate:any) => {
        const node = getNode(coordinate, this.board) as Square;
        const sqs = getKnightMoves(node, []);
        sqs.forEach((sq: Square) => { sq.SquareBgColor = "blue"; });
        node.SquareBgColor = "gold";
        // console.log(sqs);
    }
}