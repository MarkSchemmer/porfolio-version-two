import React, { useEffect } from "react";
import "../Header/header.css";

// credit: Saku-Hasu --

// let toggle = false;

const addStyles = (navbox: HTMLDivElement) => {
  navbox.style.height = "20rem";
  navbox.style.transition = "0.5s";
};

const removeStyles = (navbox: HTMLDivElement) => {
  navbox.style.height = "0rem";
};

const handleClick = (() => {
  return {
    click: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const navbox = Array.from(document.getElementsByClassName("navbox"))[0] as unknown as HTMLDivElement;
    let toggle = navbox.style.height === "0rem" || navbox.style.height === "";
    // console.log(navbox.style.height);
    toggle ? addStyles(navbox) : removeStyles(navbox);
  }
}
})();

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}

/*
  
        Possible refactor for future, instead of having a global variable, we can just create 
        toggle on the fly by testing against the height of the navbox then applying the needed 
        styles... 
  
  */

const handleResize = (e: any) => {
  const navbox: HTMLDivElement = Array.from(document.getElementsByClassName("navbox"))[0] as unknown as HTMLDivElement;
  const navBoxHeight = parseInt(navbox.style.height.split("")[0]) > 0;
  if (getWidth() >= 745 && navbox && navBoxHeight) {
    removeStyles(navbox);
  }
  // console.log(getWidth());
};

export default function Header() {

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div className="header">
      <div className="logo">Webpage.</div>
      <nav className="navbar">
        <button onClick={(e) => { handleClick.click(e); }}>☰</button>
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
