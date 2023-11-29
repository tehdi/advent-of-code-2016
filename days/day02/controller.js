const logger = require('../../utilities/logger');
const fsPromises = require('fs').promises;
const path = require('path');

const testFile = path.join(__dirname, 'testInput.txt');
const inputFile = path.join(__dirname, 'input.txt');

/*
    There's a keypad that looks like this:
        1 2 3
        4 5 6
        7 8 9
    You start on 5.
    You have multiple lines of instructions that tell you to move in directions.
    If a movement would take you off the keypad, don't move.
    At the end of each line, you'll be on a number.
    String those numbers together.
*/

const part1 = async (data, verbose) => {
    const keypad = [
        [1, 2, 3], // 0
        [4, 5, 6], // 1
        [7, 8, 9]  // 2
    ]
    let position = [1, 1];
    let code = [];
    logger.debug({ 'position': keypad[position[0]][position[1]] })
    data.trim().split('\n').forEach(line => {
        for (const direction of line.split('')) {
            switch (direction) {
                case 'U': position[0] -= 1; break;
                case 'D': position[0] += 1; break;
                case 'L': position[1] -= 1; break;
                case 'R': position[1] += 1; break;
            }
            if (position[0] < 0) position[0] = 0;
            if (position[0] > 2) position[0] = 2;
            if (position[1] < 0) position[1] = 0;
            if (position[1] > 2) position[1] = 2;
            logger.debug({ 'direction': direction, 'newPosition': keypad[position[0]][position[1]] })
        }
        code.push(keypad[position[0]][position[1]]);
    });
    return code;
}

const part2 = async (data) => {
    const one = { value: '1'};
    const two = { value: '2'};
    const three = { value: '3'};
    const four = { value: '4'};
    const five = { value: '5'};
    const six = { value: '6'};
    const seven = { value: '7'};
    const eight = { value: '8'};
    const nine = { value: '9'};
    const a = { value: 'A'};
    const b = { value: 'B'};
    const c = { value: 'C'};
    const d = { value: 'D'};
    /*
            1
          2 3 4
        5 6 7 8 9
          A B C
            D
    */
    one['U'] = one; one['D'] = three; one['L'] = one; one['R'] = one;
    two['U'] = two; two['D'] = six; two['L'] = two; two['R'] = three;
    three['U'] = one; three['D'] = seven; three['L'] = two; three['R'] = four;
    four['U'] = four; four['D'] = eight; four['L'] = three; four['R'] = four;
    five['U'] = five; five['D'] = five; five['L'] = five; five['R'] = six;
    six['U'] = two; six['D'] = a; six['L'] = five; six['R'] = seven;
    seven['U'] = three; seven['D'] = b; seven['L'] = six; seven['R'] = eight;
    eight['U'] = four; eight['D'] = c; eight['L'] = seven; eight['R'] = nine;
    nine['U'] = nine; nine['D'] = nine; nine['L'] = eight; nine['R'] = nine;
    a['U'] = six; a['D'] = a; a['L'] = a; a['R'] = b;
    b['U'] = seven; b['D'] = d; b['L'] = a; b['R'] = c;
    c['U'] = eight; c['D'] = c; c['L'] = b; c['R'] = c;
    d['U'] = b; d['D'] = d; d['L'] = d; d['R'] = d;

    let position = five;
    let code = [];
    data.trim().split('\n').forEach(line => {
        for (const direction of line.split('')) {
            position = position[direction];
        }
        code.push(position.value);
    });
    return code;
}

module.exports.test1 = async (request, response) => {
    const data = await fsPromises.readFile(testFile, 'utf8');
    const result = await part1(data);
    response.json({ 'day': 2, 'part': 'test 1', 'expected': '1985', 'result': result });
}

module.exports.part1 = async (request, response) => {
    const data = await fsPromises.readFile(inputFile, 'utf8');
    const result = await part1(data);
    response.json({ 'day': 2, 'part': 1, 'result': result });
}

module.exports.test2 = async (request, response) => {
    const data = await fsPromises.readFile(testFile, 'utf8');
    const result = await part2(data);
    response.json({ 'day': 2, 'part': 'test 2', 'expected': '5DB3', 'result': result });
}

module.exports.part2 = async (request, response) => {
    const data = await fsPromises.readFile(inputFile, 'utf8');
    const result = await part2(data);
    response.json({ 'day': 2, 'part': 2, 'result': result });
}
