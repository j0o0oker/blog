const express = require('express');
const mysql = require('mysql');

const db = mysql.createPool({host: 'localhost', port: '3306', user: 'root', password: '327681', database: 'blog'});
let router = express.Router();
module.exports = function () {
	router.post('/login', (req, res) => {
		db.query('SELECT * FROM user_table WHERE username="'+req.body.username+'";', (err, data) => {
			if (err) {
				res.status('400').send('database err');
			} else {
				if (data == false) {
					res.status('400').send('username is not find');
				}else {
					if(req.body.password !== data[0].password) {
						res.status('400').send('username/password is not find');
					} else {
						req.session['user_id'] = data[0].username;
						res.redirect(302, '/me/');
					}
				}
			}
		});
	});
	return router;
}
