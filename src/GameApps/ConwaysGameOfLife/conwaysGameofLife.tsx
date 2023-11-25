import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Canvas from "../../components/Canvas/Canvas";
import { handleClickForGridCoordinates, resizeCanvasToDisplaySize } from "../../components/Canvas/CanvasHook";
import "../ConwaysGameOfLife/main.css";
import { Point, Rectangle, range, rotatePoint } from "../../Utils/Util";


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