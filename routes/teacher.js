var express = require('express');
var router = express.Router();
var db = require('../db/config');
var sql = require("../db/sql");

router.post('/all', function (req, res) {
    db.query(sql.teacher.all, []).then(function ([err, results]) {
        if (err) {
            db.json(res, { type: 0, msg: "查询教师列表失败" })
        }
        else {
            db.json(res, { type: 1, msg: "查询教师列表成功", data: results })
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
      db.query(sql.teacher.update, [params.tname, params.sex, params.email, params.phone, params.address, params.newUid]).then(function([err, result]) {
        if (err) {
          db.json(res, { type: 0, msg: "更新教师失败" })
        }else {
          db.json(res, { type: 1, msg: "更新用户成功", data: results })
        }
      })
    }
  }).catch(function (err) {
    throw err
  })
})
router.post('/updateClass', function (req, res) {
  var params = req.body

  db.query(sql.class.update, [params.tno, params.newCname, params.oldCname]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "更新班级失败!" })
    }
    else {
      db.json(res, { type: 1, msg: "更新班级成功", data: results })
    }
  }).catch(function (err) {
    throw err
  })
})
router.post('/addClass', function (req, res) {
  var params = req.body

  db.query(sql.class.add, [params.tno, params.cname]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "班级已存在!" })
    }
    else {
      db.json(res, { type: 1, msg: "添加班级成功", data: results })
    }
    throw err
  })
})

router.post('/all',function(req,res,next) {
  db.query(sql.teacher.all).then(function([err,results]){
    if(err) {
      db.json(res,{type: 0, msg: "查询失败"})
    }
    else {
      db.json(res,{type: 1, msg: "查询成功", data: results})
    }
  }).catch(function(err) {
    throw err
  })
})

router.post('/deleteClass',function(req,res,next) {
  db.query(sql.class.delete, [req.body.cname]).then(function([err,results]){
    if(err) {
      db.json(res, {type: 0, msg: "删除失败"})
    }
    else {
      db.json(res, {type: 1, msg: "删除成功", data: results})
    }
  }).catch(function(err) {
    throw err
  })
})

module.exports = router