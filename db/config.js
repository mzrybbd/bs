var mysql = require('mysql')

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bs',
    timezone: '08:00'
})
exports.query = function (sql,params) {
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,connection) {
            if(err) {
                return reject(err)
            }else {
                connection.query(sql,params,function(err,results) {
                    connection.release()
                    resolve([err,results])
                })
            }
        })
    })
}
exports.json = function (res,result) {
    if(result.type == 0) {
        res.json({status: "error", msg: result.msg})
    }else {
        res.json({status: "success", msg: result.msg, data: result.data})
    }
}