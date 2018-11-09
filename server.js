const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', text => {
    return text.toUpperCase();
});

app.set('view engine', hbs);
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    const now = new Date().toString();

    const log = `${now}: ${req.method} ${req.url}`;

    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        console.log('Unable to connect');
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        title: 'Oops'
    });
})

app.get('/', (req, res) => {
    // res.send({
    //     name: 'Beto',
    //     age: 25
    // })
    res.render('home.hbs', {
        title: 'Home Page',
        welcomeMessage: 'Welcome to this webpage'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle this request!'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
