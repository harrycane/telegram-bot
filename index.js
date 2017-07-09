const express = require('express');
const http = require('http');
const path = require('path');
const request = require('request');
const reload = require('reload');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();

const api_url = 'https://api.telegram.org/bot';
const token = '378472326:AAH2GePz2soXatGF-YeEtZjg53JI6Xomfdk/';
const METHOD = {
    SEND_MESSAGE: 'sendMessage'
};

const publicDir = path.join(__dirname, 'public');

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(publicDir, 'index.html'));
});

// request('http://www.google.com', function () {
//     console.log('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     console.log('body:', body); // Print the HTML for the Google homepage.
// });

const requestToApi = request(api_url + token, function(error, response, body){
    return body.json();
});
app.render(requestToApi.body);


const server = http.createServer(app);

reload(server, app);

server.listen(app.get('port'), function () {
    console.log("Web server listening on port " + app.get('port'));
});
