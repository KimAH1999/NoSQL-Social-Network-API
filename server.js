//Imports
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

//PORT string and middleware functions
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


//PORT connection with mongo
db.once('open',() => {
  app.listen(PORT, () => {
    console.log(`Running on PORT # => ${PORT} !`);
  });
})