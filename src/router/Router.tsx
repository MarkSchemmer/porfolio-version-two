import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import TodoMVC from "../GameApps/TodoMvc/entities/todoMvc";
import { TicTacToe } from "../GameApps/TicTacToe/entities/TicTacToe";
import { ConWaysGameOfLife } from "../GameApps/ConwaysGameOfLife/conwaysGameofLife";
import { SnakeComponent } from "../GameApps/Snake/SnakeComponent";
import { SolarComponent } from "../GameApps/Solar/SolarComponent";
import { TwentyFortyEightComponent } from "../GameApps/2048/canvas-version/2048Canvas";
import { MouseCurserComponent } from "../GameApps/MouseCurserGame/MouseCurser";
import { PuzzleDrag } from "../GameApps/puzzleDrag/PuzzleDrag";
import { PongComponent } from "../GameApps/Pong/PongComponent";

export default function Router() {
    return (
        <div className="router">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage /> } />
                    <Route path="/todo" element={<TodoMVC />} />
                    <Route path="/tic" element={<TicTacToe />} />
                    <Route path="/con" element={<ConWaysGameOfLife /> } />
                    <Route path="/snake" element={<SnakeComponent /> } /> 
                    <Route path="/sol" element={<SolarComponent /> } />
                    <Route path="/2048" element={<TwentyFortyEightComponent /> } />
                    <Route path="/mouse" element={<MouseCurserComponent /> } />
                    <Route path="/m" element={<PuzzleDrag /> } /> 
                    <Route path="/pong" element={<PongComponent />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}