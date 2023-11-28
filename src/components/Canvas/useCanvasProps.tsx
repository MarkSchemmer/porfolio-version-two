import React, { useRef } from "react";
import { CanvasProps, IBoardOperationsConfigs, IOptions, Instructions, boardSetupRezizeAndOtherBeforeDrawOperations } from "./CanvasProps";

type functionReturn = (ctx:any, canvas:any, options: IOptions, now:number) => void;
type functionClick = (e:any, canvas:any, options:IOptions) => void;
export const useCanvasProps = (draw: functionReturn, calculations: functionReturn, boardOperationsConfigs: IBoardOperationsConfigs, handleClick: functionClick) => {
    const width = useRef(800);
    const height = useRef(800);
    const resolution = useRef(20);
    const fpsInterval = useRef(1000);
    const ref = useRef<HTMLDivElement | null>(null);
    const runnerRef = useRef(false);
    const lastRef = useRef(0);

    const options: IOptions = {
        context: '2d',
        moreConfig: {
            boardSetupRezizeAndOtherBeforeDrawOperations,
            draw,
            calculations,
            boardOperationsConfigs
        },
        fpsInterval,
        width,
        height,
        resolution,
        runner: runnerRef,
        lastRef,
        canvasRef: ref
    };

    let canvasProps: CanvasProps = {
        Instructions: Instructions,
        handleClick: handleClick,
        pausegame: () => {
          options.runner.current = false;  
        },
        startgame: () => {
            options.runner.current = true;
        },
        options
    };

    return canvasProps;
}