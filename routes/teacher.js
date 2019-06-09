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
var submit = multer({dest: 'submit/'});//设置上传文件存储地址
router.post('/uploadFile', upload.single('file'), (req, res, next) => {
  let dir = req.query.tno
  console.log(req.query.tno)

    let ret = {};
    ret['code'] = 20000;
    let results = []
    var file = req.file;
    if (!fs.existsSync('./uploads/' + dir)) {
      fs.mkdir('./uploads/' +dir,function(err){
        if(err) {
          return console.error(err);
        }
      });
    }
    if (file) {
      var fileNameArr = file.originalname.split('.');
      var suffix = fileNameArr[fileNameArr.length - 1];
      //文件重命名
      fs.renameSync('./uploads/' +file.filename, `./uploads/${dir}/${file.originalname}`);
      file['filename'] = `${dir}/${file.originalname}`
      file['oldname'] = `${file.originalname}`;
      file['url'] = "filename=" + file['filename'] +"$oldname="+file['oldname']
      results.push(file)
    }
    db.json(res, { type: 1, msg: "上传成功", data: results })
})
router.post('/submitFile', submit.single('file'), (req, res, next) => {
  let dir = req.query.tno
  let filename = req.query.filename

  console.log(req.query.tno,filename)

    let ret = {};
    ret['code'] = 20000;
    let results = []
    var file = req.file;
    if (!fs.existsSync('./submit/' + dir)) {
      fs.mkdir('./submit/' +dir,function(err){
        if(err) {
          return console.error(err);
        }
      });
    }
    if (file) {
      var fileNameArr = file.originalname.split('.');
      var suffix = fileNameArr[fileNameArr.length - 1];
      //文件重命名
      fs.renameSync('./submit/' +file.filename, `./submit/${dir}/${filename}.${suffix}`);
      file['filename'] = `${dir}/${filename}.${suffix}`
      file['oldname'] = `${file.originalname}`;
      file['url'] = "filename=" + file['filename'] +"$oldname="+file['oldname']
      results.push(file)
    }
    db.json(res, { type: 1, msg: "上传成功", data: results })
})
router.post('/mkdir', (req, res, next) => {
  let paths = './submit/' +req.body.tno
  console.log(paths)
  if (!fs.existsSync('./submit/' +req.body.tno)) {
    fs.mkdir('./submit/' +req.body.tno,function(err){
      if(err) {
        return console.error(err);
      }else{
        db.json(res, { type: 1, msg: "目录创建成功。"})
      }
    });
  }else{
    db.json(res, { type: 0, msg: "目录已存在。"})
  }
})
router.use('/downloadFile', (req, res, next) => {
  var filename = req.query.filename;
  var oldname = filename.split('/').pop();
  var file = filename;
  res.writeHead(200, {
      'Content-Type': 'application/octet-stream',//告诉浏览器这是一个二进制文件
      'Content-Disposition': 'attachment; filename=' + encodeURI(oldname),//告诉浏览器这是一个需要下载的文件
  });//设置响应头
  console.log(file)
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
router.post('/allFile', function (req, res) {
  let results=[]
  let path = req.body.tno
  var filesList=this.filesList;
 
  var files = fs.readdirSync(path);//需要用到同步读取
  files.forEach(function(file) {
      var states = fs.statSync(path+'/'+file);
      if(states.isDirectory())
      {
        this.readFile(path+'/'+file,filesList);
      }
      else
      {
          //创建一个对象保存信息
          var obj = new Object();
          let sizeKb = states.size / 1024
          let sizeMb=0;
          let sizeGb=0;
          if(sizeKb >= 1024){
            sizeMb = sizeKb / 1024
            if(sizeMb >= 1024){
              sizeGb = sizeMb / 1024
            }
          }
          obj.size = sizeGb>0 ? sizeGb.toFixed(2) + 'Gb' :(sizeMb > 0 ? sizeMb.toFixed(2)  + 'Mb':sizeKb.toFixed(2)  + 'kb')  ;//文件大小，以字节为单位
          obj.time=format(new Date(states.mtime))
          obj.name = file;//文件名
          obj.path = path+'/'+file; //文件绝对路径
          results.push(obj);
      }
    })
    // console.log(results)
    db.json(res, { type: 1, msg: "查询成功", data: results })
})
function format(time) {
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let day = time.getDate();
  let hour = time.getHours();
  let minitues = time.getMinutes()
  if(hour < 10) {
    hour = '0' + hour
  }
  if(minitues < 10) {
    minitues = '0' + minitues
  }
  if(month < 10) {
    month = '0' + month
  }
  if(day < 10) {
    day = '0' + day
  }
  return year + '-' + month + '-' + day  + ' ' + hour + ':' + minitues
}
router.post('/allDir', function (req, res) {
  let results=[];
  let path = './submit/'+req.body.tno
 
  fs.readdir(path,function(err, files){
    if (err) {
      return console.error(err);
    }
    for(let i=0; i<files.length; i++) {
      let obj = {}
      let stat = fs.statSync(path+'/'+files[i])
      obj.name = files[i];
      obj.time = format(new Date(stat.mtime))
      results.push(obj)
    }
    console.log(files,results)
    db.json(res, { type: 1, msg: "查询成功", data: results })
  })
});
router.post('/delFile', function (req, res) {
  let results=[]
  let path = req.body.url
  fs.unlink(path, function(err) {
    if (err) {
      return console.error(err);
    }
    db.json(res, { type: 1, msg: "删除成功", data: results })
  });
})
router.post('/delDir', function (req, res) {
  let results=[]
  let path = req.body.url
  delDir(path)
  db.json(res, { type: 1, msg: "删除成功", data: results })
})
router.post('/clearDir', function (req, res) {
  let results=[]
  let path = req.body.url
  clearDir(path)
  db.json(res, { type: 1, msg: "删除成功", data: results })
})
function clearDir(path){
  let files = [];
  if(fs.existsSync(path)){
      files = fs.readdirSync(path);
      files.forEach((file, index) => {
          let curPath = path + "/" + file;
          if(fs.statSync(curPath).isDirectory()){
              delDir(curPath); //递归删除文件夹
          } else {
              fs.unlinkSync(curPath); //删除文件
          }
      });
      // fs.rmdirSync(path);
  }
}
function delDir(path){
  let files = [];
  if(fs.existsSync(path)){
      files = fs.readdirSync(path);
      files.forEach((file, index) => {
          let curPath = path + "/" + file;
          if(fs.statSync(curPath).isDirectory()){
              delDir(curPath); //递归删除文件夹
          } else {
              fs.unlinkSync(curPath); //删除文件
          }
      });
      fs.rmdirSync(path);
  }
}
router.post('/ka_jl', function (req, res) {
  db.query(sql.stu_kq.kq_jl, [req.body.tno]).then(function ([err, results]) {
    if (err) {
        db.json(res, { type: 0, msg: "查询考勤失败" })
    }
    else {
        db.json(res, { type: 1, msg: "查询考勤列表成功", data: results })
    }
  }).catch(function (err) {
      throw err
  })
})
router.post('/discuss', function (req, res) {
  db.query(sql.stu_experiment_discuss.add, [req.body.uid,req.body.content,req.body.name,req.body.role]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "添加失败" })
    }
    else {
        db.json(res, { type: 1, msg: "添加成功", data: results })
    }
  }).catch(function (err) {
      throw err
  })
})
router.post('/addSys', function (req, res) {
  db.query(sql.experiment_submit_time.add, [req.body.tno,req.body.name,req.body.cname,req.body.last_date]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "已存在，添加失败" })
    }
    else {
        db.json(res, { type: 1, msg: "添加成功", data: results })
    }
  }).catch(function (err) {
      throw err
  })
})
router.post('/updateSys', function (req, res) {
  db.query(sql.experiment_submit_time.update, [req.body.last_date,req.body.name,req.body.cname]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "更新失败" })
    }
    else {
        db.json(res, { type: 1, msg: "更新成功", data: results })
    }
  }).catch(function (err) {
      throw err
  })
})
router.post('/deleteSys', function (req, res) {
  db.query(sql.experiment_submit_time.delete, [req.body.name,req.body.cname]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "删除失败" })
    }
    else {
        db.json(res, { type: 1, msg: "删除成功", data: results })
    }
  }).catch(function (err) {
      throw err
  })
})
router.post('/total_kqt', function (req, res) {
  
  db.query(sql.kq_final_update, [req.body.tno]).then(function ([err, results]) {
    if (err) {
      console.log(err)
      db.json(res, { type: 0, msg: "查询考勤失败1" })
    }
    else {
      db.query(sql.stu_experiment_kq.kq_sj, [req.body.tno]).then(function ([err, results]) {
        if (err) {
          db.json(res, { type: 0, msg: "查询考勤失败" })
        }
        else {
          db.json(res, { type: 1, msg: "查询考勤列表成功", data: results })
        }
      })
        
    }
  }).catch(function (err) {
      throw err
  })
})
router.post('/total_kq', function (req, res) {
  db.query(sql.stu_experiment_kq.kq_sj, [req.body.tno]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "查询考勤失败" })
    }
    else {
      db.json(res, { type: 1, msg: "查询考勤列表成功", data: results })
    }
  })
})
router.post('/one_exp', function (req, res) {
  db.query(sql.stu_sumbit_file.all, [req.body.name]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "查询实验提交记录失败" })
    }
    else {
      db.json(res, { type: 1, msg: "查询实验提交记录成功", data: results })
    }
  })
})

router.post('/ka_jl_query', function (req, res) {
  db.query(sql.stu_kq.kq_jl_query, [req.body.tno, req.body.cname, req.body.date]).then(function ([err, results]) {
    if (err) {
        db.json(res, { type: 0, msg: "查询考勤失败" })
    }
    else {
        db.json(res, { type: 1, msg: "查询考勤列表成功", data: results })
    }
  }).catch(function (err) {
      throw err
  })
})
router.post('/kq_sj', function (req, res) {
  db.query(sql.stu_kq.kq_sj, [req.body.tno,req.body.stime,req.body.etime]).then(function ([err, results]) {
    if (err) {
        db.json(res, { type: 0, msg: "查询考勤失败" })
    }
    else {
        db.json(res, { type: 1, msg: "查询考勤列表成功", data: results })
    }
  }).catch(function (err) {
      throw err
  })
})
router.post('/sj_kq', function (req, res) {
  var params = req.body

  db.query(sql.kq, [params.tno]).then(function ([err, results]) {
    if (err) {
      console.log(err)
      db.json(res, { type: 0, msg: "更新签到出错!" })
    }
    else {
      db.json(res, { type: 1, msg: "更新成功", data: results[0] })

    }
  }).catch(function (err) {
    throw err
  })
})
router.post('/add_exp', function (req, res) {
  var params = req.body

  
  db.query(sql.teacher_experiment.check, [params.tno, params.name]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "查询失败!" })
    }
    else {
      if(results[0].num === 0){
        db.query(sql.teacher_experiment.add, [params.tno, params.name, params.index]).then(function ([err, results]) {
          if(err){
            db.json(res, { type: 0, msg: "添加失败!" })
          }
          else{
            db.json(res, { type: 1, msg: "添加成功", data: results })
          }
        }).catch(function(err) {
          console.log(err)
        })
      }else{
        db.json(res, { type: 1, msg: "添加成功", data: results })
      }
    }
  }).catch(function (err) {
    throw err
  })
})
router.post('/exp_one', function (req, res) {
  var params = req.body

  db.query(sql.teacher_experiment.one, [params.tno]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "查询出错!" })
    }
    else {
      db.json(res, { type: 1, msg: "查询成功", data: results})

    }
  }).catch(function (err) {
    throw err
  })
})
router.post('/exp_del', function (req, res) {
  var params = req.body

  db.query(sql.teacher_experiment.delete, [params.tno, params.name]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "删除出错!" })
    }
    else {
      db.json(res, { type: 1, msg: "删除成功", data: results})

    }
  }).catch(function (err) {
    throw err
  })
})

router.post('/qq_sno', function (req, res) {
  var params = req.body

  db.query(sql.stu_kq.qq_sno, [params.cname, params.stime,params.etime]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "查询出错!" })
    }
    else {
      db.json(res, { type: 1, msg: "查询成功", data: results})

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
router.post('/search2', function (req, res) {
  var params = req.body

  db.query(sql.courseTable.search2, [params.tno]).then(function ([err, results]) {
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
      db.json(res, { type: 0, msg: "更新失败!" })
    }
    else {
      db.json(res, { type: 1, msg: "更新课表成功", data: results })
    }
  }).catch(function (err) {
    throw err
  })
})

router.post('/update_kq_system', function (req, res) {
  var params = req.body

  db.query(sql.kq_system.update, [params.late_score, params.early_score, params.late_early_score, params.absence_score, params.tno]).then(function ([err, results]) {
    if (err) {
      db.json(res, { type: 0, msg: "更新失败!" })
    }
    else {
      db.json(res, { type: 1, msg: "更新成功", data: results })
    }
  }).catch(function (err) {
    throw err
  })
})
router.post('/query_kq_system', function (req, res) {
  var params = req.body

  db.query(sql.kq_system.query, [params.tno]).then(function ([err, results]) {
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
router.post('/total_score', function (req, res) {
  var params = req.body
  db.query(sql.final_score, [req.body.tno]).then(function ([err, results]) {
    if (err) {
        db.json(res, { type: 0, msg: "查询考勤失败" })
    }
    else {
      db.query(sql.total_score, [req.body.tno]).then(function ([err, results]) {
        if (err) {
          db.json(res, { type: 0, msg: "查询失败" })
        }
        else {
          db.json(res, { type: 1, msg: "查询成功", data: results })
        }
      })
        
    }
  }).catch(function (err) {
      throw err
  })
})
  router.post('/discussStu', function (req, res) {
    var params = req.body
    db.query(sql.stu_experiment_discuss.all1, [params.tno, params.name]).then(function ([err, results]) {
      if (err) {
          db.json(res, { type: 0, msg: "查询失败" })
      }
      else {
        db.json(res, { type: 1, msg: "查询成功", data: results })   
      }
    }).catch(function (err) {
        throw err
    })
  })
  router.post('/discussTeacher', function (req, res) {
    var params = req.body
    db.query(sql.stu_experiment_discuss.all2, [params.tno, params.name]).then(function ([err, results]) {
      if (err) {
          db.json(res, { type: 0, msg: "查询失败" })
      }
      else {
        db.json(res, { type: 1, msg: "查询成功", data: results })   
      }
    }).catch(function (err) {
        throw err
    })
  })
  // db.query(sql.total_score, [params.tno]).then(function ([err, results]) {
  //   if (err) {
  //     db.json(res, { type: 0, msg: "查询失败!" })
  //   }
  //   else {
  //     db.json(res, { type: 1, msg: "查询成功", data: results })
  //   }
  // }).catch(function (err) {
  //   throw err
  // })

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

router.post('/allScore',function(req,res,next) {
  db.query(sql.allScore.search2, [req.body.tno]).then(function([err,results]){
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
router.post('/scoreOne',function(req,res,next) {
  db.query(sql.allScore.search1, [req.body.sno]).then(function([err,results]){
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
  db.query(req.body.str, [req.body.tno]).then(function([err,results]){
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
router.post('/score',function(req,res,next) {
  db.query(req.body.str, [req.body.tno]).then(function([err,results]){
    if(err) {
      db.json(res,{type: 0, msg: "操作失败"})
    }
    else {
      db.json(res,{type: 1, msg: "操作成功", data: results})
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