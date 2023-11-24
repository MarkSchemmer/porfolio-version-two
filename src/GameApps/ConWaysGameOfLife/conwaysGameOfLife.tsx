import React from "react";
import Board from "../../Utils/GameBoard/GameBoard";
import { IBoardDimensions, Point, Rectangle, range } from "../../Utils/Util";


let generatingBoard = (row: number, col:number, resolution: number):BoardCell[][] => {
    return range(1, col).map((i, x) => range(1, row).map((ii, y) => new BoardCell(x, y, resolution)));
 };

export interface IBoardCell { 
    isAlive: Boolean;
    killCell: () => void;
    generateCell: () => void;
};

export class BoardCell {
    public p: Point;
    public resolution: number;
    public isAlive: boolean = false;
    public killCell = () => { this.isAlive = false; }
    public generateCell = () => { this.isAlive = true; }

    public rectangle: Rectangle;

    constructor(x: number, y: number, r: number) {
        this.p = new Point(x, y);
        this.resolution = r;
        this.rectangle = new Rectangle(this.p, this.resolution);
    }

    public draw = (ctx:any) => {
        console.log(ctx);
        this.rectangle.draw(ctx);
    }
};

const boardDimensions: IBoardDimensions = {
    width: 500,
    height: 500,
    resolution: 20
};
let width = 500;
let height = 500;
let r = 10;


let rows = width / r;
let columns = height / r;
let grid = generatingBoard(rows, columns, r);

// board.map((boardCellArray, x) => boardCellArray.map((bc, y) => {  bc.draw(ctx); } ));

let DrawBoard = (ctx:any) => {
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
          ctx.clearRect(col * r, row * r, r, r);
          const cell: BoardCell = grid[col][row];
          ctx.beginPath();
          ctx.lineWidth = 0.5
          ctx.rect(col * r, row * r, r, r);
          ctx.stroke();
          if (cell.isAlive) { ctx.fill(); }
        }
      }
}

const handleBoardClick = (c:any) => (e:any) => {
    // console.log(c);
    //console.log(c.canvas);

    // console.log(grid.length);
    // let rect = c.canvas.getBoundingClientRect(); 
    // let x = Math.floor(e.clientX - rect.left); 
    // let y = Math.floor(e.clientY - rect.top); 
    // console.log("Coordinate x: " + (x),  
    //             "Coordinate y: " + y); 

    const x = e.pageX - c.canvas.offsetLeft;
    const y = e.pageY - c.canvas.offsetTop;

    if (y >= 0 && y <= y + r) {
            console.log("Coordinate x: " + (x),  
                "Coordinate y: " + y); 
    }

    // const x = e.pageX - c.canvas.offsetLeft;
    // const y = e.pageY - c.canvas.offsetTop;
    // //console.log(x);
    // console.log();
    // // console.log(x);
    // // console.log(y);
    // if (y >= 0 && y <= y + r) {
    //     const indexOfX = Math.floor(x / r);
    //     const indexOfY = Math.floor(y / r);  
    //     let cell = grid[indexOfY][indexOfX];
    //     cell.isAlive ? cell.killCell() : cell.generateCell();
    //     // console.log(cell);
    // }  
}

let Draw = (ctx:any) => {
    DrawBoard(ctx);
}

export default function ConWaysGameOfLife() {
    // will need to set the rules of the game here. 
    // Will need to add separate files for drawing and an interface shapes and sizes
    // If I make functions for Draw() and for gameLoopFunctions(), that is fine.
    // Going to need a way to pass context back to the outside parent functions that I have.

    // Later on we can add a dashboard then we can control 
    // settings of the board using redux slices basically managed state.

    /*
            Calculating the rows and cols of a 2d array is as such: 

                this.COLS = this.canvas.width / this.resolution;
                this.ROWS = this.canvas.height / this.resolution;

                so basically width / resolution
                and height / resolution 


                500 / 25 = 25.

                We are going to have a 25 by 25 array. 
    
    
    */

    return (
        <Board
        drawFunctionCommands={Draw}
        clickHandler={handleBoardClick}
        width={width} 
        height={height}
        resolution={1} />
    )
}

