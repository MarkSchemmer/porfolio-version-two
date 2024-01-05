import React, { useEffect, useState } from "react";
import classes from "../Header/header.module.scss";
// import Sword from "../Header/header-images/dark-sword.png"; Note: Add Later

// credit: Saku-Hasu --

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
export default function Header() {

  let [toggle, setToggle] = useState(false);

  let handleToggle = () => {
    setToggle(!toggle);
  }

  useEffect(() => {
    let handleResize = () => {
      if (getWidth() >= 823) {
        setToggle(false);
      }
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    // Markup
    <div className={classes.header}>
      {/* <img className={classes.sword} src={Sword} alt="dark blade" /> */}
      <div className={classes.logo}>Saku <span className={classes.style}>Hasu.</span></div>
      <nav className="navbar">
        <button className={classes.button} onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { handleToggle(); }}>☰</button>
        <div className="navbox">
          <ul id="ul-nav" className={toggle ? classes.show : classes.hide}>
            <li className={classes.cont}><a href="/">Home</a></li>
            <li className={classes.cont}><a href="/">Skills</a></li>
            <li className={classes.cont}><a href="/">Projects</a></li>
            <li className={classes.cont}><a href="/">Contact</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
