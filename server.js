const express = require('express');
const mongoose = require('mongoose');
const app = express();

//DB config
const db = require('./config/keys').mongoURI
//connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log('MongoDb connected'))
  .catch(err => console.log(err));


//First route
app.get('/', (req,res) => res.send('Hello!'));
const port = 7100;
app.listen(port, ()=> console.log(`Server running on port ${port}`));

