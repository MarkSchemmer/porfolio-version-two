import { Directions, Point, Rectangle } from "../../Utils/Util";

export class Snake {
    public origin: Point;
    public body: Rectangle[] = [];
    public snakeDelta = 1;
    public Direction: Directions = Directions.UP;
    public snakeSquareResolution:number = 8;

    constructor(x:number, y:number) {
        this.origin = new Point(x, y);
        let head = new Rectangle(this.origin, this.snakeSquareResolution);
        head.fillStyle = "blue";
        this.body = [
            head,
            new Rectangle(new Point(this.origin.x + 1, this.origin.y), this.snakeSquareResolution),
            new Rectangle(new Point(this.origin.x + 2, this.origin.y), this.snakeSquareResolution),
            new Rectangle(new Point(this.origin.x + 3, this.origin.y), this.snakeSquareResolution)
        ];
     }

     public draw = (ctx:any) => {
        this.body[0].fillStyle = "green";
        this.body.forEach(r => r.drawSolid(ctx));
     }

     public GoLeft = () => {
        let currentDirection = this.Direction;

        if (currentDirection === Directions.UP || currentDirection === Directions.DOWN) {
            this.Direction = Directions.LEFT;
        } else if (currentDirection === Directions.RIGHT) {
            this.Direction = Directions.UP;
        } else if (currentDirection === Directions.LEFT) {
            this.Direction = Directions.DOWN;
        }
     }

     public GoRight = () => {
        let currentDirection = this.Direction;

        if (currentDirection === Directions.UP || currentDirection === Directions.DOWN) {
            this.Direction = Directions.RIGHT;
        } else if (currentDirection === Directions.RIGHT) {
            this.Direction = Directions.DOWN;
        } else if (currentDirection === Directions.LEFT) {
            this.Direction = Directions.UP;
        }
     }

     public hasEatenSelf = () => {
        let [head, ...rest] = this.body;
        return rest.some((r: Rectangle) => {
            return r.point.x === head.point.x && r.point.y === head.point.y;
        });
     }

     public GoDown = () => {
        // this.Direction = Directions.DOWN;
     }
     
     public GoUp = () => {
        // this.Direction = Directions.UP;
     }

     public snakeCalculation = (eaten:boolean = false) => {
        let [head, ...rest] = this.body;
        let first:Rectangle = head.DeepCopy();
        first.point.AddingChangeDelta(this.Direction, this.snakeDelta);
        this.body.forEach(r => r.fillStyle = "black");
        if ((eaten === false))
            this.body.pop();
        let _body = [first, ...this.body];
        this.body = _body;
        return this.body;
     }

     public getHeadOfSnake = () => {
        return this.body[0];
     }
}