
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
        ctx.strokeRect(this.point.x * this.resolution, this.point.y * this.resolution, this.resolution, this.resolution);
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