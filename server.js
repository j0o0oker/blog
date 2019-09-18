const express = require('express');
const mysql = require('mysql');
const consolidate = require('consolidate');
const readStaticFile = require('express-static');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const omulter = multer({dest: './www/static/upload'});
const URL = require('url');


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


// 解析文件

server.use(omulter.any());


// 配置模板引擎

server.set('view engine', 'html');					// 配置模板名称
server.set('views', './www/templetes');				// 模板位置
server.engine('html', consolidate.ejs);				// 选择配置好的模板


// create SQL connoetion

const db = mysql.createPool({host: 'localhost', port: '3306', user: 'root', password: '327681', database: 'blog'}) ;


// 访问网址时跳转到首页

server.get('/', (req, res) => {
	res.redirect('/index');
});


// 首页

server.use('/index', require('./routes/index.js'));


// 文章详情页

server.use('/artical', require('./routes/article.js')());


// 写文章页

server.use('/write', require('./routes/write.js')());


// 注册页

server.use('/regist', require('./routes/regist.js')());


// 登录页

server.use('/login', require('./routes/login.js')());


// 我的页

server.use('/me', require('./routes/me.js')());


//退出登录

server.get('/logout', (req, res) => {
	req.session.user_id = undefined;
	res.redirect('/me');
});
	
	
// 读取静态文件

server.use(readStaticFile('./www'));
