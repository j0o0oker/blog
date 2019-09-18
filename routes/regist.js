const express = require('express');
const mysql = require('mysql');
const pathLib = require('path');
const fs = require('fs');

const db = mysql.createPool({host: 'localhost', port: '3306', user: 'root', password: '327681', database: 'blog'});

module.exports = function () {
	let router = express.Router();
	
	
	router.get('/', (req, res) => {
		res.render('regist.ejs');
	});
	
	router.post('/', (req, res) => {
		
		db.query('SELECT username FROM user_table WHERE username="'+req.body.username+'";', (err, data) => {
			if (err) {
				res.status('400').send('数据路连接错误');
			} else {
				if (data == false) {
					// 可以注册
					if (req.body.username&&req.body.password) {
						
						let ext = pathLib.parse(req.files[0].originalname).ext;
						let oldPath = req.files[0].path;
						let newPath = req.files[0].path + ext;
						let newFileName = req.files[0].filename + ext;
						
						fs.rename(oldPath, newPath, (err) => {
							if(err) {
								res.status('500').send('file err').end();
							}else {
								// 数据库添加数据
								db.query(`INSERT INTO user_table (username, password, avator_src) VALUES ("${req.body.username}", "${req.body.password}", "../../static/upload/${req.files[0].filename}.jpg");`);
								res.redirect('/login');
							}
						});
					} else {
						res.status('400').send('用户名或密码不能为空').end();
					}
				} else {
					// 用户名存在
					res.status('400').send('该用户名已经存在').end();
				}
			}
		});
		
	});
	return router;
};