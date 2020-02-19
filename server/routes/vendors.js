//  vendor related routes
const router = require('express').Router({ strict: true });
const controller = require('../controllers/vendorControllers');

router
  .route('/')
  .post(controller.createVendor)
  .get(controller.getAllVendors);

router
  .route('/:id')
  .delete(controller.deleteVendor)
  .get(controller.getVendorById)
  .patch(controller.modifyVendor);

router
  .route('/search/')
  .get(controller.searchVendors);

module.exports = router;
