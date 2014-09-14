var express = require('express'),
    morgan = require('morgan');

var app = express();

app.use(morgan('tiny'));

app.post('/buy-bananas', function(req, res) {
  res.send('Okay, here are some bananas');
});

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('server listening on port %d', server.address().port);
});
