const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

// Para que nodemon se reinice cuando se modifica un
// archivo .hbs, se lo debe ejecutar asi:
// nodemon server.js -e js,hbs

var app = express();

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

app.use((req, res, next) => {
    let now = new Date();
    let log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    next();  // Requerido para que se continue ejecutando el ruteo
});

// Mensaje de mantenimineto:
// -------------------------
// app.use((req, res, next) => {    res.render('maintenance.hbs'); });
// -------------------------

app.use('/', express.static(__dirname + '/archivos_publicos'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('mayusculas', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) =>{
    //res.send('<h1>Home</h1>');
    res.render('home.hbs', {
        head: {
            title: 'Un sitio web mas',
        },
        body: {
            title: 'Home page!',
            subtitle: 'El punto de partida hacia internet...',
            welcomeMessage: 'Bienvenido a mi sitio web',
        },
        footer: {
            message: 'Un sitio creado por Jonatandb',
        }
    })
});

app.get('/about', (req, res) =>{
    res.render('about.hbs', {
        head: {
            title: 'About page',
        },
        body: {
            title: 'Este sitio es de prueba!',
            subtitle: 'Un sitio creado por Jonatandb',
        },
        footer: {
            message: 'Un sitio creado por Jonatandb',
        }
    });
});

app.listen(PORT, ()=> {
    console.log(`Servidor inciado en el puerto ${PORT}`);
});

