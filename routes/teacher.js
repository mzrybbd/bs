var express = require('express');
var router = express.Router();
var db = require('../db/config');
var sql = require("../db/sql");
var multer  = require('multer');
const fs = require('fs');
const path = require('path');
// const upload = multer({ dest: path.join(__dirname, '../public/upload/') });

// var multer = require('multer');//引入multer
var upload = multer({dest: 'uploads/'});//设置上传文件存储地址
router.post('/uploadFile', upload.single('file'), (req, res, next) => {
 
    let ret = {};
    ret['code'] = 20000;
    var file = req.file;
    if (file) {
        var fileNameArr = file.originalname.split('.');
        var suffix = fileNameArr[fileNameArr.length - 1];
        //文件重命名
        fs.renameSync('./uploads/' + file.filename, `./uploads/${file.filename}.${suffix}`);
        file['newfilename'] = `${file.filename}.${suffix}`;
    }
    ret['file'] = file;
    res.send(ret);
})
router.use('/downloadFile', (req, res, next) => {
  var filename = req.query.filename;
  var oldname = req.query.oldname;
  var file = './uploads/' + filename;
  res.writeHead(200, {
      'Content-Type': 'application/octet-stream',//告诉浏览器这是一个二进制文件
      'Content-Disposition': 'attachment; filename=' + encodeURI(oldname),//告诉浏览器这是一个需要下载的文件
  });//设置响应头
  var readStream = fs.createReadStream(file);//得到文件输入流
  debugger
  readStream.on('data', (chunk) => {
      res.write(chunk, 'binary');//文档内容以二进制的格式写到response的输出流
  });
  readStream.on('end', () => {
      res.end();
  })
})

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
router.post('/updateC', function (req, res) {
  var params = req.body

  db.query(sql.class.updateClass, [params.newCname, params.oldCname]).then(function ([err, results]) {
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
router.post('/updatePwd', function (req, res) {
  var params = req.body

  db.query(sql.user.updatePwd, [params.pwd, params.tno]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "更新密码失败!" })
    }
    else {
      db.json(res, { type: 1, msg: "更新密码成功", data: results })
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
  }).catch(function (err) {
    throw err
  })
})

router.post('/addCourse', function (req, res) {
  var params = req.body

  db.query(sql.courseTable.add, [params.tno, params.cname, params.cdate,  params.cweek, params.stime, params.etime, params.address]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "课表已存在!" })
    }
    else {
      db.json(res, { type: 1, msg: "添加课表成功", data: results })
    }
  }).catch(function (err) {
    throw err
  })
})
router.post('/search', function (req, res) {
  var params = req.body

  db.query(sql.courseTable.search, [params.tno]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "课表不存在!" })
    }
    else {
      db.json(res, { type: 1, msg: "查询课表成功", data: results })
    }
  }).catch(function (err) {
    throw err
  })
})

router.post('/updateCt', function (req, res) {
  var params = req.body

  db.query(sql.courseTable.update, [params.cname, params.cdate, params.stime, params.etime, params.address, params.cweek, params.id]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "课表不存在!" })
    }
    else {
      db.json(res, { type: 1, msg: "更新课表成功", data: results })
    }
  }).catch(function (err) {
    throw err
  })
})
router.post('/deleteCt', function (req, res) {
  var params = req.body

  db.query(sql.courseTable.delete, [params.id]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "课表不存在!" })
    }
    else {
      db.json(res, { type: 1, msg: "课表删除成功", data: results })
    }
  }).catch(function (err) {
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

router.post('/one',function(req,res,next) {
  db.query(sql.teacher.check, [req.body.tno]).then(function([err,results]){
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

router.post('/stu',function(req,res,next) {
  db.query(sql.stu.search, [req.body.tno]).then(function([err,results]){
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
      db.query(sql.courseTable.deleteCT, [req.body.cname]).then(function([err, results]){
        if(err) {
          db.json(res, {type:0, msg: '删除失败'})
        }else{
          db.json(res, {type: 1, msg: "删除成功", data: results})
        }
      })
    }
  }).catch(function(err) {
    throw err
  })
})

router.post('/upload', upload.single('upload_file'), function(req, res) {
  var temp_path = req.file.path;
  var ext = '.' + req.file.originalname.split('.')[1];
  var target_path = req.file.path + ext;
  var _filename = req.file.filename + ext;
  var filePath = '/upload/' + _filename;
  console.log("Uploading: " + _filename);
});

module.exports = router