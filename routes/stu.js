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
      db.json(res, { type: 0, msg: "课表不存在!" })
    }
    else {
      db.json(res, { type: 1, msg: "查询课表成功", data: results[0] })
    }
  }).catch(function (err) {
    throw err
  })
})
module.exports = router