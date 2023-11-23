
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
    // a method that should later to assigned later on in time
    // after the board is initialized assign an actual meaningful game loop.
    public gameLoopFunctions: any = () => {}

    private KeyStrokeCommandObject: any = {
        "s": () => this.start(),
        "p": () => this.stop(),
    };

    constructor(props:any) {
        super(props);
        //this.boardHeight = boardHeight;
        //this.boardWidth = boardWidth;
        // when the board is initialized we will call the initialize step to make sure that 
        this.initialGameSetup();
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
        if(this.runner === false || this.gameLooper === null) return;
        let now = Date.now();
        let elapsed = now - this.then;

        if (elapsed > this.fpsInterval) {
            this.then = now - (elapsed % this.fpsInterval);
            /*
                Usually we clean the board.
                Then we re-draw.
                This needs to implemented by the programmer.
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

    public initialGameSetup: () => void = () => {
        // this.board = document.getElementById(this.Id);
        //this.ctx = this.board.getContext("2d");
        // this.board.width = this.boardWidth;
        // this.board.height = this.boardHeight;
        document.onkeydown = this.handleKeyBoardStrokes;
    }

    render(): React.ReactNode {
        return (
            <div className={'game-board'} id={this.Id}></div>
        );
    }
}

