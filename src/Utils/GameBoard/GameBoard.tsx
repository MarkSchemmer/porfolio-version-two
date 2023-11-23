
/*

      +x -> moving right
      -x -> moving left
      +y -> moving down
      -y -> moving up

*/
import React from "react";
import { e2 } from "../Util";
import "../GameBoard/styles/main.css";






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


        Basic commands for all games: 

            p: Pause -> should pause game and bring up a dashboard 
            s: start
            r: pause, clearboard, restart game, but it doesn't start it's just ready.

            Also when adding a board, it should be coded in that programmer can code in additional key commands on top
            of the basic commands there. 

            Todo this repalce switch with a object, then on construction of the class code in the
            The additional commands. 

            Always same key strokes in less overridden
            s -> start
            p -> stop or pause
            r -> restart

            Determining when 

            I'm thinking I'm going to have to make this a react component. 
            Then add a ref

            I can have a React class component, and then use 


            Might be value to actually create a unique ID for each 

            An old implementation of handling a board click, but determining what square or grid was clicked.
            This is important whne we break a canvas into small squares. 

            public handleBoardClick = e => {
                const x = e.pageX - this.canvas.offsetLeft;
                const y = e.pageY - this.canvas.offsetTop;
                if (y >= 0 && y <= y + this.resolution) {
                    const indexOfX = Math.floor(x / this.resolution);
                    const indexOfY = Math.floor(y / this.resolution);   
                    this.grid[indexOfX][indexOfY].isAlive =  !this.grid[indexOfX][indexOfY].isAlive;
                    this.board.draw(this.grid, this.ctx);
                }
            }


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
    startTime: number;
}

type IBoardProps = {
    width?: number;
    height?: number;
}

export default class Board extends React.Component implements IBoard { 
    
    public Id: string = e2();
    public fps: number = 10;
    public fpsInterval: number = 1000 / this.fps;
    public then: number = 0;
    public elapsed: number = 0;
    public startTime: number = 0;
    public runner: boolean = false;
    public gameSpeed: number = 1000;
    public boardHeight: number = 800;
    public boardWidth: number = 800;
    public gameLooper: any;
    public ctx: any;
    private board: any;
    public refToBoard: any;
    public boardRef: any;

    // a method that should later to assigned later on in time
    // after the board is initialized assign an actual meaningful game loop.
    public gameLoopFunctions: any = () => {}
    // A method that should later be assigned with a clear instructjions for drawing on whatever that may be.
    public drawFunctionCommands: any = () => {}

    private KeyStrokeCommandObject: any = {
        "s": () => this.start(),
        "p": () => this.stop(),
    };

    constructor(props:IBoardProps) {
        super(props);
        this.boardWidth = props.width || 800;
        this.boardHeight = props.height || 800;
        this.boardRef = React.createRef();
     }

     componentDidMount(): void {
        this.initialGameSetup();
        document.addEventListener("keydown", this.handleKeyBoardStrokes);
     }
    
    public start: () => void = () => {
        this.runner = true;
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
        if(this.runner === false || this.gameLooper === null) return;
        let now = Date.now();
        let elapsed = now - this.then;

        if (elapsed > this.fpsInterval) {
            this.then = now - (elapsed % this.fpsInterval);
            /*
                Usually we clean the board.
                Then we re-draw.
                This needs to implemented by the programmer.

                We implement this by creating a logical game instructions by re-assigning
                gameLoopFunctions();
            */
            this.gameLoopFunctions();
        }
    }


    public startAnimating: () => void = () => {
        this.then = Date.now();
        this.startTime = this.then;
        this.runner = true;
        this.start();
    }

    public handleKeyBoardStrokes: (key: KeyboardEvent) => void = (key:KeyboardEvent) => {
        const value: string = key.key.toLowerCase();
        if (value in this.KeyStrokeCommandObject) {
            this.KeyStrokeCommandObject[value]();
        }
    }

    public AddKeyStrokes = (additionalStrokes:any) => {
        this.KeyStrokeCommandObject = { ...this.KeyStrokeCommandObject, ...additionalStrokes };
    }

    public Draw = () => {
        this.drawFunctionCommands();
    }

    public initialGameSetup: () => void = () => {
        this.boardRef.style.width = `${this.boardWidth}px`;
        this.boardRef.style.height = `${this.boardHeight}px`;
        this.ctx = this.boardRef.getContext("2d");
        // Going to need 
        this.Draw();
    }

    render(): React.ReactNode {
        return (
            <div ref={r => this.boardRef = r} className={'game-board'} id={this.Id}></div>
        );
    }
}

