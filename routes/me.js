const express = require('express');
const mysql = require('mysql');

const db = mysql.createPool({host: 'localhost', port: '3306', user: 'root', password: '327681', database: 'blog'});
let router = express.Router();
module.exports = function () {
	router.get('/', (req, res) => {
			db.query('SELECT *FROM user_table WHERE username="'+req.session['user_id']+'";', (err, data) => {
				if (err) {
					res.send(err).end();
				}else {
					res.render('me.ejs', {user_data: data});
				}
			});
	
	});
	
	// 我的文章
	
	router.get('/myArticle', (req, res) => {
		switch (req.query.act) {
			case 'mod':
				res.status('400').send('这个功能待定').end();
				break;
			case 'del':
				db.query(`DELETE FROM artical_table WHERE ID=${req.query.id};`, (err,data) => {
					if (err) {
						res.status('400').send('database error').end();
					} else {
						res.redirect('/me/myArticle');
					}
				});
				break;
			default:
				db.query(`SELECT * FROM artical_table WHERE author="${req.session.user_id}";`, (err, data) => {
					if (err) {
						res.status('400').send('database error').end();
					} else {
						res.render('myArticle.ejs',{my_articles: data});
					}
				});
		}	
	});
	return router;
}
