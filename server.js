const express = require('express');
const mysql = require('mysql');
const consolidate = require('consolidate');
const readStaticFile = require('express-static');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const URL = require('url');
// const expressRoute = require('express-route');



// 创建服务
let server = express();
// 监听
server.listen(8081); 



// 解析cookie
server.use(cookieParser('dwefwwfwefwefw'));

// 使用session

server.use(expressSession({
	secret: 'aaa',
	resave: true,
	rolling: true,
	saveUninitialized: true,
	cookie: {
		maxAge: 20*3600*1000
	}
}));

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

// 访问网址时跳转到首页
server.get('/', (req, res) => {
	res.redirect('/index');
});


// 首页
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



// 文章页
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

// 注册页

server.get('/regist', require('./routes/regist.js')());


// 登录页

server.get('/login', (req, res) => {
		res.render('login.ejs', {});
});

server.post('/login', require('./routes/login.js')());


// 我的页

server.get('/me', require('./routes/me.js')());












// 读取静态文件

server.use(readStaticFile('./www'));