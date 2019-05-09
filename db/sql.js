module.exports = {
  user: {
    add: 'insert into user (uname,upwd,role) values (?,?,?)',
    addTeacher: 'insert into user (uname,upwd,role) values (?,?,2)',
    check: 'select * from user where uname=?',
    delete: 'delete from user where uname=?',
    all: 'select * from user',
    update: 'update user set uname=? where uname=?',
    update2: 'update user set uname=?, upwd=?, role=? where uname=?'
  },
  stu: {
    add: 'insert into stu (sno,sname,cname,avatar,sex) values (?,?,?,?,?)',
    delete: 'delete from stu where sno=?',
    check: 'select * from stu where sno=?',
    all: 'select * from stu',
    update: 'update stu set sname=?, cname=?, sex=? where sno=?'
  },
  teacher: {
    add1: 'insert into teacher (tno,tname,sex,email,phone,address) values (?,?,?,?,?,?)',
    add: 'insert into teacher (tno,tname) values (?,?)',
    check: 'select * from teacher where tno=?',
    all: 'select * from teacher',
    update: 'update teacher set tname=?, sex=?, email=?, phone=?, address=? where tno=?'
  },
  class: {
    all: 'select * from class',
    add: 'insert into class (tno, cname) values(?, ?)',
    update: 'update class set tno=?, cname=? where cname=?',
    delete: 'delete from class where cname=?'
  },

}