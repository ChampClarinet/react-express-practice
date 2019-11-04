const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

//*Declarations
const app = express()
const port = process.env.port || 4000

//*Middlewares
app.use(cors())
app.use(express.json())

//*URI
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB connected.'));

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//*If not in any routes, response with 404.
app.use((req, res) => {
  res.send(404)
})

//*Listen and start the server
app.listen(port, () => console.log(`It\'s works!, listen on ${port}`))