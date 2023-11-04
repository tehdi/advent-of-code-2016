/**
 * @swagger
 * tags:
 *   name: Day 1
 * components:
 *   schemas:
 *     Response:
 *       type: object
 *       required:
 *         - day
 *         - value
 *       properties:
 *         day:
 *           type: int
 *         value:
 *           type: int
 *       example:
 *         day: 1
 *         value: 12345
 */

const express = require('express');
const controller = require('./controller');
const router = express.Router();

/**
 * @swagger
 * /day01/test1:
 *   get:
 *     summary: Test Day 1 Part 1
 *     tags: [Day 1]
 *     responses:
 *       200:
 *         description: Success!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 */
router.route('/test1')
    .get(controller.test1);

/**
 * @swagger
 * /day01/test2:
 *   get:
 *     summary: Test Day 1 Part 2
 *     tags: [Day 1]
 *     responses:
 *       200:
 *         description: Success!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 */
router.route('/test2')
    .get(controller.test2);

/**
 * @swagger
 * /day01/part1:
 *   get:
 *     summary: Run Day 1 Part 1
 *     tags: [Day 1]
 *     responses:
 *       200:
 *         description: Success!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       501:
 *         description: Not implemented
 */
router.route('/part1')
    .get(controller.part1);

/**
 * @swagger
 * /day01/part2:
 *   get:
 *     summary: Run Day 1 Part 2
 *     tags: [Day 1]
 *     responses:
 *       200:
 *         description: Success!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       501:
 *         description: Not implemented
 */
router.route('/part2')
    .get(controller.part2);

module.exports = router;
