export interface CanvasProps {
    draw: (ctx:any, canvas:any, options: IOptions, now:number) => void;
    handleClick: (e:any, canvas:any, options:IOptions) => void;
    options: IOptions;
  }
  
  export interface IOptions {
    context: string;
    moreConfig: any;
    fpsInterval: number;
    width:number;
    height:number;
    resolution: number;
    runner: boolean;
  }