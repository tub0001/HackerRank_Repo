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

// Complete the commonChild function below.
function commonChild(s1, s2) {
    var matrix = new Array(s1.length);
    for (var i = 0; i < s1.length; i++) {
        matrix[i] = new Array(s1.length);
        for (var j = 0; j < s1.length; j++) {
            var cmp = s1[i] === s2[j];
            var left = j === 0 ? 0 : matrix[i][j - 1];
            var down = i === 0 ? 0 : matrix[i - 1][j];
            var diag = (i === 0 || j === 0) ? 0 : matrix[i - 1][j - 1];
            matrix[i][j] = Math.max(left, down, diag + cmp);
        }
    }

    return matrix[s1.length - 1][s1.length - 1];

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s1 = readLine();

    const s2 = readLine();

    let result = commonChild(s1, s2);

    ws.write(result + "\n");

    ws.end();
}
