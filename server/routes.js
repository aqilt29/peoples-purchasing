const router = require('express').Router();
const controller = require('./controllers');

router
    .route('/data')
    .get(controller.get)
    .post(controller.post)

module.exports = router;