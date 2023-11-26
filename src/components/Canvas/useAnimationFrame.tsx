import { useEffect, useRef, useState } from 'react';

type AnimationCallback = () => void;

export const useAnimationFrame = (interval: number, callback: AnimationCallback): { start: () => void; stop: () => void } => {

  const requestIdRef = useRef<number | null>(null);
  const nowRef = useRef<number | null>(null);
  const elapsedRef = useRef<number | null>(null);
  const callBackRef = useRef<AnimationCallback>(callback);
  const thenRef = useRef<number>(0);
  const intervalRef = useRef<number>(interval);
  const [runner, setRunner] = useState(true);
  const loop = () => {
    
    if (runner) {
        nowRef.current = Date.now();
        elapsedRef.current = nowRef.current - thenRef.current;
    
        if (elapsedRef.current >= intervalRef.current) {
          console.log("I'm being called");
          thenRef.current = nowRef.current - (elapsedRef.current % intervalRef.current);
          console.log(callBackRef.current);
          callBackRef.current();
        }
    
        requestIdRef.current = window.requestAnimationFrame(loop);
    }
  };

  useEffect(() => {
    console.log(callback);
   callBackRef.current = callback;
  }, [callBackRef]);

  const start = () => {
    setRunner(true);
    requestIdRef.current = window.requestAnimationFrame(loop);
  };

  const stop = () => {
    setRunner(false);
    if (requestIdRef.current)
        window.cancelAnimationFrame(requestIdRef.current);
  };

  return { start, stop };
};
