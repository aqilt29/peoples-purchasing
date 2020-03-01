const router = require('express').Router({ strict: true });
const controller = require('../controllers/itemController');

router
  .route('/:id/:docId')
  .get(controller.getItemById)

module.exports = router;