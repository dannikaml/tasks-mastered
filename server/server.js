const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const dotenv = require('dotenv'); // Add dotenv package

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

dotenv.config(); // Load environment variables from .env

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../my-app/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

// Connect to MongoDB
db.once('open', () => {
  // Create a new instance of an Apollo server with the GraphQL schema
  server.start().then(() => {
    server.applyMiddleware({ app });

    app.listen(PORT, () => {
      console.log(`Now listening... API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
});
