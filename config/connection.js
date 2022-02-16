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