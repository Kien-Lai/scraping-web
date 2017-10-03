var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
const bodyParser = require('body-parser');
require('events').EventEmitter.prototype._maxListeners = 100;
var controller = require('./controller');

var app = express();
app.use(bodyParser.json({ extended : true}));
app.use(bodyParser.urlencoded({extended: true}));

app.post('/scrape', (req, res) => {
    const arrLink = req.body.data.arrLink;
    const query = req.body.data.query;
    const description = req.body.data.description;
    Promise.all(arrLink.map( (url, index) => controller.getTitle(url, query, description, index)))
    .then(success => res.send(success))
    .catch(err => res.send(err));
})

if ('development' == app.get('env')) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

app.listen(3000, (req, res) => {
    console.log('server is runing at localhost://3000');
})