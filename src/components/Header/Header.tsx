import React from 'react';
import hpv2 from '../../Assets/homepage-backgroundv2.svg';

function MyComponent() {
    return (
      <div>
        <img src={hpv2} alt="home-page-image" />
      </div>
    );
  }

export default function Header() {
    return (
    <div className="header">
        <div className="topbar">
            <div className="topbar-text">
                <div className="right-corner">
                    
                    <div className="about-me">About Me</div>
                    <div className="contacts">Contacts</div>
                    <div className="projects">Projects</div>
                    <div className="codewars">Codewars</div>
                </div>
            </div>
          
        </div>
        <MyComponent/>
    </div>
    );
}