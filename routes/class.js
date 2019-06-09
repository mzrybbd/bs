var express = require('express');
var router = express.Router();
var db = require('../db/config');
var sql = require("../db/sql");

router.post('/one', function (req, res) {
  var params = req.body

  db.query(sql.class.one, [params.tno]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "查询失败!" })
    }
    else {
      db.json(res, { type: 1, msg: "查询成功", data: results })
    }
 }).catch(function (err) {
    throw err
  })
})
router.post('/all', function (req, res) {

  db.query(sql.class.all, []).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "查询失败!" })
    }
    else {
      db.json(res, { type: 1, msg: "查询成功", data: results })
    }
 }).catch(function (err) {
    throw err
  })
})
module.exports = router;