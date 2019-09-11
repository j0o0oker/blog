const express = require('express');
const mysql = require('mysql');


const db = mysql.createPool({host: 'localhost', port: '3306', user: 'root', password: '327681', database: 'blog'});

module.exports = function () {
	let router = express.Router();
	router.post('/regist', (req, res) => {
		db.query('SELECT username FROM user_table WHERE username="'+req.body.username+'";', (err, data) => {
			if (err) {
				res.status('400').send('数据路连接错误');
			} else {
				if (data == false) {
					// 可以注册
					if (req.body.username&&req.body.password) {
						// 数据库添加数据
						db.query(`INSERT INTO user_table (username, password) VALUES (${req.body.username}, ${req.body.password});`);
						res.send('注册成功');
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