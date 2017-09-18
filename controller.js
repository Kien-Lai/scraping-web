var request = require('request');
var cheerio = require('cheerio');

module.exports.getTitle = function(url, query) {
    return new Promise((resolve, reject) => {
        request(url, (error, response, html) => {
            if(error){
                reject(error);
            }
            else {
                var $ = cheerio.load(html);
                resolve({
                    query: query,
                    sites: {
                        url: url,
                        title: $('h1').slice(0,1).text(),
                        content: $('p').slice(0,3).text(),
                    }
                });
            }
        });
    })
}