const router = require('express').Router({ strict: true });
const controller = require('../controllers/formsControllers');

router
  .route('/')
  .get(controller.getAllForms)
  .post(controller.createForm)

router
  .route('/:id')
  .get(controller.getFormById)
  .put(controller.updateForm)

router
  .route('/user/:userId')
  .get(controller.getFormsByUser)

router
  .route('/user/:userId/status/:status')
  .get(controller.getFormsByStatus)

module.exports = router;