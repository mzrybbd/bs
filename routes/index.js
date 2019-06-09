var express = require('express');
var router = express.Router();
var db = require('../db/config');
var sql = require("../db/sql");
const random = require('../public/javascripts/random');
const crypto = require('crypto')
const Base64 = require('../public/javascripts/base64')
//注册
router.post('/register', function (req, res) {
  var params = req.body

  db.query(sql.user.add, [params.uid, params.pwd, params.role]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "用户已存在" })
    }
    else if(params.role == '管理员') {
      db.json(res, { type: 1, msg: "注册成功", data: { id: results.insertId } })
    }
    else if(params.role == '学生'){
	  	db.query(sql.stu.add, [params.uid, params.uname, params.cname, params.avatar, params.sex]).then(function ([err, results]) {
	      if (err) {
	      	db.query(sql.user.delete, [params.uid])
	        db.json(res, { type: 0, msg: "注册失败" })
	      }
	      else {
          db.query(sql.stu_score_table.add2, [params.uid])
          db.query(sql.stu_experiment_score.add, [params.uid])
          db.query(sql.stu_experiment_kq.add, [params.uid])
	      	db.json(res, { type: 1, msg: "注册成功", data: { id: results.insertId } })
	      }
	    })
	  }
    else {
	    db.query(sql.teacher.add1, [ params.uid, params.uname, params.sex, params.email, params.phone, params.address ]).then(function([err, results]) {
	    	if (err) {
	    		db.query(sql.user.delete, [params.uid])
	        db.json(res, { type: 0, msg: "注册失败" })
	    	}
	    	else {
          db.query(sql.kq_system.add, [params.uid])
	    		db.json(res, { type: 1, msg: "注册成功", data: { id: results.insertId } })
	    	}
	    })
    }
  }).catch(function (err) {
    throw err
  }) 
})
router.post('/manyAdd', function(req,res) {
  var params = req.body

  db.query(sql.user.check, [params.uid]).then(function([err, results]){
    if(err) {
      db.json(res, { type: 0, msg: '查询失败'})
    }else{
      if(results.length === 0) {
        db.query(sql.user.add, [params.uid, params.pwd, params.role]).then(function ([err, results]) {
          if(err) {
            db.json(res, { type: 0, msg: '添加失败'})
          }else{
            db.query(sql.stu.add2, [params.uid, params.uname,params.cname]).then(function ([err, results]) {
              if (err) {
                db.query(sql.user.delete, [params.uid])
                db.json(res, { type: 0, msg: "添加失败" })
              }
              else {
                db.query(sql.stu_score_table.add2, [params.uid])
                db.query(sql.stu_experiment_score.add, [params.uid])
                db.query(sql.stu_experiment_kq.add, [params.uid])
                db.json(res, { type: 1, msg: "添加成功", data: { id: results.insertId } })
              }
            })
          }
        })
      }else{
        db.json(res, { type: 1, msg: "添加成功", data: results })
      }
    }
  })
})
//登录
router.post('/login', function (req, res) {
  var params = req.body

  db.query(sql.user.check, [params.uid]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "查询失败" })
    }else{
      if (results.length === 0) {
        db.json(res, { type: 0, msg: "用户名不存在" })
      }
      else 
        db.json(res, { type: 1, msg: "查询用户成功", data: results[0] })
    }
   
  }).catch(function (err) {
    throw err
  })
})
router.post('/check', function (req, res) {
  var params = req.body

  db.query(sql.user.check, [params.uname]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "查询失败" })
    }
    else{
      if (results.length === 0) {
        db.json(res, { type: 0, msg: "用户名不存在" })
      }
      else 
        db.json(res, { type: 1, msg: "查询用户成功", data: results[0] })
    }
  }).catch(function (err) {
    throw err
  })
})

router.post('/class',function(req,res,next) {
  db.query(sql.class.all).then(function([err,results]){
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
router.post('/delete',function(req,res,next) {
  db.query(sql.user.delete, [req.body.uname]).then(function([err,results]){
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
router.post('/all', function (req, res) {
  db.query(sql.user.all, []).then(function ([err, results]) {
    if (err) {
        db.json(res, { type: 0, msg: "查询用户列表失败" })
    }
    else {
        db.json(res, { type: 1, msg: "查询用户列表成功", data: results })
    }
  }).catch(function (err) {
    throw err
  })
})

router.post('/update', function (req, res) {
  var params = req.body

  db.query(sql.user.update2, [params.newUid, params.upwd, params.role, params.oldUid]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "更新用户失败!" })
    }
    else {
      db.json(res, { type: 1, msg: "更新用户成功", data: results })
    }
 }).catch(function (err) {
    throw err
  })
})

module.exports = router;
