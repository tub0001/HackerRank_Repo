'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the weightedUniformStrings function below.
function weightedUniformStrings(s, queries) {
    let alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase()
    let str = s.split('');
    let arr = [];
    let char;
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
        let weight = alpha.indexOf(str[i]) + 1
        if (str[i] === char) {
            sum++
        } else {
            char = str[i];
            sum = 1
        }
        arr.push(sum * weight)
    }
    return queries.map(q => arr.indexOf(q) > -1 ? 'Yes' : 'No')
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const queriesCount = parseInt(readLine(), 10);

    let queries = [];

    for (let i = 0; i < queriesCount; i++) {
        const queriesItem = parseInt(readLine(), 10);
        queries.push(queriesItem);
    }

    let result = weightedUniformStrings(s, queries);

    ws.write(result.join("\n") + "\n");

    ws.end();
}