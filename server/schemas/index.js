const projectResolvers = require('./projectResolvers');
const userResolvers = require('./userResolvers');

const projectTypeDefs = require('./projectTypeDefs');
const userTypeDefs = require('./userTypeDefs');

const typeDefs = [projectTypeDefs, userTypeDefs];
const resolvers = [projectResolvers, userResolvers];

module.exports = { typeDefs, resolvers };

