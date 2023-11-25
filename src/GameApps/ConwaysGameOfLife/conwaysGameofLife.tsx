import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Canvas from "../../components/Canvas/Canvas";
import { resizeCanvasToDisplaySize } from "../../components/Canvas/CanvasHook";
import "../ConwaysGameOfLife/main.css";


export interface IOptions {
    context: string;
    moreConfig: {};
    fpsInterval: number;
    width:number;
    height:number;
}

export const ConWaysGameOfLife = (props:any) => {

    const [width, setWidth] = useState(500);
    const [height, setHeight] = useState(500);

    const [numbers, setNumbers] = useState([]);

    const ref = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if (ref.current) {
            setWidth(ref.current.clientWidth);
            setHeight(ref.current.clientHeight);
        }

      }, [numbers]);

    useEffect(() => {
        function handleWindowResize() {
            let div = ref.current;
            if (div) {
                setWidth(div.clientWidth);
                setHeight(div.clientHeight);
            }

        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      }, []);

    let canvasProps = {
        draw: (ctx:any, canvas:any, options: IOptions) => {
            resizeCanvasToDisplaySize(ctx, canvas, options);
            ctx.fillStyle = 'blue';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
        options:{
            context:'2d',
            moreConfig: {

            },
            fpsInterval: 0,
            width,
            height
        },

    }

    return (
        <div className="conways-container" ref={ref}>
            <Canvas {...canvasProps} />
        </div>
    )
}