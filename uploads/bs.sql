/*
 Navicat Premium Data Transfer

 Source Server         : bs
 Source Server Type    : MySQL
 Source Server Version : 80015
 Source Host           : localhost:3306
 Source Schema         : bs

 Target Server Type    : MySQL
 Target Server Version : 80015
 File Encoding         : 65001

 Date: 29/05/2019 13:49:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class`  (
  `cname` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tno` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`cname`) USING BTREE,
  UNIQUE INDEX `cname`(`cname`) USING BTREE,
  INDEX `c_tno`(`tno`) USING BTREE,
  CONSTRAINT `c_tno` FOREIGN KEY (`tno`) REFERENCES `teacher` (`tno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES ('电商152班', '2015012000');
INSERT INTO `class` VALUES ('软工151班', '2015012000');
INSERT INTO `class` VALUES ('软工152班', '2015012000');
INSERT INTO `class` VALUES ('软工153班', '2015012000');

-- ----------------------------
-- Table structure for coursetable
-- ----------------------------
DROP TABLE IF EXISTS `coursetable`;
CREATE TABLE `coursetable`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tno` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cname` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cdate` date NOT NULL,
  `cweek` enum('星期日','星期一','星期二','星期三','星期四','星期五','星期六') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `stime` time(0) NOT NULL,
  `etime` time(0) NOT NULL,
  `address` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '机房二层南',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ct_cname`(`cname`) USING BTREE,
  INDEX `ct_tno`(`tno`) USING BTREE,
  CONSTRAINT `ct_cname` FOREIGN KEY (`cname`) REFERENCES `class` (`cname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ct_tno` FOREIGN KEY (`tno`) REFERENCES `teacher` (`tno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 75 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of coursetable
-- ----------------------------
INSERT INTO `coursetable` VALUES (48, '2015012000', '电商152班', '2019-05-15', '星期三', '16:30:00', '18:20:00', '机房三层南');
INSERT INTO `coursetable` VALUES (58, '2015012000', '电商152班', '2019-05-21', '星期一', '08:00:00', '09:50:00', '机房三层南');
INSERT INTO `coursetable` VALUES (59, '2015012000', '电商152班', '2019-05-25', '星期一', '19:30:00', '21:20:00', '机房三层南');
INSERT INTO `coursetable` VALUES (62, '2015012000', '电商152班', '2019-05-22', '星期三', '21:00:00', '22:54:00', '机房三层南');
INSERT INTO `coursetable` VALUES (63, '2015012000', '软工153班', '2019-05-22', '星期三', '16:10:00', '17:50:00', '机房三层南');
INSERT INTO `coursetable` VALUES (68, '2015012000', '软工153班', '2019-05-15', '星期三', '16:10:00', '17:50:00', '机房三层南');
INSERT INTO `coursetable` VALUES (72, '2015012000', '软工153班', '2019-05-29', '星期六', '10:10:00', '12:00:00', '机房三层南');
INSERT INTO `coursetable` VALUES (73, '2015012000', '软工153班', '2019-05-27', '星期五', '19:30:00', '21:20:00', '机房三层南');
INSERT INTO `coursetable` VALUES (74, '2015012000', '软工151班', '2019-05-25', '星期六', '14:00:00', '15:50:00', '机房三层南');

-- ----------------------------
-- Table structure for experiment_submit_time
-- ----------------------------
DROP TABLE IF EXISTS `experiment_submit_time`;
CREATE TABLE `experiment_submit_time`  (
  `tno` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cname` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `last_date` date NULL DEFAULT NULL,
  PRIMARY KEY (`tno`, `name`, `cname`) USING BTREE,
  INDEX `t_s_e_name`(`name`) USING BTREE,
  INDEX `teacher_submit_experiment_ibfk_1`(`cname`) USING BTREE,
  CONSTRAINT `t_s_e_name` FOREIGN KEY (`name`) REFERENCES `teacher_experiment` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_s_e_tno` FOREIGN KEY (`tno`) REFERENCES `teacher` (`tno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `experiment_submit_time_ibfk_1` FOREIGN KEY (`cname`) REFERENCES `class` (`cname`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of experiment_submit_time
-- ----------------------------
INSERT INTO `experiment_submit_time` VALUES ('2015012000', '实验二', '软工152班', '2019-05-30');

-- ----------------------------
-- Table structure for kq_system
-- ----------------------------
DROP TABLE IF EXISTS `kq_system`;
CREATE TABLE `kq_system`  (
  `tno` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '30',
  `late_score` int(255) NULL DEFAULT 0,
  `early_score` int(255) NULL DEFAULT 0,
  `late_early_score` int(255) NULL DEFAULT 0,
  `absence_score` int(255) NULL DEFAULT 0,
  `kq_rate` int(255) NULL DEFAULT 30,
  PRIMARY KEY (`tno`) USING BTREE,
  CONSTRAINT `kq_system_tno` FOREIGN KEY (`tno`) REFERENCES `teacher` (`tno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of kq_system
-- ----------------------------
INSERT INTO `kq_system` VALUES ('2015012000', 1, 2, 3, 4, 30);
INSERT INTO `kq_system` VALUES ('20150128888', 0, 0, 0, 0, 30);

-- ----------------------------
-- Table structure for message_box
-- ----------------------------
DROP TABLE IF EXISTS `message_box`;
CREATE TABLE `message_box`  (
  `id` int(11) NOT NULL,
  `send_uname` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `receive_uname` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` blob NOT NULL,
  `time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `send_uname`(`send_uname`) USING BTREE,
  INDEX `receive_uname`(`receive_uname`) USING BTREE,
  CONSTRAINT `receive_uname` FOREIGN KEY (`receive_uname`) REFERENCES `user` (`uname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `send_uname` FOREIGN KEY (`send_uname`) REFERENCES `user` (`uname`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for stu
-- ----------------------------
DROP TABLE IF EXISTS `stu`;
CREATE TABLE `stu`  (
  `sno` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sname` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cname` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sex` enum('男','女') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `reg_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`sno`) USING BTREE,
  UNIQUE INDEX `sno`(`sno`) USING BTREE,
  INDEX `cname`(`cname`) USING BTREE,
  CONSTRAINT `cname` FOREIGN KEY (`cname`) REFERENCES `class` (`cname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sno` FOREIGN KEY (`sno`) REFERENCES `user` (`uname`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of stu
-- ----------------------------
INSERT INTO `stu` VALUES ('2015012947', '李娟', '软工153班', NULL, '女', '2019-05-20 11:16:19');
INSERT INTO `stu` VALUES ('2015012948', '王伟', '软工153班', NULL, '男', '2019-05-22 11:12:10');
INSERT INTO `stu` VALUES ('2015012951', '张琦', '软工153班', NULL, '男', '2019-05-22 13:22:42');
INSERT INTO `stu` VALUES ('2015012975', '石会雯', '电商152班', NULL, '女', '2019-05-17 09:38:13');
INSERT INTO `stu` VALUES ('2015012988', '司徒风', '电商152班', '', '男', '2019-05-25 16:16:34');

-- ----------------------------
-- Table structure for stu_experiment_discuss
-- ----------------------------
DROP TABLE IF EXISTS `stu_experiment_discuss`;
CREATE TABLE `stu_experiment_discuss`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `role` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `s_e_s_sno`(`uid`) USING BTREE,
  INDEX `sus_name`(`name`) USING BTREE,
  CONSTRAINT `s_e_s_sno` FOREIGN KEY (`uid`) REFERENCES `user` (`uname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sus_name` FOREIGN KEY (`name`) REFERENCES `teacher_experiment` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of stu_experiment_discuss
-- ----------------------------
INSERT INTO `stu_experiment_discuss` VALUES (1, '2015012947', 'woshiygeren', '2019-05-27 19:13:56', '实验一', 0);
INSERT INTO `stu_experiment_discuss` VALUES (6, '2015012951', '我是一个人', '2019-05-27 19:14:00', '实验一', 1);
INSERT INTO `stu_experiment_discuss` VALUES (7, '2015012975', '我是一个人我是一个人我是一个人我是一个人我是一个人我是一个人我是一个人我是一个人我是一个人我是一个人我是一个人我是一个人我是一个人我是一个人我是一个人我是一个人我是一个人我是一个人', '2019-05-27 20:12:11', '实验一', 1);
INSERT INTO `stu_experiment_discuss` VALUES (8, '2015012000', '43', '2019-05-27 19:42:49', '实验一', 0);
INSERT INTO `stu_experiment_discuss` VALUES (9, '2015012000', '你说什么我听不懂', '2019-05-27 20:24:24', '实验一', 1);
INSERT INTO `stu_experiment_discuss` VALUES (10, '2015012000', '我说的你竟然听不懂，哼，不聊了', '2019-05-27 20:24:43', '实验一', 1);
INSERT INTO `stu_experiment_discuss` VALUES (11, '2015012000', '你干嘛', '2019-05-27 20:25:00', '实验四', 1);
INSERT INTO `stu_experiment_discuss` VALUES (12, '2015012000', '我就不告诉你', '2019-05-27 20:25:48', '实验五', 1);
INSERT INTO `stu_experiment_discuss` VALUES (13, '2015012947', '呵呵', '2019-05-27 20:45:18', '实验四', 1);
INSERT INTO `stu_experiment_discuss` VALUES (14, '2015012947', '喵喵喵', '2019-05-27 20:45:44', '实验四', 0);
INSERT INTO `stu_experiment_discuss` VALUES (15, '2015012000', '哈哈', '2019-05-28 14:50:19', '实验一', 1);
INSERT INTO `stu_experiment_discuss` VALUES (16, '2015012947', 'zuoyeshenmshihou', '2019-05-29 10:02:10', '实验一', 0);

-- ----------------------------
-- Table structure for stu_experiment_kq
-- ----------------------------
DROP TABLE IF EXISTS `stu_experiment_kq`;
CREATE TABLE `stu_experiment_kq`  (
  `sno` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `late_num` int(2) NULL DEFAULT 0,
  `early_num` int(2) NULL DEFAULT 0,
  `late_early_num` int(2) NULL DEFAULT 0,
  `absence_num` int(2) NULL DEFAULT 0,
  `normal_num` int(2) NULL DEFAULT 0,
  `total_num` int(2) NULL DEFAULT 0,
  `kq_score` int(2) NULL DEFAULT 0,
  PRIMARY KEY (`sno`) USING BTREE,
  INDEX `s_e_sno`(`sno`) USING BTREE,
  CONSTRAINT `s_e_sno` FOREIGN KEY (`sno`) REFERENCES `stu` (`sno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of stu_experiment_kq
-- ----------------------------
INSERT INTO `stu_experiment_kq` VALUES ('2015012947', 0, 0, 2, -1, 2, 3, 98);
INSERT INTO `stu_experiment_kq` VALUES ('2015012948', 0, 0, 0, 3, 0, 3, 88);
INSERT INTO `stu_experiment_kq` VALUES ('2015012951', 0, 0, 0, 3, 0, 3, 88);
INSERT INTO `stu_experiment_kq` VALUES ('2015012975', 0, 0, 1, 2, 0, 3, 89);
INSERT INTO `stu_experiment_kq` VALUES ('2015012988', 0, 0, 1, 2, 0, 3, 85);

-- ----------------------------
-- Table structure for stu_experiment_score
-- ----------------------------
DROP TABLE IF EXISTS `stu_experiment_score`;
CREATE TABLE `stu_experiment_score`  (
  `sno` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `exp1` int(2) NULL DEFAULT 0,
  `exp2` int(2) NULL DEFAULT 0,
  `exp3` int(2) NULL DEFAULT 0,
  `exp4` int(2) NULL DEFAULT 0,
  `exp5` int(2) NULL DEFAULT 0,
  `total_score` int(3) NULL DEFAULT 0,
  `avg_score` float NULL DEFAULT 0,
  PRIMARY KEY (`sno`) USING BTREE,
  CONSTRAINT `s_s_s_sno` FOREIGN KEY (`sno`) REFERENCES `stu` (`sno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of stu_experiment_score
-- ----------------------------
INSERT INTO `stu_experiment_score` VALUES ('2015012947', 100, 100, 99, 79, 0, 378, 94.5);
INSERT INTO `stu_experiment_score` VALUES ('2015012948', 35, 0, 0, 100, 0, 135, 33.75);
INSERT INTO `stu_experiment_score` VALUES ('2015012951', 88, 0, 0, 100, 0, 188, 47);
INSERT INTO `stu_experiment_score` VALUES ('2015012975', 99, 100, 88, 79, 0, 366, 91.5);
INSERT INTO `stu_experiment_score` VALUES ('2015012988', 100, 80, 77, 81, 0, 338, 84.5);

-- ----------------------------
-- Table structure for stu_kq
-- ----------------------------
DROP TABLE IF EXISTS `stu_kq`;
CREATE TABLE `stu_kq`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sno` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `date` date NOT NULL,
  `kweek` enum('星期日','星期一','星期二','星期三','星期四','星期五','星期六') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `stime` time(0) NOT NULL,
  `etime` time(0) NOT NULL,
  `stype` tinyint(2) NOT NULL,
  `etype` tinyint(2) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `kq_sno`(`sno`) USING BTREE,
  CONSTRAINT `kq_sno` FOREIGN KEY (`sno`) REFERENCES `stu` (`sno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 278 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of stu_kq
-- ----------------------------
INSERT INTO `stu_kq` VALUES (265, '2015012947', '2019-05-20', '星期一', '16:40:00', '18:34:30', 0, 0);
INSERT INTO `stu_kq` VALUES (269, '2015012947', '2019-05-23', '星期二', '16:00:02', '17:51:04', 1, 1);
INSERT INTO `stu_kq` VALUES (270, '2015012948', '2019-05-22', '星期三', '14:05:00', '15:07:00', 1, 1);
INSERT INTO `stu_kq` VALUES (271, '2015012975', '2019-05-22', '星期三', '21:05:35', '21:05:42', 1, 1);
INSERT INTO `stu_kq` VALUES (272, '2015012948', '2019-05-25', '星期四', '10:50:19', '12:00:23', 1, 0);
INSERT INTO `stu_kq` VALUES (273, '2015012951', '2019-05-23', '星期四', '17:03:42', '17:04:43', 1, 1);
INSERT INTO `stu_kq` VALUES (275, '2015012947', '2019-05-25', '星期六', '10:05:59', '12:00:09', 0, 0);
INSERT INTO `stu_kq` VALUES (276, '2015012988', '2019-05-25', '星期六', '20:17:13', '20:17:13', 1, 1);
INSERT INTO `stu_kq` VALUES (277, '2015012947', '2019-05-27', '星期一', '20:26:25', '20:26:25', 1, 1);

-- ----------------------------
-- Table structure for stu_score_table
-- ----------------------------
DROP TABLE IF EXISTS `stu_score_table`;
CREATE TABLE `stu_score_table`  (
  `sno` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `kq_score` int(255) NULL DEFAULT 0,
  `avg_score` float NULL DEFAULT 0,
  `final_score` float NULL DEFAULT 0,
  PRIMARY KEY (`sno`) USING BTREE,
  CONSTRAINT `s_s_t_sno` FOREIGN KEY (`sno`) REFERENCES `stu` (`sno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of stu_score_table
-- ----------------------------
INSERT INTO `stu_score_table` VALUES ('2015012947', 98, 94.5, 95.55);
INSERT INTO `stu_score_table` VALUES ('2015012948', 88, 33.75, 50.025);
INSERT INTO `stu_score_table` VALUES ('2015012951', 88, 47, 59.3);
INSERT INTO `stu_score_table` VALUES ('2015012975', 89, 91.5, 90.75);
INSERT INTO `stu_score_table` VALUES ('2015012988', 85, 84.5, 84.65);

-- ----------------------------
-- Table structure for stu_sumbit_file
-- ----------------------------
DROP TABLE IF EXISTS `stu_sumbit_file`;
CREATE TABLE `stu_sumbit_file`  (
  `sno` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `filename` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `submit_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `submit_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`sno`, `name`) USING BTREE,
  INDEX `s_s_f_name`(`name`) USING BTREE,
  CONSTRAINT `s_s_f_name` FOREIGN KEY (`name`) REFERENCES `teacher_experiment` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `s_s_ff_sno` FOREIGN KEY (`sno`) REFERENCES `stu` (`sno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of stu_sumbit_file
-- ----------------------------
INSERT INTO `stu_sumbit_file` VALUES ('2015012947', '实验一', '2015012947_李娟_实验一', './sumbit/2015012000/软工153班', '2019-05-29 13:43:58');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `tno` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tname` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sex` enum('男','女') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone` char(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `address` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` int(255) NULL DEFAULT 0,
  PRIMARY KEY (`tno`) USING BTREE,
  UNIQUE INDEX `tno`(`tno`) USING BTREE,
  CONSTRAINT `tnos` FOREIGN KEY (`tno`) REFERENCES `user` (`uname`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('2015012000', '田晶', NULL, '男', '546340932@qq.com', '18821620434', '学院楼3楼', 0);
INSERT INTO `teacher` VALUES ('20150128888', '贺换', NULL, '女', '4@qq.com', '13474229060', '学院楼5楼', 0);

-- ----------------------------
-- Table structure for teacher_experiment
-- ----------------------------
DROP TABLE IF EXISTS `teacher_experiment`;
CREATE TABLE `teacher_experiment`  (
  `tno` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`tno`, `name`) USING BTREE,
  INDEX `name`(`name`) USING BTREE,
  CONSTRAINT `tno_ex` FOREIGN KEY (`tno`) REFERENCES `teacher` (`tno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher_experiment
-- ----------------------------
INSERT INTO `teacher_experiment` VALUES ('2015012000', '实验一');
INSERT INTO `teacher_experiment` VALUES ('2015012000', '实验三');
INSERT INTO `teacher_experiment` VALUES ('2015012000', '实验二');
INSERT INTO `teacher_experiment` VALUES ('2015012000', '实验五');
INSERT INTO `teacher_experiment` VALUES ('2015012000', '实验四');

-- ----------------------------
-- Table structure for teacher_summary
-- ----------------------------
DROP TABLE IF EXISTS `teacher_summary`;
CREATE TABLE `teacher_summary`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tno` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '相当于主题',
  `t_summary` blob NULL,
  `time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `type` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for teacher_upload_file
-- ----------------------------
DROP TABLE IF EXISTS `teacher_upload_file`;
CREATE TABLE `teacher_upload_file`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tno` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `upload_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `upload_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `type` tinyint(2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `t_u_f_name`(`name`) USING BTREE,
  INDEX `t_u_f_tno`(`tno`) USING BTREE,
  CONSTRAINT `t_u_f_tno` FOREIGN KEY (`tno`) REFERENCES `teacher` (`tno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `uname` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `upwd` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '123456',
  `role` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '学生' COMMENT '判断角色',
  PRIMARY KEY (`uname`) USING BTREE,
  UNIQUE INDEX `uname`(`uname`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2015012000', '123456', '教师');
INSERT INTO `user` VALUES ('20150128888', '123456', '教师');
INSERT INTO `user` VALUES ('2015012901', '123456', '管理员');
INSERT INTO `user` VALUES ('2015012947', '123456', '学生');
INSERT INTO `user` VALUES ('2015012948', '123456', '学生');
INSERT INTO `user` VALUES ('2015012951', '123456', '学生');
INSERT INTO `user` VALUES ('2015012975', '123456', '学生');
INSERT INTO `user` VALUES ('2015012988', '123456', '学生');

-- ----------------------------
-- View structure for final_score
-- ----------------------------
DROP VIEW IF EXISTS `final_score`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `final_score` AS select `a`.`sno` AS `sno`,`c`.`sname` AS `sname`,`c`.`cname` AS `cname`,`a`.`exp1` AS `exp1`,`a`.`exp2` AS `exp2`,`a`.`exp3` AS `exp3`,`a`.`exp4` AS `exp4`,`a`.`exp5` AS `exp5`,`a`.`avg_score` AS `avg_score`,`b`.`kq_score` AS `kq_score`,`b`.`final_score` AS `final_score` from ((`stu_score_table` `b` join `stu_experiment_score` `a`) join `stu` `c`) where ((`a`.`sno` = `b`.`sno`) and (`b`.`sno` = `c`.`sno`));

-- ----------------------------
-- View structure for s_t
-- ----------------------------
DROP VIEW IF EXISTS `s_t`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `s_t` AS select `stu`.`sno` AS `sno`,`stu`.`sname` AS `sname`,`class`.`cname` AS `cname`,`class`.`tno` AS `tno`,`kq_system`.`late_score` AS `late_score`,`kq_system`.`early_score` AS `early_score`,`kq_system`.`late_early_score` AS `late_early_score`,`kq_system`.`absence_score` AS `absence_score` from ((`stu` join `class` on((`stu`.`cname` = `class`.`cname`))) join `kq_system` on((`class`.`tno` = `kq_system`.`tno`)));

-- ----------------------------
-- View structure for stu_discuss
-- ----------------------------
DROP VIEW IF EXISTS `stu_discuss`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `stu_discuss` AS select `a`.`sname` AS `sname`,`a`.`cname` AS `cname`,`a`.`sno` AS `sno`,`b`.`content` AS `content`,`b`.`time` AS `time`,`b`.`name` AS `name` from (`stu_experiment_discuss` `b` join `stu` `a`) where (`a`.`sno` = `b`.`uid`) order by `b`.`time` desc;

-- ----------------------------
-- View structure for teacher_discuss
-- ----------------------------
DROP VIEW IF EXISTS `teacher_discuss`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `teacher_discuss` AS select `a`.`tname` AS `tname`,`a`.`tno` AS `tno`,`b`.`content` AS `content`,`b`.`time` AS `time`,`b`.`name` AS `name` from (`stu_experiment_discuss` `b` join `teacher` `a`) where (`a`.`tno` = `b`.`uid`) order by `b`.`time` desc;

-- ----------------------------
-- View structure for total_score
-- ----------------------------
DROP VIEW IF EXISTS `total_score`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `total_score` AS select `a`.`sno` AS `sno`,`a`.`sname` AS `sname`,`a`.`cname` AS `cname`,`b`.`kq_score` AS `kq_score`,`b`.`avg_score` AS `avg_score`,`b`.`final_score` AS `final_score` from (`stu_score_table` `b` join `stu` `a`) where (`a`.`sno` = `b`.`sno`);

-- ----------------------------
-- Procedure structure for final_score
-- ----------------------------
DROP PROCEDURE IF EXISTS `final_score`;
delimiter ;;
CREATE PROCEDURE `final_score`(IN v_tno VARCHAR(15))
  READS SQL DATA 
BEGIN
	#Routine body goes here...
	DECLARE v_kq_rate int;
	DECLARE num VARCHAR(15) DEFAULT '';
	DECLARE IS_FOUND INTEGER DEFAULT 1;
	DECLARE v_score int;
	DECLARE vv_score float;
	DECLARE done INT DEFAULT 0; #repeat结束标识
	DECLARE v_sno CURSOR
	FOR
	select sno from total_score where cname in (SELECT cname from class where tno=v_tno);
-- 	DECLARE CONTINUE HANDLER FOR NOT FOUND SET IS_FOUND=0;

DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
	open v_sno;
	REPEAT
		fetch v_sno into num;
-- 			select kq_score into v_score from total_score where sno=num;
-- 			select avg_score into vv_score from total_score where sno=num;
-- 			select kq_rate into v_kq_rate from kq_system where tno=v_tno;
			if NOT DONE  then
			select kq_score into v_score from stu_experiment_kq where sno=num;
			select avg_score into vv_score from stu_experiment_score where sno=num;
			select kq_rate into v_kq_rate from kq_system where tno=v_tno;
			update stu_score_table set kq_score=v_score, avg_score=vv_score,final_score=(1-v_kq_rate/100)*vv_score+v_kq_rate/100*v_score where sno=num;
			select v_score,vv_score,(1-v_kq_rate/100)*vv_score+v_kq_rate/100*v_score,num;
		end if;
		
 	UNTIL done END REPEAT;
	close v_sno;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for kq
-- ----------------------------
DROP PROCEDURE IF EXISTS `kq`;
delimiter ;;
CREATE PROCEDURE `kq`(OUT `total_num` int,OUT `true_num` int,OUT `absence_num` int,OUT `early_num` int,OUT `late_num` int,OUT `late_early_num` int,OUT `normal_num` int,OUT `sno` varchar(15),OUT `sj_tno` varchar(15),OUT `sname` varchar(40),OUT `sj_cname` varchar(40), IN `tno` varchar(15),out `v_stime` time)
  READS SQL DATA 
BEGIN
	#Routine body goes here...
-- 	DECLARE sno varchar(15);
-- 	DECLARE sname varchar(40);
-- 		DECLARE sj_tno varchar(15);
-- 	DECLARE cname varchar(40);
-- 	总人数
	select tno,cname,stime  into sj_tno,sj_cname, v_stime from coursetable where cdate=curdate() and (stime-curtime())<=500 and (curtime()-etime)<=500;
-- 	select sj_tno, sj_cname;
	if tno = sj_tno then
-- 	总的签到人数
		SELECT count(*) into total_num from stu where cname=sj_cname;
-- 	现在签到人数
		select count(*) into true_num from stu_kq where date=curdate() and stime>=date_sub(time(v_stime),interval 5 minute) and stime<=date_sub(time(v_stime),interval -1 hour);
-- 	缺勤学生
-- 		select sno, sname into sno, sname from  stu where cname=sj_cname AND sno not in(select sno from stu_kq where date=curdate() and stime>=date_sub(time(stime),interval 5 minute) and stime<=date_sub(time(stime),interval -1 hour));
-- 		select sno, sname;
--  迟到个数
		select count(*) into late_num from stu_kq where date=curdate() and stime>=date_sub(time(v_stime),interval 5 minute) and stime<=date_sub(time(v_stime),interval -1 hour) and stype=1;
-- 	迟到学生
-- 		select stu.sno, stu.sname into sno, sname from stu_kq join stu where stu.sno=stu_kq.sno and date=curdate() and stime>=date_sub(time(stime),interval 5 minute) and stime<=date_sub(time(stime),interval -1 hour) and stype=1;
-- -- 		select sno, sname;
--  早退个数
		select count(*) into early_num from stu_kq where date=curdate() and stime>=date_sub(time(v_stime),interval 5 minute) and stime<=date_sub(time(v_stime),interval -1 hour) and etype=1;
-- 	早退学生
-- 		select stu.sno, stu.sname into sno, sname from stu_kq join stu where date=curdate() and stime>=date_sub(time(stime),interval 5 minute) and stime<=date_sub(time(stime),interval -1 hour) and etype=1 and stu.sno=stu_kq.sno;
-- 		select sno, sname;
--  迟到早退个数
		select count(*) into late_early_num from stu_kq where date=curdate() and stime>=date_sub(time(v_stime),interval 5 minute) and stime<=date_sub(time(v_stime),interval -1 hour) and etype=1 and stype=1;
-- 	迟到早退学生
-- 		select stu.sno, stu.sname into sno, sname  from stu_kq join stu where date=curdate() and stime>=date_sub(time(stime),interval 5 minute) and stime<=date_sub(time(stime),interval -1 hour) and etype=1 and stype=1 and stu.sno=stu_kq.sno;
-- 		select sno, sname;
--  正常学生
-- 		select stu.sno, stu.sname into sno, sname  from stu_kq join stu where date=curdate() and stime>=date_sub(time(stime),interval 5 minute) and stime<=date_sub(time(stime),interval -1 hour) and etype=0 and stype=0 and stu.sno=stu_kq.sno;
-- -- 		select sno, sname;
-- 	正常个数
		select count(*) into normal_num from stu_kq where date=curdate() and stime>=date_sub(time(v_stime),interval 5 minute) and stime<=date_sub(time(v_stime),interval -1 hour) and etype=0 and stype=0;
		select total_num, true_num, early_num, total_num - true_num as absence_num, late_num, late_early_num, normal_num,sj_cname,v_stime;
	end if;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for kq_final_update
-- ----------------------------
DROP PROCEDURE IF EXISTS `kq_final_update`;
delimiter ;;
CREATE PROCEDURE `kq_final_update`(IN v_tno VARCHAR(15))
  READS SQL DATA 
BEGIN
	#Routine body goes here...
	DECLARE v_total int;
	DECLARE class VARCHAR(40) DEFAULT '';
	DECLARE IS_FOUND INTEGER DEFAULT 1;
	DECLARE late,early,late_early,absence int;
	DECLARE v_cname CURSOR
	FOR
	select cname from class where tno=v_tno;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET IS_FOUND=0;
	open v_cname;
	REPEAT
		fetch v_cname into class;
		if IS_FOUND=0 then
			SELECT count(*) INTO v_total 
			FROM  coursetable
			WHERE  cname=class and (cdate<CURDATE() or (cdate=curdate() && stime-CURTIME()<500));
			SELECT late_score, early_score,late_early_score,absence_score into late,early,late_early,absence from kq_system where tno=v_tno;
			update stu_experiment_kq set absence_num=v_total-total_num+absence_num, total_num=v_total,kq_score=100-(late*late_num+early_num*early+late_early_num*late_early+absence_num*absence) where sno in (SELECT sno from stu where cname=class) and total_num<v_total;
		end if;
 	UNTIL IS_FOUND!=0 END REPEAT;
	close v_cname;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for num
-- ----------------------------
DROP PROCEDURE IF EXISTS `num`;
delimiter ;;
CREATE PROCEDURE `num`(IN v_sno VARCHAR(15), IN v_cname VARCHAR(40), OUT total INT, OUT late_num INT, OUT total_num INT, OUT late_early_num INT,  OUT normal_num INT, OUT early_num INT)
  READS SQL DATA 
BEGIN  
	DECLARE flag int;
	DECLARE late,early,late_early,absence int;
-- 	总的签到次数
	SELECT count(*) INTO total 
	FROM  coursetable
	WHERE  cname=v_cname and (cdate<CURDATE() or (cdate=curdate() && stime-CURTIME()<500));
	
-- 	实际签到次数
	SELECT  COUNT(*)  INTO  total_num 
	FROM  stu_kq  
	WHERE  sno=v_sno;

-- 	迟到次数
	SELECT  COUNT(*)  INTO  late_num
	FROM  stu_kq  
	WHERE  sno=v_sno and stype=1 and etype=0;
-- 	早退次数
	SELECT  COUNT(*)  INTO  early_num
	FROM  stu_kq  
	WHERE  sno=v_sno and etype=1 and stype=0;
-- 	迟到早退次数
	SELECT  COUNT(*)  INTO  late_early_num
	FROM  stu_kq  
	WHERE  sno=v_sno and etype=1 and etype=1;
-- 	正常次数
	SELECT  COUNT(*)  INTO  normal_num
	FROM  stu_kq  
	WHERE  sno=v_sno and stype=0 and etype=0;
-- 	缺勤次数为 总次数 - 实际次数(total - total_num)

	
	SELECT late_score, early_score,late_early_score,absence_score into late,early,late_early,absence from s_t where sno=v_sno;

	update stu_experiment_kq set late_num=late_num, early_num=early_num, late_early_num=late_early_num, absence_num=total-total_num,normal_num=normal_num, total_num=total,kq_score=100-(late*late_num+early_num*early+late_early_num*late_early+absence_num*absence) where sno=v_sno;	
	
-- 	select count(*) INTO flag
-- 	from stu_experiment_kq
-- 	where sno=v_sno;
-- -- 判断汇总表中是否学生记录，不存在，创建；存在，更新
-- 	IF	flag = 0 then
-- 		insert into stu_experiment_kq(sno, late_num, early_num, late_early_num, absence_num, normal_num,total_num) VALUES(v_sno, late_num, early_num, late_early_num, total-total_num, normal_num,total);
-- 	else
-- 		update stu_experiment_kq set late_num=late_num, early_num=early_num, late_early_num=late_early_num, absence_num=total-total_num,normal_num=normal_num, total_num=total where sno=v_sno;	
-- 	end if;
-- 	select total, total_num,flag;
	select total, total_num, late_num, early_num, late_early_num, normal_num, total - total_num as absence_num;

END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
