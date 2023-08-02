const PATH = require('path');
const MONGOOSE = require("mongoose");
const MONGOCONFIG = require(PATH.join(__dirname, '..', 'config', 'config.json'))['mongoDB'];
const ENV_CHK_INT = require(PATH.join(__dirname, '..', 'config', 'config.json'))['checkEnvInt'];

var uri = "mongodb://" + MONGOCONFIG.host + ":" + MONGOCONFIG.port + "/" + MONGOCONFIG.dbName;

global.mongoDB = MONGOOSE.connection;
mongoDB.on('connecting', function() {
  console.log('connecting to Common MongoDB...');
});

mongoDB.on('error', function(error) {
  MONGOOSE.disconnect();
});

mongoDB.on('connected', function() {
  console.log('Connected to MongoDB');
});

mongoDB.once('open', function() {
  console.log('MongoDB connection opened!');
});

mongoDB.on('reconnected', function() {
  console.log('MongoDB reconnected!');
});

mongoDB.on('disconnected', function() {
  console.log('MongoDB disconnected! ');
  SLEEP.sleep(ENV_CHK_INT);
  MONGOOSE.connect(uri, MONGOCONFIG.connectionOpt);
});

MONGOOSE.connect(uri, MONGOCONFIG.connectionOpt);
