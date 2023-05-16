const { Schema, model } = require('mongoose');

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
});

const Project = model('Project', projectSchema);

module.exports = Project;
