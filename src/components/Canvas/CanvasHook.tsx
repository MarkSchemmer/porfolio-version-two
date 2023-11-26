import { useRef, useEffect } from 'react'

export const postdraw = (ctx:any) => () => {
    // index++
    ctx.restore();
    return {
        //"frameCount": index
    };
}

export const predraw = (context:any, canvas:any) => () => {
    context.save();
    resizeCanvasToDisplaySize(context, canvas);
    const { width, height } = context.canvas;
    context.clearRect(0, 0, width, height);
}

export const resizeCanvasToDisplaySize = (context:any, canvas:any) => {
    
    const { width, height } = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true; // here you can return some usefull information like delta width and delta height instead of just true
        // this information can be used in the next redraw...
    }

    return false;
}

export const resizeCanvasHighDensityDevices = (context:any, canvas:any) => {
    const { width, height } = canvas.getBoundingClientRect();
    
    if (canvas.width !== width || canvas.height !== height) {
        const { devicePixelRatio:ratio=1 } = window;
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        context.scale(ratio, ratio);
        return true;
    }

    return false;
  }


// if framecount causes error we can remove, it's not needed to be honest. 
// Also instead of just 1 draw method we pass. we can could pass mutiple draw methods. 
// Or maybe we just addin the all the functions that are needed inside of the draw method...?
const useCanvas = (draw:any, options={}) => {
  
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas:any = canvasRef.current;
    const context = canvas.getContext('2d');
    // let frameCount = 0;
    let animationFrameId:any;

    let pstDraw = postdraw(context);
    let pre_draw = predraw(context, canvas);
    const render = () => {
      pre_draw();
      draw(context);
      pstDraw();
      animationFrameId = window.requestAnimationFrame(render);
    }

    render();
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    };
  }, [draw]);
  
  return canvasRef;
}

export default useCanvas;