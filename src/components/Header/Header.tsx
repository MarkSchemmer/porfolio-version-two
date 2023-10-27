import React from 'react';
import hpv2 from '../../Assets/homepage-backgroundv2.svg';
import lbe from '../../Assets/top-leftbar-element.svg';

function MyComponent() {
    return (
      <div>
        <img src={hpv2} alt="home-page-image" className='home-page' />
      </div>
    );
  }

  function MyComponent2() {
    return (
      <div>
        <img src={lbe} alt="left-bar-element" className='leftbar-element' />
      </div>
    );
  }

export default function Header() {
    return (
    <div className="header">
        <div className="topbar">

            <div className="topbar-textbox-right">
                <div className="right-corner-text">
                    <div className="about-me">About Me</div>
                    <div className="contacts">Contacts</div>
                    <div className="projects">Projects</div>
                    <div className="codewars">Codewars</div>
               </div>
            </div>
            </div>

              <div className="topbar-leftcorner-insert-box">
                <div className="left-corner-insert-element">
                  <div className="ib">
                 <MyComponent2/>
                 </div>
               </div>
             </div>

              <div className="homepage">
              <div className="hp">
              <MyComponent/>
             </div>
            </div>
    </div>
    );
}