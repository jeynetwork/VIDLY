const express = require('express');
const Joi = require('joi');
const genres = require('./routes/genres');
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());
app.use('/vidly.com/api/genres/', genres);

app.get('/', (req, res) => {
    res.render('index', {title: 'my express app', message: 'Hello there!!'});
});



app.listen(3000);