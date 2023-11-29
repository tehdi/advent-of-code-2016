const logger = require('../../utilities/logger');
const fsPromises = require('fs').promises;
const path = require('path');
var md5 = require('md5');

const day = 5;
const testFile = path.join(__dirname, 'testInput.txt');
const inputFile = path.join(__dirname, 'input.txt');

/*
    The eight-character password for the door is generated one character at a time
    by finding the MD5 hash of some Door ID (your puzzle input)
    and an increasing integer index (starting with 0).

    A hash indicates the next character in the password if
    its hexadecimal representation starts with five zeroes.
    If it does, the sixth character in the hash is the next character of the password.
*/

const logEvery = 250_000;

const part1 = async (data) => {
    let index = 0;
    let password = '';
    data.trim().split('\n').forEach(line => {
        while (password.length < 8) {
            const hashed = md5(line + index);
            if (hashed.startsWith('00000')) {
                password += hashed[5];
                logger.info({ 'index': index, 'hashed': hashed, 'passwordCharacter': hashed[5], 'password': password });
            }
            if (index % logEvery == 0) {
                logger.debug({ 'index': index, 'hashed': hashed, 'password': password });
            }
            index++;
        }
    })
    return password;
}

/*
    The sixth character represents the position (0-7),
    and the seventh character is the character to put in that position.

    A hash result of 000001f means that f is the second character in the password.
    Use only the first result for each position, and ignore invalid positions.
*/
const part2 = async (data) => {
    let index = 0;
    let password = ['', '', '', '', '', '', '', ''];
    data.trim().split('\n').forEach(line => {
        while (true) {
            const hashed = md5(line + index);
            if (hashed.startsWith('00000')) {
                let position = hashed[5];
                if (password[position] === '') {
                    let character = hashed[6];
                    password[position] = character;
                    logger.info({ 'index': index, 'hashed': hashed, 'character': character, 'position': position, 'password': password });
                    if (!password.includes('')) return password.join('');
                }
            }
            index++;
        }
    })
}

module.exports.test1 = async (request, response) => {
    const data = await fsPromises.readFile(testFile, 'utf8');
    const result = await part1(data);
    response.json({ 'day': day, 'part': 'test 1', 'expected': '18f47a30', 'result': result });
}

module.exports.part1 = async (request, response) => {
    const data = await fsPromises.readFile(inputFile, 'utf8');
    const result = await part1(data);
    response.json({ 'day': day, 'part': 1, 'result': result });
}

module.exports.test2 = async (request, response) => {
    const data = await fsPromises.readFile(testFile, 'utf8');
    const result = await part2(data);
    response.json({ 'day': day, 'part': 'test 2', 'expected': '05ace8e3', 'result': result });
}

module.exports.part2 = async (request, response) => {
    const data = await fsPromises.readFile(inputFile, 'utf8');
    const result = await part2(data);
    response.json({ 'day': day, 'part': 2, 'result': result });
}
