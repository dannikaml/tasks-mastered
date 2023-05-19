import React from "react";

function Header({ toggleHomepage, toggleProjects, toggleNewProject }) {
  return (
    <div className="header-container">
      <h1>Tasks Mastered</h1>
      <nav>
        <a href="#homepage" onClick={toggleHomepage}>
          Homepage
        </a>
        <a href="#projects" onClick={toggleProjects}>
          My Projects
        </a>
        <a href="#newProject" onClick={toggleNewProject}>
          + NewProject
        </a>
      </nav>
    </div>
  );
}

export default Header;

