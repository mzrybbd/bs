var express = require('express');
var router = express.Router();
var db = require('../db/config');
var sql = require("../db/sql");

router.post('/all', function (req, res) {
  db.query(sql.stu.all, []).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "查询学生列表失败" })
    }
    else {
      db.json(res, { type: 1, msg: "查询学生列表成功", data: results })
    }
  }).catch(function (err) {
    throw err
  })
})
router.post('/one', function (req, res) {
  db.query(sql.stu.one, [req.body.sno]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "查询学生列表失败" })
    }
    else {
      db.json(res, { type: 1, msg: "查询学生列表成功", data: results })
    }
  }).catch(function (err) {
    throw err
  })
})

router.post('/update', function (req, res) {
  var params = req.body

  db.query(sql.user.update, [params.newUid, params.oldUid]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "更新用户失败!" })
    }
    else {
      db.query(sql.stu.update, [params.sname, params.cname,params.sex, params.newUid]).then(function([err, result]) {
        if (err) {
          db.json(res, { type: 0, msg: "更新学生失败" })
        }else {
          db.json(res, { type: 1, msg: "更新用户成功", data: results })
        }
      })
    }
  }).catch(function (err) {
    throw err
  })
})

router.post('/earlyTime', function (req, res) {
  var params = req.body

  db.query(sql.courseTable.early, [params.cname, params.cdate]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "课表不存在" })
    }
    else {
      db.json(res, { type: 1, msg: "查询课表成功", data: results[0] })
    }
  }).catch(function (err) {
    throw err
  })
})
router.post('/checkIsQd', function (req, res) {
  var params = req.body

  db.query(sql.courseTable.check, [params.cname, params.cdate]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "课表不存在" })
    }
    else {
      db.json(res, { type: 1, msg: "查询课表成功", data: results[0] })
    }
  }).catch(function (err) {
    throw err
  })
})

router.post('/qiandao', function (req, res) {
  var params = req.body

  db.query(sql.stu_kq.insert, [params.sno, params.date, params.stime,  params.etime, params.stype, params.etype]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "签到出错!" })
    }
    else {
      db.json(res, { type: 1, msg: "添加成功", data: results })
    }
  }).catch(function (err) {
    throw err
  })
})
router.post('/updateQd', function (req, res) {
  var params = req.body

  db.query(sql.stu_kq.update, [params.etime, params.etype, params.sno]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "更新签到出错!" })
    }
    else {
      db.json(res, { type: 1, msg: "更新成功", data: results[0] })
    }
  }).catch(function (err) {
    throw err
  })
})
router.post('/updateQd2', function (req, res) {
  var params = req.body

  db.query(sql.stu_kq.updateId, [params.etime, params.etype, params.id]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "更新签到出错!" })
    }
    else {
      db.json(res, { type: 1, msg: "更新成功", data: results[0] })
    }
  }).catch(function (err) {
    throw err
  })
})
router.post('/check', function (req, res) {
  var params = req.body

  db.query(sql.stu_kq.check, [params.sno]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "查询失败" })
    }
    else {
      if (results.length == 0) {
        db.json(res, { type: 1, msg: "课表不存在", data: { wish: false } })
      }else{
        db.json(res, { type: 1, msg: "课表存在", data: { wish: true, id: results[0].id, data: results[0] } })
      }
    }
  }).catch(function (err) {
    throw err
  })
})

router.post('/file_upload', function (req, res) {
  console.log(req.files[0]);  // 上传的文件信息

  var des_file = __dirname + "/" + req.files[0].originalname;
  fs.readFile( req.files[0].path, function (err, data) {
       fs.writeFile(des_file, data, function (err) {
        if( err ){
             console.log( err );
        }else{
              response = {
                  message:'File uploaded successfully', 
                  filename:req.files[0].originalname
             };
         }
         console.log( response );
         res.end( JSON.stringify( response ) );
      });
  });

})

module.exports = router