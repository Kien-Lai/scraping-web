var request = require('request');
var cheerio = require('cheerio');

module.exports.getTitle = function(url, query, description, index) {
    return new Promise((resolve, reject) => {
        request({url: url.name, rejectUnhauthorized : false}, (error, response, html) => {
            if(error){
                reject(`${index}`);
            }
            else {
                var $ = cheerio.load(html);
                resolve({
                    query: query,
                    description: description,
                    sites: {
                        url: url.name,
                        title: $('h1').slice(0,1).text(),
                        content: $('p').text(),
                        relevance: url.relevance, 
                    }
                });
            }
        });
    })
}