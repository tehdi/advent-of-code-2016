const logger = require('../../utilities/logger');
const fsPromises = require('fs').promises;
const path = require('path');

const day = 0;
const testFile = path.join(__dirname, 'testInput.txt');
const inputFile = path.join(__dirname, 'input.txt');

/*
    Problem description.
*/

const part1 = async (data) => {
    data.trim().split('\n').forEach(line => {
    })
    return 'part 1';
}

const part2 = async (data) => {
    data.trim().split('\n').forEach(line => {
    })
    return 'part 2';
}

module.exports.test1 = async (request, response) => {
    const data = await fsPromises.readFile(testFile, 'utf8');
    const result = await part1(data, request.query.verbose);
    response.json({ 'day': day, 'part': 'test 1', 'expected': 'value', 'result': result });
}

module.exports.part1 = async (request, response) => {
    const data = await fsPromises.readFile(inputFile, 'utf8');
    const result = await part1(data);
    response.json({ 'day': day, 'part': 1, 'result': result });
}

module.exports.test2 = async (request, response) => {
    const data = await fsPromises.readFile(testFile, 'utf8');
    const result = await part2(data);
    response.json({ 'day': day, 'part': 'test 2', 'expected': 'value', 'result': result });
}

module.exports.part2 = async (request, response) => {
    const data = await fsPromises.readFile(inputFile, 'utf8');
    const result = await part2(data);
    response.json({ 'day': day, 'part': 2, 'result': result });
}
