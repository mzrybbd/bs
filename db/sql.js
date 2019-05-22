module.exports = {
  user: {
    add: 'insert into user (uname,upwd,role) values (?,?,?)',
    addTeacher: 'insert into user (uname,upwd,role) values (?,?,2)',
    check: 'select * from user where uname=?',
    delete: 'delete from user where uname=?',
    all: 'select * from user',
    update: 'update user set uname=? where uname=?',
    update2: 'update user set uname=?, upwd=?, role=? where uname=?',
    updatePwd: 'update user set upwd=? where uname=?'
  },
  stu: {
    add: 'insert into stu (sno,sname,cname,avatar,sex) values (?,?,?,?,?)',
    search: 'select * from stu where cname in (select cname from class where tno=?)',
    delete: 'delete from stu where sno=?',
    check: 'select * from stu where sno=?',
    all: 'select * from stu',
    update: 'update stu set sname=?, cname=?, sex=? where sno=?',
    one: 'select * from stu where sno=?',
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
    updateClass: 'update class set cname=? where cname=?',
    delete: 'delete from class where cname=?',
    one: 'select * from class where tno=?',
  },
  courseTable: {
    add: 'insert into coursetable (tno, cname, cdate, cweek, stime, etime, address) values(?,?,?,?,?,?,?)',
    search: 'select * from coursetable where tno=? order by cdate, stime',
    select: 'select * from coursetable where cname=? order by cdate, stime',
    deleteCT: 'delete from coursetable where cname=?',
    delete: 'delete from coursetable where id=?',
    update: 'update coursetable set cname=?, cdate=?, stime=?, etime=?, address=?, cweek=? where id=?',
    // early: 'select * from coursetable where cname=? and cdate=? order by abs(stime-curtime())',
    early: 'select * from coursetable where cname=? and cdate=? order by stime',
    check: 'select * from coursetable where cname=? and cdate=? and (stime-curtime()) between -10000 and 500'
  },
  stu_kq: {
    insert:　'insert into stu_kq(sno, date, stime, etime, stype, etype, kweek) values(?,?,?,?,?,?,?)',
    update:  'update stu_kq set etime=?, etype=? where sno=? and date=curdate() and stime >= date_sub(curtime() , interval 2 hour)',
    updateId: 'update stu_kq set etime=?, etype=? where id=?',
    check: 'select * from stu_kq where sno=? and date=curdate() and stime >= date_sub(curtime() , interval 2 hour) and stime < curtime()',
    kq_jl: 'select a.sno, b.sname, b.cname, a.date, a.stime, a.etime, a.stype, a.kweek, a.etype from stu_kq as a join (select * from stu where cname in (select cname from class where tno=?)) as b where a.sno=b.sno',
    kq_one: 'select a.sno, b.sname, a.date, a.stime, a.etime, a.stype, a.kweek, a.etype from stu_kq as a join (select * from stu where sno=?) as b where a.sno=b.sno',
    kq_jl_query: 'select a.sno, b.sname, b.cname, a.date, a.stime, a.etime, a.stype, a.kweek, a.etype from stu_kq as a join (select * from stu where cname in (select cname from class where tno=?)) as b where a.sno=b.sno and b.cname=? and a.date=?',
    kq_sj: "select a.sno, b.sname, b.cname, a.date, a.stime, a.etime, a.stype, a.kweek, a.etype  from stu_kq as a join (select * from stu where cname in (select cname from class where tno=?)) as b where a.sno=b.sno and stime >= date_sub(time(?),interval 5 minute) and stime<=date_sub(time(?),interval -1 hour) and a.date=curdate()",
    qq_sno: 'select sno, sname from  stu where cname=? AND sno not in(select sno from stu_kq where date=curdate() and stime>=date_sub(time(?),interval 5 minute) and stime<=date_sub(time(?),interval -1 hour))', 
  },
  stu_experiment_kq: {
    kq_sj: "select a.sno, b.sname, b.cname, a.late_num, a.early_num, a.late_early_num, a.absence_num, a.normal_num, a.total_num  from stu_experiment_kq as a join (select * from stu where cname in (select cname from class where tno=?)) as b where a.sno=b.sno",
  },
  teacher_experiment: {
    add: 'insert into teacher_experiment(tno, name) values(?,?)',
    check: 'select count(*) as num from teacher_experiment where tno=? and name=?',
    one: 'select * from teacher_experiment where tno=?',
    delete: 'delete from teacher_experiment where tno=? and name=?'
  },
  stu_experiment_score: {
  },
  stu_score_table: {
    add: 'insert into stu_score_table(tno, name) values(?,?)',
  },
  num: 'CALL num(?, ?, @a, @b, @c, @d, @e, @f)',
  kq: 'CALL kq( @a, @b, @c, @d, @e, @f, @g, @h, @i, @x, @y, ?, ?)'
}
