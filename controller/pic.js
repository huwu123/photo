// 创建图片相关的路由
var router = require('express').Router();
var file = require('../model/file.js');
var fd = require('formidable'); //获取form表单内容
var sd = require('silly-datetime');//设置时间戳，以便修改上传之后的图片名称

// 展示图片
router.get('/show',function(req,res){
  // 获取被点击文件夹名称
  var dirName = req.query.dirName;
  // 获取该文件夹下有哪些图片
  file.getPics('./uploads/'+dirName,function(err,files){
    if(err){
      console.log(err);
      res.send('网络错误');
      return ;
    }
    res.render('show',{pics:files,dirName:dirName});
  });
});

// 删除图片
router.get('/delete',function(req,res){
  // 获取被删除图片名称
  var picName = req.query.picName;
  // 获取图片所在的文件夹名称
  var dirName = req.query.dirName;
  // 图片的路径
  var path = './uploads/'+dirName+'/'+picName;
  file.deletePic(path,function(err){
    if(err){
      console.log(err);
      res.send('删除');
      return ;
    }
    // 删除成功
    res.redirect('/pic/show?dirName='+dirName);
  })

});

// 跳转到上传页面
router.get('/toUpload',function(req,res){
  // 获取上传文件夹列表
  file.getDirs(function(err,files){
    if(err){
      console.log(err);
      res.send('网络错误');
      return ;
    }
    // 将所有文件夹传递给视图解析
    res.render('upload',{dirs:files});
  });
});

// 接收上传的图片
router.post('/doUpload',function(req,res){
  // 创建form
  var form = new fd.IncomingForm();
  // 设置临时保存路径
  form.uploadDir = './temp';
  // 解析请求req
  form.parse(req,function(err,fields,files){
    if(err){
      console.log(err);
      res.send('上传失败');
      return ;
    }
    // console.log(fields); // {dirName:'xxx'}
    // console.log(files); // {pic: File{path,name}}
    // res.end();
    // 获取参数
    var dirName = fields.dirName; // 保存的文件夹名称
    var oldPath = files.pic.path;// 旧路径
    var name = files.pic.name; // 旧名称
    var arr = name.split('.');
    var ext = arr[arr.length-1]; // 后缀名 jpg,jpeg
    var newName = sd.format(new Date(),'HHmmss');
    var rand = parseInt((Math.random()*99+1));//防止图片名称一致
    newName = newName+rand+'.'+ext;
    // 文件的新路径
    var newPath = './uploads/'+dirName+'/'+newName;
    // 调用file对应的上传方法
    file.upload(oldPath,newPath,function(err){
      if(err){
        console.log(err);
        res.send('上传失败');
        return ;
      }
      res.redirect('/pic/show?dirName='+dirName);
    });
  });
});


module.exports = router;