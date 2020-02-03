//  user related routes
const router = require('express').Router({ strict: true });
const controller = require('../controllers/userControllers');

router
  .route('/')
  .post(controller.createUser)
  .patch(controller.modifyUser)
  .get(controller.getAllUsers);

router
  .route('/search')
  .get(controller.searchUsers);

module.exports = router;
