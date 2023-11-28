
// This is a public library of functions that can be shared between apps regardless of use. 
export const replaceAll = function(thisString: string, str1: string, str2: string, ignore: boolean) 
{
    return thisString.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 

export function e2() {
    var u='',m='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',i=0,rb=Math.random()*0xffffffff|0;
    while(i++<36) {
        var c=m[i-1],r=rb&0xf,v=c==='x'?r:(r&0x3|0x8);
        u+=(c==='-'||c==='4')?c:v.toString(16);rb=i%8===0?Math.random()*0xffffffff|0:rb>>4
    }
    return u
}

export const IsNullOrUndefined = (obj: any) => obj === null || obj === undefined;

export const IsValue = (obj: any) => !IsNullOrUndefined(obj); 


export enum Directions {
    LEFT = "left",
    RIGHT = "right", 
    UP = "up", 
    DOWN = "down"
};

export interface IPoint {
    x: number;
    y: number;
};

export class Point implements IPoint {
    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public AddingChangeDelta = (d: Directions, delta: number) => {
        if (d === Directions.LEFT) { this.x -= delta; }
        else if (d === Directions.RIGHT) { this.x += delta; }
        else if (d === Directions.UP) { this.y -= delta; }
        else if (d === Directions.DOWN) { this.y += delta; }
    }
}

export const degressToRadians = (degrees:number) => {
    return degrees * Math.PI / 180.0;
}

export const rotatePoint = (point: Point, degrees:number) => {
    let radians = degressToRadians(degrees);
    let sine = Math.sin(radians);
    let cosine = Math.cos(radians);

    let p = new Point();

    p.x = point.x * cosine - point.y * sine;
    p.y = point.x * sine + point.y * cosine;

    return p;
}

export interface IBoardDimensions {
    width: number;
    height: number;
    resolution: number;
};

export class BoardDimensions implements IBoardDimensions {
    public width: number;
    public height: number;
    public resolution: number;

    constructor(w: number = 500, h:number = 500, r: number = 20) { // we default to 500 x, y and we default to 20 resolution
        this.height = h;
        this.width = w;
        this.resolution = r;
    }
}

export interface IShape {
    point: Point;
    resolution: number;
    draw: (ctx: any) => void;
}

class Shape implements IShape {
    public point: Point;
    public resolution: number;

    public strokeStyle:string = 'black';
    public fillStyle:string = 'black';

    constructor(point: Point, resolution: number) {
        this.point = point;
        this.resolution = resolution;
    }

    public draw: (ctx: any) => void = () => { };
}

export class Rectangle extends Shape {
    public lineWidth: number = 1;

    constructor(point: Point, resolution: number) {
        super(point, resolution);
    }

    public draw: (ctx: any) => void = (ctx:any) => {
        ctx.beginPath();
        ctx.lineWidth = this.lineWidth;
        this.strokeRect(ctx);
        ctx.stroke();
    }

    public drawSolid: (ctx: any) => void = (ctx:any) => {
        ctx.beginPath();
        ctx.lineWidth = this.lineWidth;
        this.fillRect(ctx);
        ctx.stroke();
    }

    public strokeRect: (ctx: any) => void = (ctx:any) => {
        ctx.strokeRect(this.point.x * this.resolution, this.point.y * this.resolution, this.resolution, this.resolution);
    }

    public fillRect: (ctx: any) => void = (ctx:any) => {
        ctx.fillRect(this.point.x * this.resolution, this.point.y * this.resolution, this.resolution, this.resolution);
    }

    public DeepCopy: () => Rectangle = () => {
        let point = new Point(this.point.x, this.point.y);
        let resolution = this.resolution;
        return new Rectangle(point, resolution);
    }
}

export class ConwaysGameOfLifeRect extends Rectangle {
    public isAlive:boolean = false;

    constructor(point: Point, resolution: number) {
        super(point, resolution);
    }

    public draw: (ctx: any) => void = (ctx:any) => {
        ctx.beginPath();
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.point.x * this.resolution, this.point.y * this.resolution, this.resolution, this.resolution);
        ctx.stroke();
        if (this.isAlive) { this.fillRect(ctx); }
    }
}

export class Circle extends Shape {

    public radius:number = 0;
    public pi:number = Math.PI;

    public startAngle:number = 0;
    public endAngle: number = 0;

    constructor(point: Point, resolution: number, radius: number) {
        super(point, resolution);
        this.radius = radius;
    }

    public draw: (ctx: any) => void = (ctx:any) => {
        ctx.beginPath();
        ctx.arc(this.point.x, this.point.y, this.radius, this.startAngle, this.endAngle * this.pi);
        ctx.stroke();
    }
}

/*
    Helper methods
*/
export const isNullOrUndefined = (value: unknown): boolean => value === null || value === undefined;

export const not = (fn:any) => (...args:any) => !fn(...args);

export const isValue = (value: unknown): boolean => not(isNullOrUndefined)(value);

export const isNonEmptyArray = (value: Array<unknown>): boolean => isValue(value) && value.length > 0;

export const range = (x: number, y: number, incrementer: number = 1): number[] => {
    const which = x < y;
    const xx = which ? x : y;
    const yy = which ? y : x;

    const calculator = (xxx: number = xx, yyy: number = yy, rango = []): any => {
        const newMappedArray:any = xxx <= yyy ? acendingOrDecendingArr(rango, xxx, which) : rango;
        return xxx >= yyy ? newMappedArray : calculator(xxx + incrementer, yyy, newMappedArray);
    };

    return calculator(xx, yy);
};

export const acendingOrDecendingArr =
                (arr: number[], elem: number, which: boolean): number[] =>
                            which ? [...arr, elem] : [elem, ...arr];

export const curry = (fn:any, len = fn.length) =>
                              len === 0
                              ? fn()
                              : (p:any) => isValue(p) ? curry(fn.bind(null, p), len - 1)
                                                : curry(fn, len);                                             
export const shuffle = (arr:any) => {
    for (let i = 0; i < arr.length; i++) {
        const randIndex = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[randIndex];
        arr[randIndex] = temp;
    }

    return arr;
};

export const deepClone = (obj:any, hash = new WeakMap()):any => {
    if (Object(obj) !== obj) return obj; // primitives
    if (hash.has(obj)) return hash.get(obj); // cyclic reference
    const result = obj instanceof Set ? new Set(obj) // See note about this!
                 : obj instanceof Map ? new Map(Array.from(obj, ([key, val]) => 
                                        [key, deepClone(val, hash)])) 
                 : obj instanceof Date ? new Date(obj)
                 : obj instanceof RegExp ? new RegExp(obj.source, obj.flags)
                 // ... add here any specific treatment for other classes ...
                 // and finally a catch-all:
                 : obj.constructor ? new obj.constructor() 
                 : Object.create(null);
    hash.set(obj, result);
    return Object.assign(result, ...Object.keys(obj).map(
        key => ({ [key]: deepClone(obj[key], hash) }) ));
}

export function deepCloneForConwaysGameOfLife(obj: ConwaysGameOfLifeRect[][]) {
    let shallowClone:ConwaysGameOfLifeRect[][] = obj.map(c => c.map(cc => {
        let point = cc.point;
        let resolution = cc.resolution;
        let isAlive = cc.isAlive;
        let newObj = new ConwaysGameOfLifeRect(point, resolution);
        newObj.isAlive = isAlive;
        return newObj;
    }));

    return shallowClone;
  }

  export class AnimationRequestHelper {

    public animationRequestId:any;
    public now:number;
    public fpsInterval:number;
    public then:number;
    public callBack:any;
    public runner:boolean = true;

    constructor(fpsInterval:number, callBack: any) {
        this.now = Date.now();
        this.fpsInterval = fpsInterval;
        this.then = 0;
        // this.animationRequestId = window.requestAnimationFrame(this.render);
        this.callBack = callBack;
    }

    render = () => {
        if (this.runner) {
            this.now = Date.now();
            let elapsed = this.now - this.then;
            if (elapsed > this.fpsInterval) {
                this.then = this.now - (elapsed % this.fpsInterval);
                this.callBack();
            }
        }
    }

    pause = () => {
        this.runner = false;
        window.cancelAnimationFrame(this.animationRequestId);
        this.animationRequestId = null;
    }

    start = () => {
        this.runner = true;
        this.animationRequestId = window.requestAnimationFrame(this.render);
        this.render();
    }
  }

  type AnimationCallback = () => void;

  export class AnimationFrame {
    private requestId: number | null = null;
    private startTime = 0;
    private elapsed = 0;
    private interval: number;
    private callback: AnimationCallback;
  
    constructor(interval: number, callback: AnimationCallback) {
      this.interval = interval;
      this.callback = callback;
    }
  
    private loop = (currentTime: number) => {
      if (!this.startTime) {
        this.startTime = currentTime;
      }
  
      this.elapsed = currentTime - this.startTime;
  
      if (this.elapsed >= this.interval) {
        this.callback();
        this.startTime = currentTime;
      }
  
      this.requestId = requestAnimationFrame(this.loop);
    };
  
    start(): void {
      this.requestId = requestAnimationFrame(this.loop);
    }
  
    stop(): void {
      if (this.requestId !== null) {
        cancelAnimationFrame(this.requestId);
        this.startTime = 0;
        this.elapsed = 0;
      }
    }
  }