const express = require('express');
const mysql = require('mysql');
const consolidate = require('consolidate');
const readStaticFile = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const URL = require('url');



// 创建服务
let server = express();
// 监听
server.listen(8081);



// 解析cookie
server.use(cookieParser('dwefwwfwefwefw'));

// 使用session

server.use(cookieSession({name: 'sess_id', keys:'sww', maxAge: 20*3600*1000}));

// post数据
server.use(bodyParser.urlencoded({extended: false}));


// 配置模板引擎
// 输出什么
server.set('view engine', 'html');
// 模板位置
server.set('views', './www/templetes');
// 设置引擎
server.engine('html', consolidate.ejs);


// create SQL connoetion
const db = mysql.createPool({host: 'localhost', port: '3306', user: 'root', password: '327681', database: 'blog'}) ;

server.get('/', (req, res) => {
	db.query('SELECT *FROM user_table;', (err, data) => {
		if (err) {
			res.send(err).end();
		}else if ( data == []){
			
			res.send('没有该用户，请注册');
			
		}else {
			res.render('index.ejs', {user_data: data});
			// console.log(data);
			res.end();
		}
	})
});



server.get('/index', (req, res, next) => {
	const GET = URL.parse(req.url, true).query;
	let sqlStr = 'SELECT *FROM user_table;';
	db.query(sqlStr, (err, data) => {
		if (err) {
			console.log(err);
			res.send(err).end();
		}else {
			// res.render('index.ejs', {user_data: data});
			res.user_data = data;
			next();
			// console.log('/index?id='+name);
			// console.log('/index?id='+zwname);
		}
	});
});
server.get('/index', (req, res) => {
	const GET = URL.parse(req.url, true).query;
	let sqlStr = 'SELECT *FROM artical_table;';
	db.query(sqlStr, (err, data) => {
		if (err) {
			console.log(err);
			res.send(err).end();
		}else {
			res.render('index.ejs', {user_data: res.user_data, artical_data: data});
			// console.log('/index?id='+name);
			// console.log('/index?id='+zwname);
		}
	});
});


// let name = '';
// let zwname = '';
// server.use('/loginCheck', (req, res, next) => {
// 	const GET = URL.parse(req.url, true).query;
// 	let sqlStr = 'SELECT *FROM user_table WHERE username="'+GET.username+'";';
// 	db.query(sqlStr, (err, data) => {
// 		if (err) {
// 			console.log(err);
// 			res.send(err).end();
// 		}else {
// 			if (data == false) {
// 				res.send('该用户不存在');
// 			}else {
// 				if (data[0].password !== GET.password) {
// 					res.send('用户名或密码错误请重新输入');
// 				}else {
// 					res.send(data[0].username);
// 					name = encodeURI(data[0].username);
// 					zwname = data[0].username;
// 					console.log(name);
// 					next();
// 				}
// 			}
// 		}
// 	});
// });
// server.get('/index?id='+zwname, (req, res) => {
// 	const GET = URL.parse(req.url, true).query;
// 	let sqlStr = 'SELECT *FROM user_table WHERE username="'+name+'";';
// 	db.query(sqlStr, (err, data) => {
// 		if (err) {
// 			console.log(err);
// 			res.send(err).end();
// 		}else {
// 			res.render('index.ejs', {user_data: data});
// 			console.log(111331);
// 		}
// 	});
// });
// server.get('/index?id='+name, (req, res) => {
// 	const GET = URL.parse(req.url, true).query;
// 	let sqlStr = 'SELECT *FROM user_table WHERE username="'+name+'";';
// 	db.query(sqlStr, (err, data) => {
// 		if (err) {
// 			console.log(err);
// 			res.send(err).end();
// 		}else {
// 			res.render('index.ejs', {user_data: data});
// 			console.log(1111);
// 		}
// 	});
// });
// 


server.get('/artical', (req, res, next) => {
	db.query('SELECT *FROM artical_table WHERE author="'+URL.parse(req.url, true).query.id+'";', (err, data) => {
		if (err) {
			res.send(err).end();
		}else {
			next();
			res.artical_data = data;
		}
	})
});
server.get('/artical', (req, res) => {
	db.query('SELECT *FROM user_table WHERE username="'+URL.parse(req.url, true).query.id+'";', (err, data) => {
		if (err) {
			res.send(err).end();
		}else {
			res.render('artical.ejs', {artical_data: res.artical_data, author_data: data});
			
		}
	})
});
// server.get('/me', (req, res) => {
// 	db.query('SELECT *FROM user_table;', (err, data) => {
// 		if (err) {
// 			res.send(err).end();
// 		}else {
// 			res.render('me.ejs', {user_data: data});
// 			
// 		}
// 	})
// });
// 

server.get('/login.html', (req, res) => {
	res.render('login.ejs', {})
	// console.log(req);
});
server.get('/me', (req, res) => {
	db.query('SELECT *FROM user_table WHERE username="'+URL.parse(req.url, true).query.username+'";', (err, data) => {
		if (err) {
			res.send(err).end();
		}else {
			console.log(data);
			console.log(URL.parse(req.url, true).query);
			res.render('me.ejs', {user_data: data});
			
			
		}
	});
});




// 读取静态文件


server.use(readStaticFile('./www'));