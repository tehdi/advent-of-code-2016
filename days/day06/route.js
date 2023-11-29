const controller = require('./controller');
const router = require('express').Router();

router.route('/test1')
    .get(controller.test1);

router.route('/test2')
    .get(controller.test2);

router.route('/part1')
    .get(controller.part1);

router.route('/part2')
    .get(controller.part2);

module.exports = router;
