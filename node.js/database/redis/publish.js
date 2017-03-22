var redis = require('redis');
var pub = redis.createClient();

pub.publish("apple","hello");
