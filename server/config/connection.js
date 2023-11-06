const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://mohanbeckford1:Tech263nose685%40@cluster0.6plsglq.mongodb.net');

module.exports = mongoose.connection;
