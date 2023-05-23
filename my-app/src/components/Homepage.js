import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Homepage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // check if user is logged in
    const checkLoginStatus = () => {
      // Check login status 
      const token = localStorage.getItem('token');
      if (token) {
        // User is logged in
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    // user logout
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      <section className="intro">
        <h1>Welcome to the Task Manager App</h1>
        <p>
          Welcome to our Project Task Management App! This powerful tool is designed to help you stay organized, collaborate effectively, and conquer your projects with ease. Whether you're working on personal tasks or managing a team, our app provides all the features you need to streamline your workflow.
        </p>
       
      </section>

      <section className="getting-started">
        <h2>How to Get Started</h2>
        <p className='access'>
          In order to access the full features of our app, please log in or sign up for an account. Start managing your tasks and staying organized today!
        </p>
          <li>Create an account or log in if you already have one.</li>
          <li>Create New Projects and then add tasks to them.</li>
          <li>Track your progress and mark tasks as completed.</li>
          <li>Stay organized and manage your tasks efficiently!</li>
         
      </section>

      <section className="login-signup">
        {!isLoggedIn && !showDropdown && (
          <button onClick={handleDropdownToggle}>LOGIN - SIGNUP</button>
        )}
        {showDropdown && (
          <div className="dropdown">
            <LoginForm />
            <p>Don't have an account? <SignupForm /></p>
          </div>
        )}
      </section>

      {isLoggedIn && (
        <section>
          <h2>Logged-in Content</h2>
          <p>Welcome, you are logged in!</p>
          <button onClick={handleLogout}>Logout</button>
          
        </section>
      )}
    </div>
  );
};

export default Homepage;


