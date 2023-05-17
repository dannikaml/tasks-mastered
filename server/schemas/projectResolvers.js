const Project = require('../models');

const resolvers = {
  Query: {
    projects: () => {
      // Retrieve and return all projects from the database
      return Project.find();
    },
    project: (_, { id }) => {
      // Retrieve and return a specific project based on the provided ID from the database
      return Project.findById(id);
    },
  },
  Mutation: {
    createProject: (_, { input }) => {
      // Create a new project using the input data and save it to the database
      const newProject = new Project(input);
      return newProject.save();
    },
    updateProject: (_, { id, input }) => {
      // Update the project with the provided ID using the input data and return the updated project
      return Project.findByIdAndUpdate(id, input, { new: true });
    },
    deleteProject: (_, { id }) => {
      // Delete the project with the provided ID from the database and return a success message
      return Project.findByIdAndDelete(id)
        .then(() => {
          return {
            success: true,
            message: 'Project deleted successfully.',
          };
        })
        .catch((error) => {
          return {
            success: false,
            message: error.message,
          };
        });
    },
  },
};

module.exports = resolvers;

  