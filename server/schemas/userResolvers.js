const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mySecret = "dannika";
const stripe = require('stripe')('sk_test_51NB5q0CQLaxfdfIjqS6oGgKEa4QSmpzw3yYb1Ac61EPTdQj2ttzSwO1mcKuaKZX68axK7JXTfrK7JHAlAuWvMcGw00xuTLw5aK');

const resolvers = {
  Query: {
    users: () => {
      return User.find();
    },
    user: (_, { id }) => {
      return User.findById(id);
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const { username, email, password } = input;

      // Check if a user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user using the input data and save it to the database
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();

      // Return the newly created user
      return savedUser;
    },
    updateUser: (_, { id, input }) => {
      return User.findByIdAndUpdate(id, input, { new: true });
    },
    deleteUser: (_, { id }) => {
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
    loginUser: async (_, { input }) => {
      const { username, email, password } = input;

      // Check if the user with the provided email exists
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Check if the provided password matches the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      // Create a JSON Web Token (JWT) for the authenticated user
      const token = jwt.sign({ data: user.id }, mySecret, { expiresIn: '2h' });

      // Return the user's id, email, username, and the JWT token
      return {
        id: user.id,
        email: user.email,
        username: user.username,
        token,
      };
    },
    donate: async (_, { amount }) => {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Donation',
              },
              unit_amount: Math.round(amount * 100), // Convert amount to cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3001/success',
        cancel_url: 'http://localhost:3001/cancel',
      });

      return { sessionId: session.id };
    },
  },
};

module.exports = resolvers;

