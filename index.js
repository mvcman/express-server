const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const hostname ='localhost';
const port = 3000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes with dishID


app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
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
