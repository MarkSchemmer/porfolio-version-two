import { useRef, useEffect } from 'react';
import { IOptions } from '../../GameApps/ConwaysGameOfLife/conwaysGameofLife';

export const postdraw = (ctx:any) => (options: IOptions) => {
    // index++
    ctx.restore();
    return {
        //"frameCount": index
    };
}

export const predraw = (context:any, canvas:any) => (options: IOptions) => {
    context.save();
    resizeCanvasToDisplaySize(context, canvas, options);
    const { width, height } = context.canvas;
    context.clearRect(0, 0, width, height);
}

export const resizeCanvasToDisplaySize = (context:any, canvas:any, options: IOptions) => {
    
  if (canvas) {
    const { width, height } = canvas.getBoundingClientRect();

    if (options.width !== width || options.height !== height) {
        canvas.width = options.width;
        canvas.height = options.height;
        return true; // here you can return some usefull information like delta width and delta height instead of just true
        // this information can be used in the next redraw...
    }
  }


    return false;
}


export const handleClickForGridCoordinates = (e:any, canvas:any, options: IOptions) => {
  if (canvas) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate the grid square based on mouse coordinates
    const col = Math.floor(mouseX / options.resolution);
    const row = Math.floor(mouseY / options.resolution);

    // Log or use the clicked grid square
    console.log('Clicked on grid:', col, row);
    return [col, row]
  }

  return [];
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


  // can use for time control if needed. 
  export const canDraw = (draw:any, now:number, fpsInterval:number, then: number=0) => {
    return () => {
      if(fpsInterval === 0) { draw(); } else {
        now = Date.now();
        let elapsed = now - then;
        if (elapsed > fpsInterval) {
          then = now - (elapsed % fpsInterval);
          // console.log("I'm drawing. ");
          draw();
        }
      }

    }
  } 


// if framecount causes error we can remove, it's not needed to be honest. 
// Also instead of just 1 draw method we pass. we can could pass mutiple draw methods. 
// Or maybe we just addin the all the functions that are needed inside of the draw method...?
const useCanvas = (draw:any, options:IOptions) => {
  
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas:any = canvasRef.current;
    const context = canvas.getContext('2d');
    // let frameCount = 0;
    let animationFrameId:any;

    let pstDraw = postdraw(context);
    let pre_draw = predraw(context, canvas);

    let _draw = (options:any) => canDraw(() => draw(context, canvas, options), Date.now(), options.fpsInterval, 0);
    const render = () => {
      pre_draw(options);
      _draw(options)();
      pstDraw(options);
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