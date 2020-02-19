//  vendor related routes
const router = require('express').Router({ strict: true });
const controller = require('../controllers/vendorControllers');

router
  .route('/')
  .post(controller.createVendor)
  .get(controller.getAllVendors);

router
  .route('/delete/:id')
  .post(controller.deleteVendor)

router
  .route('/:id')
  .get(controller.getVendorById)
  .patch(controller.modifyVendor);

router
  .route('/search/')
  .get(controller.searchVendors);

module.exports = router;
