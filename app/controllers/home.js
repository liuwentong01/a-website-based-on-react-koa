const path = require('path');
class HomeCtl {
  index(ctx) {
    ctx.body = '<h1>这是主页</h1>';
  }
  upload(ctx) {
    const file = ctx.request.files.file;
    const basename = path.basename(file.path);//得到文件名+拓展名
    ctx.body = { url: `${ctx.origin}/uploads/${basename}` };//生成图片链接
  }
}

module.exports = new HomeCtl();