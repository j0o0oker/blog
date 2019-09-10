const express = require('express');
const mysql = require('mysql');


const db = mysql.createPool({host: 'localhost', port: '3306', user: 'root', password: '327681', database: 'blog'});

module.exports = function () {
	let router = express.Router();
	router.get('/regist', (req, res) => {
		res.send('regist').end();
	});
	return router;
};