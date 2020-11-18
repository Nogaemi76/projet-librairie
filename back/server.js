const express = require('express');
// const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./database/db');

//api
const api = require('./routes/auth.routes');
const productRoute = require('./routes/product.routes');

//database connection
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database is connected');
},
    error => {
        console.log("Database is not connected : " + error)
    }
);

//deprecation fix
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended : false}));
app.use(cors());

app.use('/api', api);
app.use('/products', productRoute);

app.use('/public', express.static('public'));

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log("Connected to port " + port)
});


//express error handling
app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error("Something went wrong on express"));
    });
});

app.use((err, req, res, next) => {
    console.error(err.message); // Log error message in our server's console
    if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});