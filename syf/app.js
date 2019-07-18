const express    = require('express');
const logger     = require('morgan');
const path       = require('path');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

//Connecting to the db
mongoose
  .connect('mongodb://localhost/syf', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

//Middleware setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/users');

app.use('/admin', adminRoutes);
app.use('/users', userRoutes);

//Public
app.use(express.static('public'));

//Handler erro 404 - Resource not found
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, './public/404.html'))
})

//Handler error 505 - Internal server error
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.sendFile(path.join(__dirname, './public/500.html'))
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server has started on ${PORT}`))

