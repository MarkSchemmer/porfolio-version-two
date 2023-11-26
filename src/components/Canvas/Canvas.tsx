import React from 'react'
import useCanvas from './CanvasHook'

const Canvas = (props:any) => {  
  const { draw, options, ...rest } = props;
  const { context, ...moreConfig } = options;
  const canvasRef = useCanvas(draw, {context});
  return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas;