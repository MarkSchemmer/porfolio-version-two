import react from 'react';
import { useDispatch } from 'react-redux';
import { HandleTicTacToeClick, TicTacToeEnum } from '../slices/TicTacToeSlice';
import { e2 } from '../../../Utils/Util';




export class Square {

    // width and height
    public Dimension = "100px";
    public boderColor = "black";
    public value: any = null;
    public x: number;
    public y: number;
    public id:any = e2();
    public winningSquare: boolean = false;

    constructor(val:any, x:number, y:number) {
        this.value = val;
        this.x = x;
        this.y = y;
    }
}

