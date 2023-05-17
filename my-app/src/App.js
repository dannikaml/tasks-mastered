import React, { useState } from 'react';
// import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './App.css';
import Header from "./components/Header";
import Projects from "./components/Projects";
import Homepage from './components/Homepage';
import NewProject from "./components/NewProject";


function App() {
  const [showHomepage, setShowHomepage] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showNewProject, setShowNewProject] = useState(false);
  const [projects, setProjects] = useState([]);

  // Function to toggle all show state variables to false
  const resetShowStates = () => {
    setShowHomepage(false);
    setShowProjects(false);
    setShowNewProject(false);
  }

  // Functions to toggle the state variables
  const toggleHomepage = () => {
    resetShowStates();
    setShowHomepage(!showHomepage);
  }
  const toggleProjects = () => {
    resetShowStates();
    setShowProjects(!showProjects);
  }
  const toggleNewProject = () => {
    resetShowStates();
    setShowNewProject(!showNewProject);
  }

  // Function to handle creating a new project
  const handleNewProject = (newProject) => {
    setProjects([...projects, newProject]);
  }

  return (
    <div className="App">
      <Header
        toggleHomepage={toggleHomepage}
        toggleProjects={toggleProjects}
        toggleNewProject={toggleNewProject}
      />
      {showHomepage && <Homepage />}
      {showProjects && <Projects projects={projects} />}
      {showNewProject && <NewProject handleNewProject={handleNewProject} />}
    </div>
  );
}

export default App;
