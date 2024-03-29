const Topic = require('../models/topics');
const User = require('../models/users');
const Question = require('../models/questions');

class TopicsCtl {
  async find(ctx) {
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    ctx.body = await Topic   //查找所有话题
      .find({ name: new RegExp(ctx.query.q) })
      .limit(perPage).skip(page * perPage);//limit每次返回多少项，skip是跳过多少项
  }
  async checkTopicExist(ctx, next){//检查话题是否存在
    const topic = await Topic.findById(ctx.params.id);
    if (!topic) { ctx.throw(404, '话题不存在'); }
    await next();
  }
  async findById(ctx) {            //查找一个特定的话题，Topic是model里面导出的
    const { fields = '' } = ctx.query;
    const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('');
    const topic = await Topic.findById(ctx.params.id).select(selectFields);
    ctx.body = topic;
  }
  async create(ctx) {//ctx.verifyParams是对请求体(ctx.request.body)进行校验，
    ctx.verifyParams({
      name: { type: 'string', required: true },
      avatar_url: { type: 'string', required: false },
      introduction: { type: 'string', required: false },
    });
    const topic = await new Topic(ctx.request.body).save();
    ctx.body = topic;
  }
  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      avatar_url: { type: 'string', required: false },
      introduction: { type: 'string', required: false },
    });
    const topic = await Topic.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    ctx.body = topic;
  }
  async listFollowers(ctx) {
    const users = await User.find({ followingTopics: ctx.params.id });
    ctx.body = users;
  }
  async listQuestions(ctx) {
    const questions = await Question.find({ topics: ctx.params.id });
    ctx.body = questions;
  }
}

module.exports = new TopicsCtl();