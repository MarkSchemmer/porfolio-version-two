
/*
        1. Resize and display canvas
        2. draw current canvas and all objects -> all objects need to have a draw() method and a deepCopy object on them. 
        3. make all calculations -> calculations per iteration
*/

import { resizeCanvasHighDensityDevices, resizeCanvasToDisplaySize } from "./CanvasHook";


export interface CanvasProps {
    Instructions: (ctx:any, canvas:any, options: IOptions, now:number) => void; // change draw to instructions -> which is function that has all the order instructions called as needed.
    handleClick: (e:any, canvas:any, options:IOptions) => void;
    pausegame: () => void;
    startgame: () => void;
    options: IOptions;
}

export interface IBoardOperationsConfigs {
    canResizeCanvasToDisplaySize: boolean;
    canResizeCanvasHighDensityDevices: boolean;
}

export const boardConfigurationsDefault: IBoardOperationsConfigs = {
    canResizeCanvasHighDensityDevices: false,
    canResizeCanvasToDisplaySize: true
}

export interface moreConfig {
    boardSetupRezizeAndOtherBeforeDrawOperations: (ctx:any, canvas:any, options: IOptions) => void;
    draw: (ctx:any, canvas:any, options: IOptions, now:number) => void;
    calculations: (ctx:any, canvas:any, options: IOptions, now:number) => void;
    boardOperationsConfigs: IBoardOperationsConfigs;
}
  
  export interface IOptions {
    context: string;
    moreConfig: moreConfig;
    fpsInterval: React.MutableRefObject<number>;
    width:React.MutableRefObject<number>;
    height:React.MutableRefObject<number>;
    resolution: React.MutableRefObject<number>;
    runner: React.MutableRefObject<boolean>;
    lastRef:React.MutableRefObject<number>;
    canvasRef: React.MutableRefObject<HTMLDivElement | null>;
  }

 export const boardSetupRezizeAndOtherBeforeDrawOperations = (ctx:any, canvas:any, options: IOptions) => {
        if (options.moreConfig.boardOperationsConfigs.canResizeCanvasToDisplaySize) {
            resizeCanvasToDisplaySize(ctx, canvas, options);
        }

        if (options.moreConfig.boardOperationsConfigs.canResizeCanvasHighDensityDevices) {
            resizeCanvasHighDensityDevices(ctx, canvas);
        }
  }

  export const handleClick  = (fn: Function) => (e:any, canvas:any, options:IOptions) => {
    fn(e, canvas, options);
  }

  const draw = (fn: Function) => (ctx:any, canvas:any, options: IOptions, now:number) => {
        fn(ctx, canvas, options, now);
  }

  const calculations = (fn: Function) => (ctx:any, canvas:any, options: IOptions, now:number) => {
    if (options.runner.current && (now - options.lastRef.current >= options.fpsInterval.current)) {
        options.lastRef.current = now;
        fn(ctx, canvas, options, now);
    }
  }

  export const Instructions = (ctx:any, canvas:any, options: IOptions, now:number) => {
        boardSetupRezizeAndOtherBeforeDrawOperations(ctx, canvas, options);
        calculations(options.moreConfig.calculations)(ctx, canvas, options, now);
        draw(options.moreConfig.draw)(ctx, canvas, options, now);
  }