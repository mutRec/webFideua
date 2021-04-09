//imports
const express = require('express');
const datastore = require('nedb');

//creo l'aplicació (web) utilitzant el framework express.
const app = express();
const port = 3000;

const database = new datastore('fideua2021.db');
database.loadDatabase();

//static files.
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

app.get('', (request, response) => {
    response.sendFile(__dirname + '/views/index.html')
});

//listen on port 3000.
app.listen(port, () => console.info(`Listening on port ${port}`));

//aplico en base a la resposta del fetch, la inserció permanent a la BBDD nedb (fideua2021.db).
app.post('/api', (request, response) => {
    const data = request.body;
    database.insert(data);
    response.json(data);
})

//aplico la resposta consulta de les dades.
app.get('/api', (request, response) => {
    database.find({},(err, data) => {
       if (err) {
           response.end();
           return;
       }
       response.json(data);
    })
})