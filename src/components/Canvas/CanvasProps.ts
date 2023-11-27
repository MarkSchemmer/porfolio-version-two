
/*

        draw: (ctx:any, canvas:any, options: IOptions, now:number) => {
            resizeCanvasToDisplaySize(ctx, canvas, options); 
           
            board.forEach(b => {
                b.forEach(r => r.draw(ctx));
            });
            
            if (runner && (now - lastRef.current >= options.fpsInterval)) {
                lastRef.current = now;
                setBoard(calculateNextGeneration(board));
            }
        }


        1. Resize and display canvas
        2. draw current canvas and all objects -> all objects need to have a draw() method and a deepCopy object on them. 
        3. make all calculations -> calculations per iteration

*/

import { resizeCanvasHighDensityDevices, resizeCanvasToDisplaySize } from "./CanvasHook";


export interface CanvasProps {
    Instructions: (ctx:any, canvas:any, options: IOptions, now:number) => void; // change draw to instructions -> which is function that has all the order instructions called as needed.
    handleClick: (e:any, canvas:any, options:IOptions) => void;
    options: IOptions;
}

export interface moreConfig {
    boardSetupRezizeAndOtherBeforeDrawOperations: (ctx:any, canvas:any, options: IOptions) => void;
    draw: (ctx:any, canvas:any, options: IOptions, now:number) => void;
    calculations: (ctx:any, canvas:any, options: IOptions, now:number) => void;
    boardOperationsConfigs: {
        canResizeCanvasToDisplaySize: boolean;
        canResizeCanvasHighDensityDevices: boolean;
    }
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
  }

 export const boardSetupRezizeAndOtherBeforeDrawOperations = (ctx:any, canvas:any, options: IOptions) => {
        if (options.moreConfig.boardOperationsConfigs.canResizeCanvasToDisplaySize) {
            resizeCanvasToDisplaySize(ctx, canvas, options);
        }

        if (options.moreConfig.boardOperationsConfigs.canResizeCanvasHighDensityDevices) {
            resizeCanvasHighDensityDevices(ctx, canvas);
        }
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
        draw(options.moreConfig.draw)(ctx, canvas, options, now);
        calculations(options.moreConfig.calculations)(ctx, canvas, options, now);
  };