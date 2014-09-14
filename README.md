# Banana App

Demonstrational HTTP server, to show what information logging does (not)
provide for operational monitoring.

## How to Run?

Ensure you have [NodeJS](http://nodejs.org/download/) version 0.10.24 or newer
installed. `npm` (Node Package Manager) should be available as a binary in your
path as well.

Then:

```
npm install
node index.js
```

This will start an http server on port 3000.

## What Does it To?

It will start an http server on port 3000 (configurable via PORT environment
variable) which will handle POST requests to `/buy-bananas`. In order to
simulate a "real" enterprise server, it will take a random amount of time to
respond (see the code for details), and it will even fail randomly from time to
time.
