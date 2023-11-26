import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Canvas from "../../components/Canvas/Canvas";
import { handleClickForGridCoordinates, resizeCanvasToDisplaySize } from "../../components/Canvas/CanvasHook";
import "../ConwaysGameOfLife/main.css";
import { IsValue, Point, Rectangle, range, rotatePoint } from "../../Utils/Util";


export interface IOptions {
    context: string;
    moreConfig: {};
    fpsInterval: number;
    width:number;
    height:number;
    resolution: number;
}

let generateCanvasBoard = (width:number, height:number, resolution:number) => {
    let rows = Math.ceil(width / resolution);
    let cols = Math.ceil(height / resolution);
    let board = range(0, rows).map((x) => range(0, cols).map((y) => { return new ConwaysGameOfLifeRect(new Point(x, y), 20); }));
    return board;
}

let tryGetNeighbor = (fn:any) => {
    try {
        return fn();
    } catch(e) {
        return null;
    }
}

let getNeighbors = (x: number, y:number, board:ConwaysGameOfLifeRect[][]) => {
    let neighbors = [
        tryGetNeighbor(() => board[x + 1][y]),
        tryGetNeighbor(() => board[x - 1][y]),
        tryGetNeighbor(() => board[x][y + 1]),
        tryGetNeighbor(() => board[x][y - 1]),
        tryGetNeighbor(() => board[x + 1][y + 1]),
        tryGetNeighbor(() => board[x + 1][y - 1]),
        tryGetNeighbor(() => board[x - 1][y + 1]),
        tryGetNeighbor(() => board[x - 1][y - 1]),
    ].filter(IsValue);

    return neighbors;
}

let calculateNextGeneration = (board:ConwaysGameOfLifeRect[][]) => {
    let copyBoard = JSON.parse(JSON.stringify(board)) as ConwaysGameOfLifeRect[][];
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            // need to get neighbors
            // I need to find 6 neighbors
            /*
            
            Any live cell with fewer than two live neighbors dies, as if by underpopulation.

            If a live cell has fewer than two live neighbors (adjacent cells), it dies in the next generation due to underpopulation.
            Any live cell with two or three live neighbors lives on to the next generation.

            If a live cell has two or three live neighbors, it remains alive in the next generation.
            Any live cell with more than three live neighbors dies, as if by overpopulation.

            If a live cell has more than three live neighbors, it dies in the next generation due to overcrowding.
            Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

            If a dead cell has exactly three live neighbors, it becomes a live cell in the next generation due to reproduction.
            
            */
            let currentCell:ConwaysGameOfLifeRect = board[x][y];
            let neighbors = getNeighbors(x, y, board);
            let aliveNeighbors = neighbors.filter(c => c.isAlive);
            let deadNeighbors = neighbors.filter(c => c.isAlive === false);

            if (currentCell.isAlive === false && aliveNeighbors.length === 3) {
                copyBoard[x][y].isAlive = true;
            }

            if (currentCell.isAlive && neighbors.length > 3) {
                copyBoard[x][y].isAlive = false;
            }

            if (currentCell.isAlive && (neighbors.length === 2 || neighbors.length === 3)) {
                // live on baby. 
            }

            if (currentCell.isAlive && neighbors.length < 2) {
                copyBoard[x][y].isAlive = false;
            }

            console.log(neighbors);
        }
    }

    return copyBoard;
}

class ConwaysGameOfLifeRect extends Rectangle {
    public isAlive:boolean = false;

    constructor(point: Point, resolution: number) {
        super(point, resolution);
    }

    public draw: (ctx: any) => void = (ctx:any) => {
        ctx.beginPath();
        ctx.lineWidth = this.lineWidth;
        ctx.strokeRect(this.point.x * this.resolution, this.point.y * this.resolution, this.resolution, this.resolution);
        ctx.stroke();
        if (this.isAlive) { this.fillRect(ctx); }
    }
}


export const ConWaysGameOfLife = (props:any) => {

    const [width, setWidth] = useState(500);
    const [height, setHeight] = useState(500);
    const [resolution, setResolution] = useState(20);
    const [board, setBoard] = useState(generateCanvasBoard(width, height, resolution));
    const ref = useRef<HTMLDivElement | null>(null);

    const handleBoardClick = (col: number, row: number) => {
        board[col][row].isAlive = !board[col][row].isAlive;
        setBoard(board);
        calculateNextGeneration(board);
    };

    let canvasProps = {
        draw: (ctx:any, canvas:any, options: IOptions) => {
            resizeCanvasToDisplaySize(ctx, canvas, options);
            board.forEach(b => {
                b.forEach(r => r.draw(ctx));
            });
        },
        handleClick: (e:any, canvas:any, options:IOptions) => {
            let [col, row] = handleClickForGridCoordinates(e, canvas, options);
            // more logic here... 
            handleBoardClick(col, row);
        },
        options:{
            context:'2d',
            moreConfig: {

            },
            fpsInterval: 0,
            width,
            height,
            resolution
        },
    };

    return (
        <div className="conways-container" ref={ref}>
            <Canvas {...canvasProps} />
        </div>
    );
}