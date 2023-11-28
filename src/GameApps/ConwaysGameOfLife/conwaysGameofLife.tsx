import { useRef } from "react";
import Canvas from "../../components/Canvas/Canvas";
import { handleClickForGridCoordinates } from "../../components/Canvas/CanvasHook";
import "../ConwaysGameOfLife/main.css";
import { ConwaysGameOfLifeRect, IsValue, Point, deepCloneForConwaysGameOfLife, range } from "../../Utils/Util";
import { ConwaysDashboard } from "../../components/ConwaysGameOfLifeDashoard/conwaysDashBoard";
import { CanvasProps, IOptions, Instructions, boardSetupRezizeAndOtherBeforeDrawOperations } from "../../components/Canvas/CanvasProps";

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

    const width = useRef(500);
    const height = useRef(500);
    const resolution = useRef(20);
    const board = useRef(generateCanvasBoard(width.current, height.current, resolution.current));
    const fpsInterval = useRef(1000);
    const ref = useRef<HTMLDivElement | null>(null);

    const runnerRef = useRef(false);
    const lastRef = useRef(0);

    const handleBoardClick = (col: number, row: number) => {
        board.current[col][row].isAlive = !board.current[col][row].isAlive;
    };

    const options: IOptions = {
        context: '2d',
        moreConfig: {
            boardSetupRezizeAndOtherBeforeDrawOperations,
            draw:  (ctx:any, canvas:any, options: IOptions, now:number) => {
                board.current.forEach(b => {
                    b.forEach(r => r.draw(ctx));
                });
            },
            calculations: (ctx:any, canvas:any, options: IOptions, now:number) => {
                board.current = (calculateNextGeneration(board.current));
            },
            boardOperationsConfigs: {
                canResizeCanvasHighDensityDevices: false,
                canResizeCanvasToDisplaySize: true
            }
        },
        fpsInterval,
        width,
        height,
        resolution,
        runner: runnerRef,
        lastRef,
        canvasRef: ref
    };

    let canvasProps: CanvasProps = {
        Instructions: Instructions,
        handleClick: (e:any, canvas:any, options:IOptions) => {
            let [col, row] = handleClickForGridCoordinates(e, canvas, options);
            // more logic here... 
            handleBoardClick(col, row);
        },
        pausegame: () => {},
        startgame: () => {},
        options
    };

    return (
        <>
            <ConwaysDashboard
            pause={() => {                
                options.runner.current = false;
            }}
            run={() => {
                options.runner.current = true;
            }}
            restart={() => {
                board.current = generateCanvasBoard(width.current, height.current, resolution.current);
                options.runner.current = false;
            }} nexGen={() => {
                board.current = calculateNextGeneration(board.current);
            }} />
            <div className="conways-container" ref={options.canvasRef}>
                <Canvas {...canvasProps} />
            </div>
        </>
    );
}