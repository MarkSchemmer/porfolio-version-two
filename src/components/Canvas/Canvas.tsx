import React from 'react';
import useCanvas from './CanvasHook';
import { CanvasProps } from './CanvasProps';



const Canvas = (props:CanvasProps) => {  
  const { Instructions, handleClick, options, ...rest } = props;
  const canvasRef = useCanvas(props);
  options.canvasRef = canvasRef;
  return <canvas onClick={(e) => {
      handleClick(e, canvasRef.current, options);
    }} style={{border: "1px solid black"}} ref={canvasRef} {...rest}/>
}

export default Canvas;