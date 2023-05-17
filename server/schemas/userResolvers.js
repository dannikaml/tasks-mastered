const User = require('../models');

const resolvers = {
  Query: {
    users: () => {
      // Retrieve and return all users from the database
      return User.find();
    },
    user: (_, { id }) => {
      // Retrieve and return a specific user based on the provided ID from the database
      return User.findById(id);
    },
  },
  Mutation: {
    createUser: (_, { input }) => {
      // Create a new user using the input data and save it to the database
      const newUser = new User(input);
      return newUser.save();
    },
    updateUser: (_, { id, input }) => {
      // Update the user with the provided ID using the input data and return the updated user
      return User.findByIdAndUpdate(id, input, { new: true });
    },
    deleteUser: (_, { id }) => {
      // Delete the user with the provided ID from the database and return a success message
      return User.findByIdAndDelete(id)
        .then(() => {
          return {
            success: true,
            message: 'User deleted successfully.',
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
