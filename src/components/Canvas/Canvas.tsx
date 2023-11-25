import React from 'react'
import useCanvas from './CanvasHook'

export interface CanvasProps {
    
}

const Canvas = (props:any) => {  
  const { draw, options, ...rest } = props;
  const { context, ...moreConfig } = options;
  const canvasRef = useCanvas(draw, options);
  return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas;