import { Circle, Point } from "../../Utils/Util";

export class Planet extends Circle {
    public delta: number;
    public ImageToPaint:any;
    public angle:number;
    public distanceFromSun:number;

    public timeInterval = 100; 

    constructor(p: Point, r:number, delta:number, pdf: any, angle:number, fillStyle: string, distanceFromSun: number) {
        super(p, r, r);
        this.delta = delta;
        this.ImageToPaint = pdf;
        this.angle = angle;
        this.fillStyle = fillStyle;
        this.distanceFromSun = distanceFromSun;
    }

    public increaseSpeed = () => {
        this.delta += 10; // constant is needing a variable we can add that as well. 
    }

    public decreaseSpeed = () => {
        this.delta -= 10;
    }

    public calcNextAngle = () => {
        this.angle += this.timeInterval * this.delta;
    }

    private calculateRotationAroundOtherCircle = (otherPoint: Point) => {
        let otherX = otherPoint.x;
        let otherY = otherPoint.y;
        this.point.x = otherX + Math.cos(this.angle) * this.distanceFromSun;
        this.point.y = otherY + Math.sin(this.angle) * this.distanceFromSun;
    }

    public rotatePlanetAroundOhterCircle = (otherPoint: Point) => {
        this.calcNextAngle();
        this.calculateRotationAroundOtherCircle(otherPoint);
    }
}