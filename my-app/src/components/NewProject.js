import React, { useState } from 'react';

const NewProject = ({ handleNewProject }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description) {
      const newProject = {
        title,
        description,
      };
      let data = await localStorage.getItem('projects') || []
      if (data) {
        data = JSON.parse(data) || []
      }
      data.push(newProject);
      localStorage.setItem('projects', JSON.stringify(data))
      handleNewProject(newProject);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-project-form">
      <h2>New Project</h2>
      <p>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="new-project-input"
        />
      </p>
      <p>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="new-project-textarea"
        />
      </p>
      <button type="submit" className="new-project-button">+ Add Project</button>
    </form>
  );
};

export default NewProject;

