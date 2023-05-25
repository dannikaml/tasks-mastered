const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/tasks-mastered');

module.exports = mongoose.connection;
