const express = require('express');
const expressStatic = require('express-static');
const mysql = require('mysql');
const consolidate = require('consolidate');



// 用express创建服务
let server = express();
server.listen(8080);



// 配置模板引擎
// 输出什么东西
server.set('view engine', 'html');
//模板文件放在哪儿
server.set('views', './www/templetes');
//哪种模板引擎
server.engine('html', consolidate.ejs.render);

// 连接数据库
const db = mysql.createPool({host: 'localhost', port: '3306', user: 'root', password: '327681', database: 'blog'});


// 首页
server.use('/', (req, res) => {
	db.query('SELECT * FROM user_table;', (err, data) => {
		if (err) {
			res.status(500).send('数据库链接错误').end();
		}else {
			let mydata = JSON.stringify(data);
			res.render('index.ejs', {user_data: data});
		}
	});
	
	
});

//我的信息页
server.use('/me.html', (req, res) => {
	db.query('SELECT * FROM user_table;', (err, data) => {
		if (err) {
			res.send('数据库连接出错').end();
		}else {
			let mydata = JSON.stringify(data);
			res.render('me.ejs', {user_data: data})
		}
	})
})

// 获取静态文件
server.use(expressStatic('./www'));

