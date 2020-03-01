const router = require('express').Router({ strict: true });
const controller = require('../controllers/purchaseOrderController');

router
  .route('/')
  .get(controller.getAllPurchaseOrders)
  .post(controller.createPurchaseOrder)

module.exports = router;
