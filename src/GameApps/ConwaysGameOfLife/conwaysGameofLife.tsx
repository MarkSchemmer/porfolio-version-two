import { useRef, useState } from "react";
import Canvas from "../../components/Canvas/Canvas";
import { handleClickForGridCoordinates, resizeCanvasToDisplaySize } from "../../components/Canvas/CanvasHook";
import "../ConwaysGameOfLife/main.css";
import { ConwaysGameOfLifeRect, IsValue, Point, deepCloneForConwaysGameOfLife, range } from "../../Utils/Util";
import { ConwaysDashboard } from "../../components/ConwaysGameOfLifeDashoard/conwaysDashBoard";


export interface IOptions {
    context: string;
    moreConfig: {};
    fpsInterval: number;
    width:number;
    height:number;
    resolution: number;
    runner: boolean;
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
    let copyBoard:ConwaysGameOfLifeRect[][] = deepCloneForConwaysGameOfLife(board);
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            /*
                Any live cell with fewer than two live neighbors dies, as if by underpopulation. -> DONE

                If a live cell has fewer than two live neighbors (adjacent cells), it dies in the next generation due to underpopulation.
                
                Any live cell with two or three live neighbors lives on to the next generation.

                If a live cell has two or three live neighbors, it remains alive in the next generation.
                Any live cell with more than three live neighbors dies, as if by overpopulation.

                If a live cell has more than three live neighbors, it dies in the next generation due to overcrowding.
                Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

                If a dead cell has exactly three live neighbors, it becomes a live cell in the next generation due to reproduction.

                For a better description, please refer to this link: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
            */
            let currentCell:ConwaysGameOfLifeRect = board[x][y];
            let nextCell: ConwaysGameOfLifeRect = copyBoard[x][y];
            let neighbors = getNeighbors(x, y, board);
            let aliveNeighbors = neighbors.filter(c => c.isAlive === true);

            if (currentCell.isAlive === true && (aliveNeighbors.length === 2 || aliveNeighbors.length === 3)) {
                nextCell.isAlive = true;
            } else if (currentCell.isAlive === false && aliveNeighbors.length === 3) {
                nextCell.isAlive = true;
            } else if (currentCell.isAlive === true) {
                nextCell.isAlive = false;
            }
        }
    }

    return copyBoard;
}




export const ConWaysGameOfLife = (props:any) => {

    const [width, setWidth] = useState(500);
    const [height, setHeight] = useState(500);
    const [resolution, setResolution] = useState(20);
    const [board, setBoard] = useState(generateCanvasBoard(width, height, resolution));
    const [fpsInterval, setFps] = useState(10000);
    const ref = useRef<HTMLDivElement | null>(null);

    const [runner, setRunner] = useState(false);
    const lastRef = useRef(0);

    const handleBoardClick = (col: number, row: number) => {
        board[col][row].isAlive = !board[col][row].isAlive;
        setBoard(board);
    };

    let canvasProps = {
        draw: (ctx:any, canvas:any, options: IOptions, now:number) => {
            resizeCanvasToDisplaySize(ctx, canvas, options);
            
            board.forEach(b => {
                b.forEach(r => r.draw(ctx));
            });
            
            if (runner && (now - lastRef.current >= options.fpsInterval)) {
                lastRef.current = now;
                setBoard(calculateNextGeneration(board));
            }
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
            fpsInterval: 1000,
            width,
            height,
            resolution,
            runner: false
        },
    };

    return (
        <>
            <ConwaysDashboard
            pause={() => {
                // stop();
                setRunner(false);
            }}
            run={() => {
                // start();
                setRunner(true);
            }}
            restart={() => {
                setBoard(generateCanvasBoard(width, height, resolution));
            }} nexGen={() => {
                setBoard(calculateNextGeneration(board));
            }} />
            <div className="conways-container" ref={ref}>
                <Canvas {...canvasProps} />
            </div>
        </>
    );
}