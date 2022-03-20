const mongoose = require('mongoose');
require('dotenv').config();

module.exports = () => {
  function connect() {
    var databaseUrl = process.env.DATABASE_URL;
    mongoose.connect(databaseUrl, function(err) {
      if (err) {
        console.error('mongodb connection error', err);
      }
      console.log('mongodb connected');
    });
  }
  connect();
  mongoose.connection.on('disconnected', connect);
  
}; 