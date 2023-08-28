import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import TodoMVC from "../GameApps/TodoMvc/todoMvc";

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

          <Route path="/" element={<HomePage />} />
          {/*
                Routes below are for me in developing my apps
          */}
          <Route path="development/apps/todomvc" element={<TodoMVC />} />
      </Routes>
    </BrowserRouter>
        </div>
    );
}