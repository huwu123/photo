// 处理dir相关的请求
var router = require('express').Router();
var file = require('../model/file.js');
// 文件夹相关的操作：展示，创建，删除

// 展示
router.get('/show',function(req,res){
  // var dirs = file.getDirs();
  // console.log(dirs);
  // res.end();
  // res.send(dirs);
  file.getDirs(function(err,files){
    if(err){
      console.log(err);
      res.send('服务器故障');
      return ;
    }
    // res.send(files);
    // 将数据传递给视图模板进行解析
    res.render('index',{dirs:files});
  });
});

// 创建文件夹分两步：
// 跳转到创建页面，创建文件夹
router.get('/toCreate',function(req,res){
  res.render('create');
});

// 创建文件夹
router.post('/doCreate',function(req,res){
  // 获取文件夹名称
  var dirName = req.body.dirName;
  file.createDir('./uploads/'+dirName,function(err){
    if(err){
      console.log(err);
      res.send('创建失败');
      return ;
    }
    // 成功
    res.redirect('/');
  });
});

// 删除文件夹
router.get('/delete/:dirName',function(req,res){
  // 获取被删除文件夹名称
  var dirName = req.params.dirName;
  file.deleteDir('./uploads/'+dirName,function(err){
    if(err){
      console.log(err);
      res.send('删除失败');
      return ;
    }
    // 删除成功
    res.redirect('/');
  });
});



module.exports = router;



