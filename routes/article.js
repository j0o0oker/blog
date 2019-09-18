const express = require('express');
const mysql = require('mysql');
const URL = require('url');
const db = mysql.createPool({host: 'localhost', port: '3306', user: 'root', password: '327681', database: 'blog'});
let router = express.Router();
module.exports = function () {
	router.get('/', (req, res, next) => {
		db.query('SELECT *FROM artical_table WHERE ID="'+URL.parse(req.url, true).query.id+'";', (err, data) => {
			if (err) {
				res.send(err).end();
			}else {
				next();
				res.artical_data = data;
			}
		})
	});
	router.get('/', (req, res) => {
		db.query('SELECT *FROM user_table WHERE username="'+URL.parse(req.url, true).query.user+'";', (err, data) => {
			if (err) {
				res.send(err).end();
			}else {
				res.render('artical.ejs', {artical_data: res.artical_data, author_data: data});
				
			}
		})
	});
	
	return router;
}
