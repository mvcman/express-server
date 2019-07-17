const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname ='localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes', (req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
});

// Routes without dishID
app.get('/dishes', (req, res, next) => {
  res.end('Will send all dishes to you!')
});

app.post('/dishes', (req, res, next) => {
  res.end('Will add the dish: ' + req.body.name + ' with details ' + req.body.description);
});

app.put('/dishes', (req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation is not supported by url dishes');
});

app.delete('/dishes', (req, res, next) => {
  res.end('Deleting all the dishes!');
});


// Routes with dishID
app.get('/dishes/:dishId', (req, res, next) => {
  res.end('Will send detail of dish ' + req.params.dishId + ' to you!')
});

app.post('/dishes/:dishId', (req, res, next) => {
  res.statusCode = 403;
  res.end('POST not supported on /dishes/' + req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('We will update the dish: ' + req.body.name + ' with details: ' +  req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
  res.end('Deleting the dish :' + req.params.dishId);
});
// Server serve all your static pages according to name
app.use(express.static(__dirname + '/public'))


// server serves default message
app.use((req, res, next) => {
  // console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an express server!</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {

  console.log(`Server is running at http://${hostname}:${port}`);
})
