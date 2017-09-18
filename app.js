var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
const bodyParser = require('body-parser');
var controller = require('./controller');

var app = express();
app.use(bodyParser.json({ extended : true}));
app.use(bodyParser.urlencoded({extended: true}));

app.post('/scrape', (req, res) => {
    const arrLink = req.body.data.arrLink;
    const query = req.body.data.query;
    Promise.all(arrLink.map( url => controller.getTitle(url, query)))
    .then(success => res.send(success))
    .catch(err => res.send(err));
})

app.listen(3000, (req, res) => {
    console.log('server is runing at localhost://3000');
})