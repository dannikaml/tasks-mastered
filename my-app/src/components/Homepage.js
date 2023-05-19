import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Homepage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    
    const checkLoginStatus = () => {
      // Check if user is logged in using local storage or an API call
      const loggedInStatus = localStorage.getItem('isLoggedIn');
      const userIsLoggedIn = loggedInStatus === 'true'; // Convert string to boolean

      setIsLoggedIn(userIsLoggedIn);
    };

    checkLoginStatus();
  }, []);

  return (
    <div>
      <section className="intro">
        <h1>Welcome to the Task Manager App</h1>
        <p>
        Welcome to our Project Task Management App! This powerful tool is designed to help you stay organized, collaborate effectively, and conquer your projects with ease. Whether you're working on personal tasks or managing a team, our app provides all the features you need to streamline your workflow.

With our app, you can create projects and break them down into tasks, set due dates, assign responsibilities, and track progress all in one place. Stay on top of your deadlines with timely notifications and reminders. Communicate seamlessly with your team members through comments and discussions attached to each task. Prioritize tasks, mark them as complete, and visualize your progress with intuitive project boards and task lists.

Our goal is to simplify your project management experience and empower you to achieve your goals efficiently. Start using our Project Task Management App today and take control of your projects like never before. Let's boost your productivity and success together!
        </p>
        <p>
          In order to access the full features of our app, please log in or sign up for an account. Start managing your
          tasks and staying organized today!
        </p>
      </section>

      <section className="how-to-get-started">
        <h2>How to Get Started</h2>
        <ol>
          <li>Create an account or log in if you already have one.</li>
          <li>Add your tasks and assign them to different projects.</li>
          <li>Set due dates and priorities for your tasks.</li>
          <li>Track your progress and mark tasks as completed.</li>
          <li>Stay organized and manage your tasks efficiently!</li>
        </ol>
      </section>
      
      <section className="login-signup">
        {!isLoggedIn && <LoginForm />}
        {!isLoggedIn && <SignupForm />}
      </section>

      
    </div>
  );
};

export default Homepage;

