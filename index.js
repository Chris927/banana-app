var express = require('express'),
    morgan = require('morgan'),
    onFinished = require('on-finished'),
    metrics = require('metrics');

var app = express();

app.use(morgan('tiny')); // logs every request, including response time

var timer = new metrics.Timer();
var metricsServer = new metrics.Server(process.env.METRICS_PORT || 3001);
metricsServer.addMetric('bananas', timer);

var count = 0;
app.use(function(req, res, next) {
  var start = Date.now();
  onFinished(req, function(err) {
    timer.update(Date.now() - start);
    count++;
    if ((count % 100) == 0) console.log('count', count);
  });
  next();
});

app.post('/buy-bananas', function(req, res) {
  maybeSellBananasWhichTakesSomeTimeAndSometimesFails(req, res);
});


// Below the ugly details of the implementation
//
app.use(function(err, req, res, next) { // error handling
  console.error(err.stack);
  res.status(500).send('Oops! An error occurred, deal with it!');
});

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('server listening on port %d', server.address().port);
});

function maybeSellBananasWhichTakesSomeTimeAndSometimesFails(req, res) {
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
}
