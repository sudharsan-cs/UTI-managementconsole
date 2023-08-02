const PATH = require('path');
const FS = require('fs');
const router = require('./routes');
require('./routes');
const APPCONFIG = require(PATH.join(__dirname, 'config', 'config.json'));
startServer();
function startServer() {
  const PRIVATEKEY = FS.readFileSync(PATH.join(__dirname, "ssl", "domain.key"));
  const CERTIFICATE = FS.readFileSync(PATH.join(__dirname, "ssl", "domain.crt"));
  const OPTIONS = {
    key: PRIVATEKEY,
    cert: CERTIFICATE
  };
  const EXPRESS = require('express');
  const BODYPARSER = require('body-parser');
  const COOKIEPARSER = require('cookie-parser');

  var app = EXPRESS();
  app.use(function(req, res, next) {
    res.header('X-XSS-Protection', '1;mode=block');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('X-Frame-Options', 'SAMEORIGIN');
    res.removeHeader("server");
    res.removeHeader("X-Powered-By");
    res.removeHeader("Date");
    res.header('Cache-Control','no-cache, no-store, max-age=0, must-revalidate');
    res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
   // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    next();
  });
  app.use(BODYPARSER.json({
    limit: '1mb'
  }));
  app.use(BODYPARSER.urlencoded({
    limit: '1mb',
    extended: true
  }));
  app.use('/ms',router);

  app.use(EXPRESS.static(PATH.join(__dirname, 'public')));
  app.all("/attribute", function(req, res, next) {
    res.sendFile(PATH.join(__dirname, 'public', 'attribute.html'));
  });
  app.all("/*", function(req, res, next) {
    res.sendFile(PATH.join(__dirname, 'public', 'index.html'));
  });

  
  var server = require('https').createServer(OPTIONS, app);
  server.on('error', function(err) {
    console.log(err.message);
  });
  server.listen(APPCONFIG.server.port, APPCONFIG.server.ipaddress, () => {
    console.log("\n\n UTI Server - " + APPCONFIG.server.ipaddress + ", has been started and it is listening to the port - " + APPCONFIG.server.port + "\n\n");
  });
  server.timeout = (APPCONFIG.server.timeout) ? APPCONFIG.server.timeout : 300000;
}



