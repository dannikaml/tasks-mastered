import React from "react";

function Header({ toggleHomepage, toggleProjects }) {
    return (
      <header className="App-Header">
        <h1>Tasks Mastered</h1>
        <nav>
          <ul>
            <a href="#homepage" onClick={toggleHomepage}>
                Homepage
            </a>
            <a href="#projects" onClick={toggleProjects}>
                Projects
            </a>

          </ul>
        </nav>
      </header>
    );
  }
  

export default Header;