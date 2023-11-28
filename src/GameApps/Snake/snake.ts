import { Directions, Point, Rectangle } from "../../Utils/Util";

export class Snake {

    public origin: Point;
    public body: Rectangle[] = [];
    public snakeDelta = 1;
    public Direction: Directions = Directions.UP;

    public whereToGoNext: Directions[] = [
        
    ]

    constructor(x:number, y:number) {
        this.origin = new Point(x, y);

        this.body = [
            new Rectangle(this.origin, 5),
            new Rectangle(new Point(this.origin.x + 1, this.origin.y), 5),
            new Rectangle(new Point(this.origin.x + 2, this.origin.y), 5),
            new Rectangle(new Point(this.origin.x + 3, this.origin.y), 5)
        ];
     }

     public draw = (ctx:any) => {
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

     public GoDown = () => {
        // this.Direction = Directions.DOWN;
     }
     
     public GoUp = () => {
        // this.Direction = Directions.UP;
     }

     public snakeCalculation = () => {
        let first:Rectangle = this.body[0].DeepCopy();
        first.point.AddingChangeDelta(this.Direction, this.snakeDelta);
        let _body = [first, ...this.body];
        _body.pop();
        this.body = _body;
        return this.body;
     }
}