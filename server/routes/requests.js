const router = require('express').Router({ strict: true });
const controller = require('../controllers/requestControllers');

router
  .route('/preapprove/:id')
  .get(controller.approvePurchaseRequest)

router
  .route('/')
  .get(controller.getAllRequests)
  .post(controller.createRequest)

router
  .route('/search')
  .post(controller.searchRequests)

router
  .route('/:id')
  .get(controller.getRequestById)
  .put(controller.updateRequest)
  .post(controller.routeRequestForApproval);

router
  .route('/upload/:id')
  .post(controller.uploadDocument);

router
  .route('/approved/nopo')
  .post(controller.getApprovedRequestsWithoutPo)

  router
  .route('/approved')
  .get(controller.getApprovedRequests)

router
  .route('/approve/:id')
  .post(controller.approveRequest)

router
  .route('/deny/:id')
  .post(controller.denyRequest)

router
  .route('/user/:userId')
  .get(controller.getRequestsByUser)


module.exports = router;