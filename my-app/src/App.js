import React, { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.css';
import Header from "./components/Header";
import Projects from "./components/Projects";
import Homepage from './components/Homepage';
import NewProject from "./components/NewProject";
import Donate from "./components/Donate";

// GraphQL API endpoint
const httpLink = createHttpLink({
  uri: 'https://serene-tundra-36250.herokuapp.com/',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {

  const [showHomepage, setShowHomepage] = useState(true);
  const [showProjects, setShowProjects] = useState(false);
  const [showNewProject, setShowNewProject] = useState(false);
  const [projects, setProjects] = useState([]);
  const [showDonate, setShowDonate] = useState(false);

  const getProjects = async () => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      setProjects(parsedProjects);
    }
  }


  useEffect(() => {
    getProjects();
  }, [])

  // Function to toggle all show state variables to false
  const resetShowStates = () => {
    setShowHomepage(false);
    setShowProjects(false);
    setShowNewProject(false);
    setShowDonate(false);
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
  const toggleDonate = () => {
    resetShowStates();
    setShowDonate(!showNewProject);
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
        toggleDonate={toggleDonate}
      />

      {showHomepage && <Homepage toggleHomepage={toggleHomepage} />}
      {showProjects && <Projects projects={projects} />}
      {showNewProject && <NewProject handleNewProject={handleNewProject} />}
      {showDonate && <Donate toggleDonate={toggleDonate} />}
    </div>
  );
}

export default App;
