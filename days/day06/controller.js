const logger = require('../../utilities/logger');
const fsPromises = require('fs').promises;
const path = require('path');

const day = 0;
const testFile = path.join(__dirname, 'testInput.txt');
const inputFile = path.join(__dirname, 'input.txt');

/*
    Figure out which character is most frequent for each position (column).
    Combine them in order to get the error-corrected message.
*/

const correctMessage = async (data, sortFunction) => {
    let firstLine = true;
    const positions = [];
    data.trim().split('\n').forEach(line => {
        if (firstLine) {
            [...line].forEach(letter => {
                positions.push({});
            })
            firstLine = false;
        }
        for (let index = 0; index < line.length; index++) {
            const letter = line[index];
            const count = positions[index][letter] ?? 0;
            positions[index][letter] = count + 1
        }
    })

    const message = [];
    positions.forEach(position => {
        const sortedLetters = Object.keys(position)
            .toSorted((a, b) => {
                const result = sortFunction(position[a], position[b]);
                return result;
            });
        logger.debug({ 'position': position, 'sorted': sortedLetters });
        message.push(sortedLetters[0]);
    })
    return message.join('');
}

const part1 = async (data) => {
    return correctMessage(data, (a, b) => b - a);
}

/*
    This time it's the least frequent letter in each position.
*/
const part2 = async (data) => {
    return correctMessage(data, (a, b) => a - b);
}

module.exports.test1 = async (request, response) => {
    const data = await fsPromises.readFile(testFile, 'utf8');
    const result = await part1(data);
    response.json({ 'day': day, 'part': 'test 1', 'expected': 'easter', 'result': result });
}

module.exports.part1 = async (request, response) => {
    const data = await fsPromises.readFile(inputFile, 'utf8');
    const result = await part1(data);
    response.json({ 'day': day, 'part': 1, 'result': result });
}

module.exports.test2 = async (request, response) => {
    const data = await fsPromises.readFile(testFile, 'utf8');
    const result = await part2(data);
    response.json({ 'day': day, 'part': 'test 2', 'expected': 'advent', 'result': result });
}

module.exports.part2 = async (request, response) => {
    const data = await fsPromises.readFile(inputFile, 'utf8');
    const result = await part2(data);
    response.json({ 'day': day, 'part': 2, 'result': result });
}
