const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({//数据库里面的数据状态
  __v: { type: Number, select: false },//select是请求列表时是否显示该字段
  name: { type: String, required: true },
  password: { type: String, required: true, select: false },
  avatar_url: { type: String },//头像url
  gender: { type: String, enum: ['male', 'female'], default: 'male', required: true },//性别是可枚举字符串
  headline: { type: String },  //一句话介绍
  locations: { type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }], select: false },//数组类型，数组的每一项也要有类型
  business: { type: Schema.Types.ObjectId, ref: 'Topic', select: false },//行业太多了，让前端枚举
  employments: {//就业经历
    type: [{
      company: { type: Schema.Types.ObjectId, ref: 'Topic' },//type类型是话题引用
      job: { type: Schema.Types.ObjectId, ref: 'Topic' },
    }],
    select: false,
  },
  educations: {//教育经历
    type: [{
      school: { type: Schema.Types.ObjectId, ref: 'Topic' },
      major: { type: Schema.Types.ObjectId, ref: 'Topic' },
      diploma: { type: Number, enum: [1, 2, 3, 4, 5] },//学历枚举类型
      entrance_year: { type: Number },                 //入学年份
      graduation_year: { type: Number },               //毕业年份
    }],
    select: false,
  },
  following: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    select: false,
  },
  followingTopics: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    select: false,
  },
  likingAnswers: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
    select: false,
  },
  dislikingAnswers: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
    select: false,
  },
  collectingAnswers: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
    select: false,
  },
}, { timestamps: true });

module.exports = model('User', userSchema);
