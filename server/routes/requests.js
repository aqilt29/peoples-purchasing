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
  .post(controller.routeRequestForApproval);

router
  .route('/upload/:id')
  .post(controller.uploadDocument);

router
  .route('/approve/:id')
  .post(controller.approveRequest)

router
  .route('/deny/:id')
  .post(controller.denyRequest)

router
  .route('/user/:userId')
  .get(controller.getRequestsByUser)

router
  .route('/user/:userId/search')
  .get(controller.searchRequests)

module.exports = router;