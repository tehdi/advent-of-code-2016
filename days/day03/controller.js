const logger = require('../../utilities/logger');
const fsPromises = require('fs').promises;
const path = require('path');

const day = 3;
const testFile = path.join(__dirname, 'testInput.txt');
const testFile2 = path.join(__dirname, 'testInput_2.txt');
const inputFile = path.join(__dirname, 'input.txt');

/*
    In a valid triangle, the sum of any two sides must be larger than the remaining side.
    In your puzzle input, how many of the listed triangles are possible?
*/
const part1 = async (data) => {
    let valids = 0;
    data.trim().split('\n').forEach(line => {
        valids += isValid(line.split(' ')) ? 1 : 0;
    })
    return valids;
}

/*
    Oops, the triangles are actually defined in columns, not rows.
        1 2 3
        4 5 6
        7 8 9
    isn't 123, 456, 789; it's 147, 258, 369.
    Now how many triangles are possible?
*/
const part2 = async (data) => {
    let valids = 0;
    let a = []; let b = []; let c = [];

    data.trim().split('\n').forEach(line => {
        const side_lengths = line.trim().split(/\s+/);
        a.push(side_lengths[0]);
        b.push(side_lengths[1]);
        c.push(side_lengths[2]);

        if (a.length == 3) {
            valids += [isValid(a), isValid(b), isValid(c)].filter(x => x === true).length;
            a = []; b = []; c = [];
        }
    })
    return valids;
}

const isValid = (side_lengths) => {
    const max = Math.max(...side_lengths);
    const others_sum = side_lengths.reduce((a, b) => (+a) + (+b), 0) - max;
    const valid = others_sum > max;
    logger.debug({ 'side_lengths': side_lengths, 'max': max, 'others_sum': others_sum, 'valid': valid });
    return valid;
}

module.exports.test1 = async (request, response) => {
    const data = await fsPromises.readFile(testFile, 'utf8');
    const result = await part1(data);
    response.json({ 'day': day, 'part': 'test 1', 'expected': '0', 'result': result });
}

module.exports.part1 = async (request, response) => {
    const data = await fsPromises.readFile(inputFile, 'utf8');
    const result = await part1(data);
    response.json({ 'day': day, 'part': 1, 'result': result });
}

module.exports.test2 = async (request, response) => {
    const data = await fsPromises.readFile(testFile2, 'utf8');
    const result = await part2(data);
    response.json({ 'day': day, 'part': 'test 2', 'expected': 9, 'result': result });
}

module.exports.part2 = async (request, response) => {
    const data = await fsPromises.readFile(inputFile, 'utf8');
    const result = await part2(data);
    response.json({ 'day': day, 'part': 2, 'result': result });
}
