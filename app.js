// Importo els móduls que farà servir l'aplicació (web).
const express = require('express'); // El framework Express.
const datastore = require('nedb'); // La mini-BBDD Documental (nedb).

// Creo l'aplicació (web) utilitzant el framework express.
const app = express();
//const port = 80;

app.set('port', 80);
// Creo servidor Http que escoltarà peticions contra el port
// que hem definit.
app.listen(app.get('port'), () => {
    console.log(`Servidor escoltant en el port ${port}`)
});

// Creo la BBDD documental i la inicialitzo per el seu ús.
const database = new datastore('fideua2021.db');
database.loadDatabase();

// Rutes fitxers.
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

// Faig petició tipus GET, que indica que estic recuperant
// recursos i que aquests els posarà a la ruta '/'. La callback
// function serà la (request, response) que li passarem dos paràmetres.
app.get('/', (request, response) => {
    // La resposta del servidor/app al entrar, serà la pàgina html
    // que li enviem.
    response.sendFile(__dirname + '/views/index.html')
});

app.post('/api', (request, response) => {
    const data = request.body;
    database.insert(data);
    response.json(data);
})

app.get('/api', (request, response) => {
    database.find({},(err, data) => {
       if (err) {
           response.end();
           return;
       }
       response.json(data);
    })
})
