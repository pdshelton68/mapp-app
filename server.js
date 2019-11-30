const express = require('express');
const app = express();
// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}
// Instruct the app
// to use the forceSSL
// middleware
console.log("dir name " + __dirname);
app.use(forceSSL());

app.use(express.static(__dirname + '/dist/map-app'));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/map-app/index.html'));
  });

app.listen(process.env.PORT || 8080);

