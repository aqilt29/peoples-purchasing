const router = require('express').Router();
const controller = require('./controllers');

router
    .route('/data')
    .get(controller.get);

module.exports = router;