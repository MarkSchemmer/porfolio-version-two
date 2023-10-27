import React from "react";
import { useDispatch } from "react-redux";
import { HandleTicTacToeClick, SwitchTurn, TicTacToeEnum } from "../slices/TicTacToeSlice";
import { Square } from "./Square";

export const SquareComponent = (props: {square: Square}) => {
    const dispatch = useDispatch();
    return (
        <div className="square" onClick={() => {
            if (props.square.value === null) 
            {
                dispatch(HandleTicTacToeClick({sqaure: props.square}));
                dispatch(SwitchTurn(null));
            }
        }}>
            <span className="sq-txt">
                {props.square.value != null ? props.square.value : ""}
            </span>
        </div>
    )
}