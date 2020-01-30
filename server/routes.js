const router = require('express').Router({ strict: true });
const controller = require('./controllers/formsControllers');

router
  .route('/forms')
  .get(controller.getAllForms)

router
  .route('/form/:id')
  .get(controller.getFormById)

router
  .route('/form/create')
  .post(controller.createForm)



module.exports = router;