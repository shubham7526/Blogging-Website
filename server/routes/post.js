const { save, remove, getlistById, getList } = require('../controllers/post');

module.exports = (router) => {
  router.post('/post', save);
  router.get('/myposts', getlistById);
  router.get('/posts', getList);
  router.delete('/post/:publicId', remove);
};
