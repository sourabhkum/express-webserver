const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port=process.env.PORT||3000;

var app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerAsyncHelper('scremIt', (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    var now = new Date().toDateString();
    var log = `${now}:${req.method}${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('unable to write');
        }
    });
    next();
});
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        pageDescription: 'This is home page'

    })
});
app.get('/hello', (req, res) => {
    res.send({
        name: 'sourabh',
        intrest: [
            'Riding',
            'reading'
        ]
    });
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About',
        pageDescription: 'This is About Page'
    });
});
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'unable to handle request'
    });
});
app.listen(port, () => {
    console.log(`server up on ${port}`);
});