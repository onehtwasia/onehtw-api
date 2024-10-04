// No longer in use - moved to SQL

const EventEmitter = require('events');
const service = new EventEmitter();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_CONNECTION;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  db = client.db('lentapp');
  console.log('Connected');
  service.emit('connected');
});

service.collection = function(name){
  return db.collection(name);
}

module.exports = service;
