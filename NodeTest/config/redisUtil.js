/**
 * ==============================
 * @Author: X.Teng
 * @Version: 1.0 
 * @DateTime: 2017-12-28 10:30:56
 * @Description: redis连接工具类
 * https://github.com/NodeRedis/node_redis#rediscreateclient
 * ==============================
 */
var redis = require('redis');
module.exports = {
    redis: [
		    {port:'6379'},
		    {host:'127.0.0.1'}
		   ],
    connect: function() {
        return redis.createClient(this.redis);
    },
    executeGet: function(key, callback,client) {
        client.get(key, function (err, reply) {
	    callback(err, reply); 
		});
    },
    executeSet: function(key, value,client){
		client.set(key, value);
    }
};