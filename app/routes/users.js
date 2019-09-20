const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
const {
  find, findById, create, update,
  delete: del, login, checkOwner,
  listFollowing, listFollowers,
  checkUserExist, follow, unfollow,
  listFollowingTopics, followTopic, unfollowTopic,
  listQuestions,
  listLikingAnswers, likeAnswer, unlikeAnswer,
  listDislikingAnswers, dislikeAnswer, undislikeAnswer,
  listCollectingAnswers, collectAnswer, uncollectAnswer,
} = require('../controllers/users');

const { checkTopicExist } = require('../controllers/topics');
const { checkAnswerExist } = require('../controllers/answers');

const { secret } = require('../config');

const auth = jwt({ secret });//token认证

router.get('/', find);
router.post('/', create);//新建用户
router.get('/:id', findById); //查找特定用户
router.patch('/:id', auth, checkOwner, update);//更新用户
router.delete('/:id', auth, checkOwner, del);  //删除用户
router.post('/login', login);//登陆

router.get('/:id/following', listFollowing);//关注者列表
router.get('/:id/followers', listFollowers);//粉丝列表
router.put('/following/:id', auth, checkUserExist, follow);     //关注
router.delete('/following/:id', auth, checkUserExist, unfollow);//取关

router.get('/:id/followingTopics', listFollowingTopics);
router.put('/followingTopics/:id', auth, checkTopicExist, followTopic);
router.delete('/followingTopics/:id', auth, checkTopicExist, unfollowTopic);

router.get('/:id/questions', listQuestions);
router.get('/:id/likingAnswers', listLikingAnswers);
router.put('/likingAnswers/:id', auth, checkAnswerExist, likeAnswer, undislikeAnswer);
router.delete('/likingAnswers/:id', auth, checkAnswerExist, unlikeAnswer);
router.get('/:id/dislikingAnswers', listDislikingAnswers);
router.put('/dislikingAnswers/:id', auth, checkAnswerExist, dislikeAnswer, unlikeAnswer);
router.delete('/dislikingAnswers/:id', auth, checkAnswerExist, undislikeAnswer);
router.get('/:id/collectingAnswers', listCollectingAnswers);
router.put('/collectingAnswers/:id', auth, checkAnswerExist, collectAnswer);
router.delete('/collectingAnswers/:id', auth, checkAnswerExist, uncollectAnswer);

module.exports = router;