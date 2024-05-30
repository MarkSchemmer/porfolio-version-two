
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

import { generateBoardOfSquares } from "../utils/Utils";
import { Square } from "./Square";



export class Board {
    // baord needs to be changed for root, 
    // then in constuctor we have a method that will create our 
    // graph, we will have a root, then methods for iteration ect. 
    // we can create a method for spliting the all the nodes (squares)
    // into chunks which will then be rendered. 
    public board: Square[][] = generateBoardOfSquares();
    constructor(primitiveBoard: Square[][]) {

    }
}