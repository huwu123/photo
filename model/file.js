// 操作文件或文件夹
var fs = require('fs');
var rf = require('rimraf');

// 获取uploads文件夹下的所有文件夹
exports.getDirs = function(callback){
  // var dirs = fs.readdirSync('./uploads');
  // return dirs;
  fs.readdir('./uploads',function(err,files){
    /* if(err){
      callback(err,null);
    }else{
      callback(null,files);
    } */
    callback(err,files);
  });

}

// 创建文件夹
exports.createDir = function(dirName,callback){
  fs.mkdir(dirName,function(err){
    callback(err);
  });
}

// 删除文件夹
exports.deleteDir = function(dirName,callback){
  rf(dirName,function(err){
    callback(err);
  });
}

// 获取文件夹中的图片
exports.getPics = function(dirName,callback){
  fs.readdir(dirName,function(err,files){
    callback(err,files);
  });
}

// 删除图片
exports.deletePic = function(path,callback){
  fs.unlink(path,function(err){
    callback(err);
  })
}

// 处理上传的图片
exports.upload = function(oldPath,newPath,callback){
  // 修改图片名称(修改保存路径)
  fs.rename(oldPath,newPath,function(err){
    callback(err);
  });
}
