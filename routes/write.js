const express = require('express');
const mysql = require('mysql');
const timeTransformer = require('../Libs/timetransformer')

const db = mysql.createPool({host: 'localhost', port: '3306', user: 'root', password: '327681', database: 'blog'});
let router = express.Router();
module.exports = function () {
	
	router.get('/', (req, res) => {
			res.render('write.ejs');
	});
	
	router.post('/', (req, res) => {
		if(req.session.user_id !== undefined) {
			if (req.body.title == '' || req.body.content =='') {
				res.status('400').send('标题和内容不能为空').end();
			} else {
				db.query(`INSERT INTO artical_table (author, title, content, time) VALUES ("${req.session.user_id}", "${req.body.title}", "${req.body.content}","${timeTransformer(req.body.time)}")`, (err, data) => {
					if (err) {
						res.status('400').send('databass err').end();
					} else {
						res.send('发表成功');
					}
				});
			}
		} else {
			res.status('400').send('您还没有登陆').end();
		}
	});
	return router;
}
