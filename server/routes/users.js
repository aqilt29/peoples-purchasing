//  user related routes
const router = require('express').Router({ strict: true });
const controller = require('../controllers/userControllers');

router
  .route('/')
  .post(controller.createUser)
  .get(controller.getAllUsers);

router
  .route('/:Id')
  .get(controller.getUserById)
  .patch(controller.modifyUser);

router
  .route('/search/')
  .get(controller.searchUsers);

module.exports = router;
