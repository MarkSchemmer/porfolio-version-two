
/*

      +x -> moving right
      -x -> moving left
      +y -> moving down
      -y -> moving up

*/

import { e2 } from "../Util";



/*

    fps: 10
    fpsInterval: = 1000 / fps;
    
    The logic of then: 
            'then' is assigned in startAnimating() method. 
            'then' is assigned to Date.now();


    now: is assigned each iteration in requestAnimationFrame ( Javascript function ) to Date.now();

    initialGameSetup: 
        Assigning context to the board, Dimensions to the board
        Also creating or assigning keyboard events to the document upon load of the game. 

        Of course we can break generating the board context as well inside of it's own method.


*/

interface IBoard {
    Id: string;
    start: () => void;
    stop: () => void;
    clearBoard: () => void;
    gameLoop: () => void;
    gameLooper: () => void; 
    startAnimating: () => void;
    handleKeyBoardStrokes: (key: KeyboardEvent) => void;
    initialGameSetup: () => void;
    fps: number;
    fpsInterval: number;
    then: number;
    elapsed: number;
    runner: boolean;
    gameSpeed: number;
    boardHeight: number;
    boardWidth: number;
}

export default class Board implements IBoard { 
    
    Id: string = e2();
    fps: number = 10;
    fpsInterval: number = 1000 / this.fps;
    then: number = 0;
    elapsed: number = 0;
    runner: boolean = false;
    gameSpeed: number = 1000;
    boardHeight: number;
    boardWidth: number;
    gameLooper: any;
    ctx: any;

    constructor(boardWidth: number = 800, boardHeight: number = 800, ctx: any) {
        this.boardHeight = boardHeight;
        this.boardWidth = boardWidth;
        this.ctx = ctx;
     } 
    
    

    public start: () => void = () => {
        this.gameLooper = requestAnimationFrame(this.gameLoop);
    }

    public stop: () => void = () => {
        cancelAnimationFrame(this.gameLooper);
        this.gameLooper = null;
        this.runner = false;
    }

    public clearBoard: () => void = () => {
        this.ctx.clearRect(0, 0, this.boardWidth, this.boardHeight);
    }

    public gameLoop: () => void = () => {

    }

    public startAnimating: () => void = () => {
        this.fpsInterval = 1000 / this.fps;
        this.then = Date.now();
        this.runner = true;
        this.start();
    }

    public handleKeyBoardStrokes: (key: KeyboardEvent) => void = (key:KeyboardEvent) => {

    }

    public initialGameSetup: () => void = () => {
        throw new Error("Method not implemented.");
    }
}