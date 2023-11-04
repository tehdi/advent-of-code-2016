const logger = require('../../utilities/logger');
const fsPromises = require('fs').promises;
const path = require('path');

/*
start at the given coordinates (where you just landed) and face North
follow the provided sequence:
    either turn left (L) or right (R) 90 degrees
    then walk forward the given number of blocks
How many blocks away is Easter Bunny HQ?

Example:
    start facing N. R2, L3 => 5 blocks away
    R2, R2, R2 => 2 blocks away, due South
    R5, L5, R5, R3 => 12 blocks away
*/

const testFile = path.join(__dirname, 'testInput.txt');
const inputFile = path.join(__dirname, 'input.txt');

const turns = {
    'N': { 'R': 'E', 'L': 'W' },
    'E': { 'R': 'S', 'L': 'N' },
    'S': { 'R': 'W', 'L': 'E' },
    'W': { 'R': 'N', 'L': 'S' }
}
const axes = {
    'N': 1, 'E': 0, 'S': 1, 'W': 0
}
const signs = {
    'N': 1, 'E': 1, 'S': -1, 'W': -1
}


class Position {
    constructor(x, y) {
        this.position = [x, y];
    }
    move(axis, steps) {
        this.position[axis] += steps;
    }
    getKey() {
        return `X${this.position[0]},Y${this.position[1]}`;
    }
}

const part1 = async (data) => {
    let endPositions = [];
    data.trim().split('\n').forEach(line => {
        let position = new Position(0, 0);
        let facingDirection = 'N';
        logger.debug({ 'startingFacing': facingDirection, 'startingPosition': position.position });
        line.split(', ').forEach(move => {
            let turnDirection = move[0];
            let steps = move.slice(1);
            facingDirection = turn(facingDirection, turnDirection);
            position.move(getAxis(facingDirection), steps * getSign(facingDirection));
            // logger.debug({ 'move': move, 'newFacing': facingDirection, 'newPosition': position.position });
        });
        logger.debug({ 'position': position.position, 'line': line });
        endPositions.push(position.position.reduce((a, b) => Math.abs(a) + Math.abs(b), 0));
    });
    return endPositions;
}

const part2 = async (data) => {
    let endPositions = [];
    data.trim().split('\n').forEach(line => {
        let positionsVisited = new Set();
        let position = new Position(0, 0);
        let facingDirection = 'N';
        // logger.debug({ 'startingFacing': facingDirection, 'startingPosition': position.position });
        for (const move of line.split(', ')) {
            let turnDirection = move[0];
            let steps = move.slice(1);
            facingDirection = turn(facingDirection, turnDirection);
            let axis = getAxis(facingDirection);
            let direction = getSign(facingDirection);
            let retraced = false;
            for (let i = 0; i < steps; i++) {
                position.move(axis, direction);
                if (positionsVisited.has(position.getKey())) {
                    endPositions.push(position.position.reduce((a, b) => Math.abs(a) + Math.abs(b), 0));
                    retraced = true;
                    break;
                } else {
                    positionsVisited.add(position.getKey());
                }
            }
            logger.debug({ 'move': move, 'newFacing': facingDirection, 'newPosition': position.position })
            if (retraced) break;
        }
    });
    return endPositions;
}

const turn = (facingDirection, turnDirection) => turns[facingDirection][turnDirection]
const getAxis = (direction) => axes[direction]
const getSign = (direction) => signs[direction]

module.exports.test1 = async (request, response) => {
    logger.info('Testing Day 1 Part 1');
    const data = await fsPromises.readFile(testFile, 'utf8');
    const result = await part1(data);
    response.json({ 'day': 1, 'part': 'test 1', 'result': result });
}

module.exports.part1 = async (request, response) => {
    logger.info('Running Day 1 Part 1');
    const data = await fsPromises.readFile(inputFile, 'utf8');
    const result = await part1(data);
    response.json({ 'day': 1, 'part': 1, 'result': result });
}

module.exports.test2 = async (request, response) => {
    logger.info('Testing Day 1 Part 2');
    const data = await fsPromises.readFile(testFile, 'utf8');
    const result = await part2(data);
    response.json({ 'day': 1, 'part': 'test 2', 'result': result });
}

module.exports.part2 = async (request, response) => {
    logger.info('Running Day 1 Part 2')
    const data = await fsPromises.readFile(inputFile, 'utf8');
    const result = await part2(data);
    response.json({ 'day': 1, 'part': 2, 'result': result });
}
