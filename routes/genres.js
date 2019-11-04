const express = require('express');
const router = express.Router();

const genres = [
    {id:1, name: 'Action'},
    {id:2, name: 'Horror'},
    {id:3, name: 'Adventure'},
    {id:4, name: 'Fiction'}
];

router.get('/', (req, res) => {
    res.send(genres);
});

router.post('/', (req, res) => {
    const genre = {
        id:genres.length+1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genres);
});

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    const genre = genres.find((g)=>g.id===parseInt(req.params.id)) ;
    if(!genre){
        res.status(404).send('trying to delete an unexisting genre');
    } else{
        const index = genres.indexOf(genre);
        genres.splice(index,1);
        res.send(genres);
    }
});

module.exports = router;