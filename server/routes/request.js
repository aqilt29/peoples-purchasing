const router = require('express').Router({ strict: true });
const controller = require('../controllers/requestControllers');

router
  .route('/')
  .get(controller.getAllRequests)
  .post(controller.createRequest)

router
  .route('/:id')
  .get(controller.getRequestById)
  .put(controller.updateRequest)

router
  .route('/user/:userId')
  .get(controller.getRequestsByUser)

router
  .route('/user/:userId/search')
  .get(controller.searchRequests)

module.exports = router;