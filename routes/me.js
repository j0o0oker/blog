const express = require('express');
const mysql = require('mysql');

const db = mysql.createPool({host: 'localhost', port: '3306', user: 'root', password: '327681', database: 'blog'});
let router = express.Router();
module.exports = function () {
	router.get('/me', (req, res) => {
			db.query('SELECT *FROM user_table WHERE username="'+req.session['user_id']+'";', (err, data) => {
				if (err) {
					res.send(err).end();
				}else {
					res.render('me.ejs', {user_data: data});
				}
			});
	
	});
	return router;
}
