import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import TodoMVC from "../GameApps/TodoMvc/entities/todoMvc";
import { TicTacToe } from "../GameApps/TicTacToe/entities/TicTacToe";

export default function Router() {
    return (
        <div className="router">
    <BrowserRouter>
      <Routes>
          {/* 
          

          Example of how to additional routes...
          
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
          
          {/* Change this later to <HomePage /> */}
          <Route path="/" element={<TodoMVC />} />
          <Route path="/tic" element={<TicTacToe />} />
          {/*
                Routes below are for me in developing my apps
          */}
          <Route path="development/apps/todomvc" element={<TodoMVC />} />
      </Routes>
    </BrowserRouter>
        </div>
    );
}