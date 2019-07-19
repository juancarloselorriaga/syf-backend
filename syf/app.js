require('dotenv').config()

const express    = require('express');
const logger     = require('morgan');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

const app = express();

//Connecting to the db
mongoose
.connect(`${process.env.DB_HOST}`, {useNewUrlParser: true})
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

//Errors
const errorController = require('./controllers/errors')

//Handler error 404 - Resource not found
app.use(errorController.get404)

//Handler error 505 - Internal server error
app.use(errorController.get500)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server has started on ${PORT}`))

