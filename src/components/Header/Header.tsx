import React, { useEffect } from "react";
import classes from "../Header/header.module.scss";

// credit: Saku-Hasu --
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

// Move to util file. 
function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

// move to util file. 
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
};

export default function Header() {

  return (
    <div className={classes.header}>
      <div className="logo">Webpage.</div>
      <nav className="navbar">
        <button className={classes.button} onClick={(e) => { handleClick.click(e); }}>☰</button>
        <div className="navbox">
          <ul>
            <li className="cont"><a href="">Home</a></li>
            <li className="cont"><a href="">Skills</a></li>
            <li className="cont"><a href="">Projects</a></li>
            <li className="cont"><a href="">Contact</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
