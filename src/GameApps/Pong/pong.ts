import { 
    Circle, 
    CircleHittingBottomOfBoard, 
    CircleHittingPaddle, CircleHittingTopOfBoard, 
    CircleReactingToLeftPaddle, 
    CircleReactingToRightPaddle, Point, 
    PointSystem, 
    Rectangle, hasBallScoredPoint } from "../../Utils/Util";



export class Pong extends Circle {

    public deltaX: number = 2.5;
    public deltaY: number = -1;

    public direction: number = 1;

    public directionX: number = 2.5;
    public directionY: number = 1;

    constructor(point: Point, dimensions: number, radius: number) {
        super(point, dimensions, radius);
    }

    public handlePongDeltaX = () => {
        this.point.x += this.deltaX;
        this.point.y += this.deltaY;
    }
}

export class PaddleBoard extends Rectangle {
    public width: number;
    public height: number;

    constructor(point: Point, dimensions: number) {
        super(point, dimensions);

        this.width = 10;
        this.height = dimensions;
    }

    public drawPaddle: (ctx: any) => void = (ctx:any) => {
        ctx.fillRect(this.point.x, this.point.y, this.width, this.height);
    }

    public movePaddleUp = () => {
        this.point.y -= 5;
    }

    public movePaddleDown = () => {
        this.point.y += 5;
    }


}

export interface KeyPressCommands {
    [key: string]: () => void;
}

export class PongGameController {


    public leftPaddle: PaddleBoard = new PaddleBoard(new Point(1, 2), 200);
    public rightPaddle: PaddleBoard = new PaddleBoard(new Point(489, 2), 200);
    public ball: Pong = new Pong(new Point(250, 200), 20, 15);

    public canRun: boolean = false;
    public action: string = "";

    public leftPaddleScore: number = 0;
    public rightPaddleScore: number = 0;

    public boardRef: React.MutableRefObject<HTMLDivElement | null>;

    constructor(pauseGame:() => void, startGame: () => void, boardRef: React.MutableRefObject<HTMLDivElement | null>) {
        this.keyPressCommands["p"] = () => pauseGame();
        this.keyPressCommands["s"] = () => startGame();
        this.boardRef = boardRef;
    }

    private keyPressCommands: KeyPressCommands = {
        "arrowdown": () => { this.canRun = true; this.action = "arrowdown"; },
        "arrowup": () => { this.canRun = true; this.action = "arrowup"; }
    }

    private keyPressActionCommands: KeyPressCommands = {
        "arrowdown": () => { this.leftPaddle.movePaddleDown(); },
        "arrowup": () => { this.leftPaddle.movePaddleUp(); }
    }

    private setGameObjectsToDefault = () => {
        this.leftPaddle = new PaddleBoard(new Point(1, 2), 200);
        this.rightPaddle = new PaddleBoard(new Point(489, 2), 200);
        this.ball = new Pong(new Point(250, 200), 20, 15);
    }

    public handleRestart = () => {
        // pause game
        this.keyPressCommands["p"]();
        this.setGameObjectsToDefault();
    }

    public handleKeyUp = () => {
        this.canRun = false;
        this.action = "";
    }

    public handleScore = (winner: PointSystem) => {
        if (winner === PointSystem.LeftPoint) {
            // console.log("scored");
            this.leftPaddleScore += 1;
        } else if (winner === PointSystem.RightPoint) {
            // console.log("scored right");
            this.rightPaddleScore += 1;
        }
    }

    public handleKeyDown = (e:KeyboardEvent) => {
        let valuePressed = e.key.toString().toLowerCase();
        // console.log(valuePressed);
        if (valuePressed in this.keyPressCommands) { 
            this.keyPressCommands[valuePressed]()
        } 
    }

    public handleCalculation = (boardRef: React.MutableRefObject<HTMLDivElement | null>) => {

        if (this.action in this.keyPressActionCommands && this.canRun) { 
            this.keyPressActionCommands[this.action]()
        } 
        // Going to need to make a new refactor this method or implement another. 
        // Going to need to implement detection with board ref
        // and with paddles 

        // calculation hit
        if (CircleHittingPaddle(this.ball, this.leftPaddle)) {
            // console.log("hit left paddle");
            CircleReactingToLeftPaddle(this.ball, this.leftPaddle);
        }

        if (CircleHittingPaddle(this.ball, this.rightPaddle)) {
            // console.log("hit right paddle");
            CircleReactingToRightPaddle(this.ball, this.rightPaddle);
        }

        CircleHittingTopOfBoard(boardRef, this.ball);
        CircleHittingBottomOfBoard(boardRef, this.ball);
        let someoneScored = hasBallScoredPoint(boardRef, this.ball);

        if (someoneScored === PointSystem.LeftPoint || someoneScored === PointSystem.RightPoint) {
            this.handleScore(someoneScored);
            this.handleRestart();
        } else {
            this.ball.handlePongDeltaX();
            // handle ai change here. 
            this.handleAiMovement(boardRef);
        }
    }

    public handleAiMovement = (boardRef: React.MutableRefObject<HTMLDivElement | null>) => {
        if (boardRef.current) {
            let dims = boardRef.current.getBoundingClientRect();
            if (this.ball.point.x + this.ball.radius > dims.width / 2 && this.ball.deltaX > 0) {
                // console.log("bigger than x ");
                if (this.ball.point.y + this.ball.radius >= this.rightPaddle.point.y + this.rightPaddle.height) {
                    // console.log("I'm going up. ");
                    this.rightPaddle.point.y += 2;
                } else if (this.ball.point.y + this.ball.radius <= this.rightPaddle.point.y + this.rightPaddle.height / 2) {
                    this.rightPaddle.point.y -= 2;
                }
            }
        }
    }
}