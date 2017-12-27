/**
 * ==============================
 * @Author:   X.Teng
 * @Version:  1.0 
 * @DateTime: 2017-12-27 15:38:17
 * @Description: mysql数据连接池
 * ==============================
 */
var mysql = require('mysql');
module.exports = {
    mysql: {
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database: 'yjxx',
        //useConnectionPooling: true,
        port: 3306

    },
    connect: function() {
        return mysql.createPool(this.mysql);
    },
    executeSql: function(sql, param, callback, pool) {
        pool.getConnection(function(err, connection) {
            connection.query(sql, param, function(err, result) {
                callback(err, result);
                connection.release();
            });
        });
    }
};