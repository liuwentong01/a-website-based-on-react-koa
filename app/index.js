const Koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const mongoose = require('mongoose');
const path = require('path');
const app = new Koa();
const routing = require('./routes');
const { connectionStr } = require('./config');

mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true}, () => console.log('MongoDB 连接成功了！'));
mongoose.connection.on('error', console.error);

app.use(koaStatic(path.join(__dirname, 'public')));//生成图片链接
app.use(error({
  postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}));
app.use(koaBody({
  multipart: true,    //可以支持文件格式
  formidable: {
    uploadDir: path.join(__dirname, '/public/uploads'), //设置上传目录
    keepExtensions: true, //保留图片拓展名
  },
}));
app.use(parameter(app));
routing(app);

app.listen(3000, () => console.log('程序启动在 3000 端口了'));