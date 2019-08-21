var express = require('express');
var router = require('./controller/router.js');
var bdParser = require('body-parser');
var app = express();

app.listen(4000);

// 模板引擎ejs
app.set('view engine','ejs');

// 设置请求解析方式
app.use(bdParser.urlencoded({extended:true}));

// 静态资源根目录
app.use(express.static('./public'));
app.use(express.static('./uploads'));


// 调用路由处理所有请求
app.use(router);




