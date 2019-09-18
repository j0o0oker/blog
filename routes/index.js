const express = require('express');
const mysql = require('mysql');

const db = mysql.createPool({host: 'localhost', port: '3306', user: 'root', password: '327681', database: 'blog'});

let router = express.Router();
	
	router.get('/', (req, res, next) => {
		let sqlStr = 'SELECT * FROM user_table WHERE ID<4;';
		db.query(sqlStr, (err, data) => {
			if (err) {
				res.send(err).end();
			}else {
				res.user_data = data;
				next();
			}
		});
	});
	router.get('/', (req, res) => {
		let sqlStr = 'SELECT * FROM artical_table;';
		db.query(sqlStr, (err, data) => {
			if (err) {
				res.send(err).end();
			}else {
				res.render('index.ejs', {user_data: res.user_data, artical_data: data});
			}
		});
	});
module.exports = router;
