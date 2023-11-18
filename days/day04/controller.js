const logger = require('../../utilities/logger');
const fsPromises = require('fs').promises;
const path = require('path');

const day = 4;
const testFile = path.join(__dirname, 'testInput.txt');
const inputFile = path.join(__dirname, 'input.txt');

/*
    Each room consists of:
        an encrypted name (lowercase letters separated by dashes)
        followed by a dash
        a sector ID (numbers)
        and a checksum in square brackets.
    A room is real (not a decoy) if the checksum is:
        the five most common letters in the encrypted name
        in order
        with ties broken by alphabetization.
    What is the sum of the sector IDs of the real rooms?
*/
const part1 = async (data) => {
    const validIds = [];
    data.trim().split('\n').forEach(line => {
        const sections = line.replace(']', '').split(/[\[\]\-]/);
        const roomName = sections.slice(0, -2).join('');
        const sectorId = sections[sections.length - 2];
        const checksum = sections[sections.length - 1];
        if (isValid(roomName, checksum)) validIds.push(sectorId);
    })

    logger.debug({ 'sectorIds': validIds });
    return validIds.reduce((a, b) => (+a) + (+b), 0);
}

/*
    To decrypt a room name, rotate each letter forward through the alphabet
    a number of times equal to the room's sector ID.
    A becomes B, B becomes C, Z becomes A, and so on. Dashes become spaces.

    For example, the real name for "qzmt-zixmtkozy-ivhz-343" is "very encrypted name".

    What is the sector ID of the room where North Pole objects are stored?
*/
const part2 = async (data) => {
    const northPoleRooms = {};
    data.trim().split('\n').forEach(line => {
        const sections = line.replace(']', '').split(/[\[\]\-]/);
        const roomName = sections.slice(0, -2).join('');
        const sectorId = +(sections[sections.length - 2]);

        const realName = decryptName(roomName, sectorId);
        if (realName.includes('north')) {
            northPoleRooms[sectorId] = realName;
        }
    });
    return northPoleRooms;
}

const isValid = (roomName, checksum) => {
    const letterFrequency = [...roomName]
        .reduce((a, b) => (a[b] = ++a[b] || 1) && a, {});
    const sortedLetters = Array.from(new Set([...roomName]))
        .toSorted((a, b) => {
            const diff = letterFrequency[b] - letterFrequency[a];
            if (diff === 0) return a < b ? -1 : a > b ? 1 : 0
            return diff
        });

    const calculatedChecksum = sortedLetters.slice(0, 5).join('');
    return checksum === calculatedChecksum;
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const decryptName = (roomName, sectorId) => {
    let decrypted = '';
    const offset = sectorId % 26;
    [...roomName].forEach(letter => {
        if (letter === '-') {
            decrypted += ' ';
        } else {
            const index = alphabet.indexOf(letter);
            const newIndex = index + offset;
            const newLetter = alphabet[newIndex % 26];
            decrypted += newLetter;
        }
    });
    logger.debug({ 'method': 'decryptName', 'roomName': roomName, 'sectorId': sectorId, 'result': decrypted });
    return decrypted;
}

module.exports.test1 = async (request, response) => {
    const data = await fsPromises.readFile(testFile, 'utf8');
    const result = await part1(data, request.query.verbose);
    response.json({ 'day': day, 'part': 'test 1', 'expected': 1514, 'result': result });
}

module.exports.part1 = async (request, response) => {
    const data = await fsPromises.readFile(inputFile, 'utf8');
    const result = await part1(data);
    response.json({ 'day': day, 'part': 1, 'result': result });
}

module.exports.test2 = async (request, response) => {
    const data = await fsPromises.readFile(testFile, 'utf8');
    const result = await part2(data);
    response.json({ 'day': day, 'part': 'test 2', 'result': result });
}

module.exports.part2 = async (request, response) => {
    const data = await fsPromises.readFile(inputFile, 'utf8');
    const result = await part2(data);
    response.json({ 'day': day, 'part': 2, 'result': result });
}
