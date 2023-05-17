const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  taskInput: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userSignedIn: {
    type: Boolean,
    default: true,
  },
  tasks: [taskSchema], // Array of tasks associated with the project
});

const Project = model('Project', projectSchema);

module.exports = Project;
