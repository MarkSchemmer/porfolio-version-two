import React from 'react';
import useCanvas from './CanvasHook';
import { CanvasProps } from './CanvasProps';



const Canvas = (props:CanvasProps) => {  
  const { draw, handleClick, options, ...rest } = props;
  const { context, ...moreConfig } = options;
  const canvasRef = useCanvas(draw, options);
  return <canvas onClick={(e) => {
      handleClick(e, canvasRef.current, options);
    }} style={{border: "1px solid black"}} ref={canvasRef} {...rest}/>
}

export default Canvas;