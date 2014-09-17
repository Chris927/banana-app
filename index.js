var express = require('express'),
    morgan = require('morgan');

var app = express();
app.use(morgan('tiny')); // logs every request, including response time

app.post('/buy-bananas', function(req, res) {

  console.log('hey, got yet another request. Let\'s respond...');

  var responseTimeInMillis = Math.random() * 200.0; // 100ms in the average
  if (Math.random() < 0.1) { // with a 10% chance 10 times slower (nobody knows why)
    responseTimeInMillis *= 10.0;
  }
  if (Math.random() < 0.05) { // sometimes there are random failures
    throw new Error('some random failure');
  }
  setTimeout(function() {
    res.send('Okay, here are some bananas, after ' + responseTimeInMillis.toFixed(2) + 'ms delay');
  }, responseTimeInMillis);
});

app.use(function(err, req, res, next) { // error handling
  console.error(err.stack);
  res.status(500).send('Oops! An error occurred, deal with it!');
});

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('server listening on port %d', server.address().port);
});
