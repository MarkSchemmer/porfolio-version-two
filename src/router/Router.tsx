import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import TodoMVC from "../GameApps/TodoMvc/entities/todoMvc";
import { TicTacToe } from "../GameApps/TicTacToe/entities/TicTacToe";
import { ConWaysGameOfLife } from "../GameApps/ConwaysGameOfLife/conwaysGameofLife";
import { SnakeComponent } from "../GameApps/Snake/SnakeComponent";
import { SolarComponent } from "../GameApps/Solar/SolarComponent";

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
                </Routes>
            </BrowserRouter>
        </div>
    );
}