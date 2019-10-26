const express = require('express');
const Joi = require('joi');
var app = express();
app.use(express.json());

const genres = [
    {id:1, name: 'Action'},
    {id:2, name: 'Horror'},
    {id:3, name: 'Adventure'},
    {id:4, name: 'Fiction'}
];

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/vidly.com/api/genres', (req, res) => {
    res.send(genres);
});

app.post('/vidly.com/api/genres', (req, res) => {
    const genre = {
        id:genres.length+1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genres);
});

app.put('/vidly.com/api/genres/:id', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required(),
    };
    const result = Joi.validate(req.body, schema);
    const genre = genres.find( (g)=>g.id=== parseInt(req.params.id));
    if(genre){

        if(result.error){
            res.status(400).send(result.error.details[0].message);
        } else{
            genre.name= req.body.name;
            res.send(genres);   
        }
    } else{
        res.status(404).send('Wrong Id of genre');
    }
});

app.delete('/vidly.com/api/genres/:id', (req, res) => {
    const genre = genres.find((g)=>g.id===parseInt(req.params.id)) ;
    if(!genre){
        res.status(404).send('trying to delete an unexisting genre');
    } else{
        const index = genres.indexOf(genre);
        genres.splice(index,1);
        res.send(genres);
    }
});

app.listen(3000);