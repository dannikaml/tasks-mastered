import React, { useState } from 'react';
import './App.css';
import Header from "./components/Header";
import Projects from "./components/Projects";



function App() {
  const [showHomepage, setShowHomepage] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
 

  // Function to toggle all show state variables to false
  const resetShowStates = () => {
    setShowHomepage(false);
    setShowProjects(false);
  
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


  return (
    <div className="App">
      <Header
        toggleHomepage={toggleHomepage}
        toggleProjects={toggleProjects}
   
      />
      {showHomepage && <Homepage />}
      {showProjects && <Projects />}

      {/* <Footer /> */}
    </div>
  );
}


export default App;


