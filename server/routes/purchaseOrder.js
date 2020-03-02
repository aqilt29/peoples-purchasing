const router = require('express').Router({ strict: true });
const controller = require('../controllers/purchaseOrderController');

router
  .route('/')
  .get(controller.getAllPurchaseOrders)
  .post(controller.createPurchaseOrder)

router
  .route('/search')
  .post(controller.searchPoById)

router
  .route('/:id')
  .get(controller.getPoById)

module.exports = router;
