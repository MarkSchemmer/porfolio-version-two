import { Circle, CircleHittingBottomOfBoard, CircleHittingPaddle, CircleHittingTopOfBoard, CircleReactingToRightPaddle, Point, Rectangle } from "../../Utils/Util";

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

    public canRun: boolean = false;
    public action: string = "";

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

    public leftPaddle: PaddleBoard = new PaddleBoard(new Point(1, 2), 200);
    public rightPaddle: PaddleBoard = new PaddleBoard(new Point(489, 2), 200);
    public ball: Pong = new Pong(new Point(250, 200), 20, 15);


    public handleKeyUp = () => {
        this.canRun = false;
        this.action = "";
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
            console.log("hit left paddle");
        }

        if (CircleHittingPaddle(this.ball, this.rightPaddle)) {
            console.log("hit right paddle");
            CircleReactingToRightPaddle(this.ball, this.rightPaddle);
        }

        CircleHittingTopOfBoard(boardRef, this.ball);
        CircleHittingBottomOfBoard(boardRef, this.ball);

        this.ball.handlePongDeltaX();
    }
}