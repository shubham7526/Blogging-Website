const {save} = require('../controllers/contact');

module.exports = (router) => {
  router.post('/contact', save);
};
