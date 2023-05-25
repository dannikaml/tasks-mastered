import React, { useState, useEffect } from 'react';


const Projects = ({ projects }) => {
  const [tasks, setTasks] = useState([]);
  const [data, setData] = useState(projects ? projects : [])

  const getTask = async () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      console.log('task data ===', savedTasks, JSON.parse(savedTasks));
      setTasks(JSON.parse(savedTasks));
    }
  }

  useEffect(() => {
    console.log('check project props ===', projects)
    // Retrieve tasks data from localStorage when the component mounts
    getTask()
  }, []);

  useEffect(() => {
    // Save tasks data to localStorage whenever it changes
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskChange = (index, event, taskIndex) => {
    const newTasks = [...tasks];
    newTasks[index][taskIndex] = event.target.value;
    setTasks(newTasks);
  };

  const handleTaskComplete = (index, taskIndex) => {
    const newTasks = [...tasks];
    newTasks[index][taskIndex] = `✓ ${newTasks[index][taskIndex]}`;
    setTasks(newTasks);
  };

  const handleAddTask = (index) => {
    const newTasks = [...tasks];
    if (newTasks[index]) {
      newTasks[index].push('');
    } else {
      newTasks[index] = [''];
    }
    setTasks(newTasks);
  };

  return (
    <div className="projects-container">
      <h2 className="projects-heading">My Projects</h2>
      <ul className="projects-list">
        {data.length && data.map((project, index) => (
          <li key={project.id} className="project-item">
            <h2 className="project-title">{project.title}</h2>
            <p className="project-description">{project.description}</p>
            {tasks[index] &&
              tasks[index].map((task, taskIndex) => (
                <div key={taskIndex} className="task-item">
                  <input
                    type="text"
                    value={task}
                    onChange={(event) => handleTaskChange(index, event, taskIndex)}
                    className="task-input"
                  />
                  <button
                    onClick={() => handleTaskComplete(index, taskIndex)}
                    className="task-button"
                  >
                    Mark Complete
                  </button>
                </div>
              ))}
            <button onClick={() => handleAddTask(index)} className="add-task-button">
              + Add Task
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
