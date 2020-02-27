const router = require('express').Router({ strict: true });
const controller = require('../controllers/entitiesController');

router
  .route('/')
  .get(controller.getAllEntities)

module.exports = router;
