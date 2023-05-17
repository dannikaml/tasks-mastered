import React, { useState } from 'react';

const NewProject = ({ onAddProject }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      const newProject = {
        title,
        description,
      };
      onAddProject(newProject);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Project</h2>
      <p><label htmlFor="title">Title:</label>
      <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required /></p>
      <p><label htmlFor="description">Description:</label>
      <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required /></p>
      <button type="submit">Add Project</button>
    </form>
  );
};

export default NewProject;
