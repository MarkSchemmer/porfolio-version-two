import React, { useEffect } from "react";
import "../Header/header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="logo">Webpage.</div>
      <nav className="navbar">
        <button onClick={() => { }}>☰</button>
        <div className="navbox">
          <ul>
            <li><a href="" id="cont">Home</a></li>
            <li><a href="" id="cont">Skills</a></li>
            <li><a href="" id="cont">Projects</a></li>
            <li><a href="" id="cont">Contact</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
