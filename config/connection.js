//Imports
const { connect, connection } = require('mongoose');

//Connection string
const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost:...'; //update to mongoDB uri address

//mongoDB connection string
connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;

//Another way to write connection funtion with mongoose//
//-------------------------------------------------------//
//const mongoose = require('mongoose');
//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:#####/...', {
  //useNewUrlParser: true,
  //useUnifiedTopology: true
//});
//module.exports = mongoose.connection;
//-------------------------------------------------------//
