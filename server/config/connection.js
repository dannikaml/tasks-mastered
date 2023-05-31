const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://dannikaml:!Zanthee1@atlascluster.t8x0gg2.mongodb.net");

module.exports = mongoose.connection;
