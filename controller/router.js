// 创建路由
var router = require('express').Router();
var dir = require('./dir.js');
var pic = require('./pic.js');

router.get('/',function(req,res){
  // res.send('/////');
  // 跳转到/dir/show请求
  res.redirect('/dir/show');
});

// 处理文件夹相关的操作
router.use('/dir',dir);

// 处理图片相关的操作
router.use('/pic',pic);

module.exports = router;