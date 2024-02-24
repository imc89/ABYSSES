const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public')); 


mongoose.connect('mongodb://127.0.0.1:27017/abysse')
.catch(err => console.log('__CONNECTION ERROR: ', err.message));

const connection = mongoose.connection;

connection.once('open', () =>{
    console.log('__CONNECTION SUCCESS__');

});

connection.on('error', (err) =>{
    console.error('__DATA BASE ERROR:', err.message);
});

const Species = mongoose.model('fishes', { 
    nombre: String,
    name: String,
    latin: String,
    length: String,
    weight: String,
    depth: String,
    range: String,
    distribucion: String,
    IUCN: String,
    url: String,
    id: String });

app.get('/getall', (req, res) => {
    Species.find({},)
    .then(doc => {
        // res.json({response: 'success', data: doc });
        res.json(doc);

    })
    .catch(err => {
        console.log('ERROR DE CONSULTA: ', err.message)
    });
})

app.listen(3000);