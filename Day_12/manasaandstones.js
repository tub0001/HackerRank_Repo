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

// Complete the stones function below.
function stones(n, a, b) {
    var arrStones = [];
    for (var i = 0; i < n; i++) {
        var temp = a * ((n - 1) - i) + b * i;
        arrStones[i] = temp;
    }
    arrStones.sort(function (p, q) { return p - q });
    return arrStones;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const T = parseInt(readLine(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const n = parseInt(readLine(), 10);

        const a = parseInt(readLine(), 10);

        const b = parseInt(readLine(), 10);

        let result = stones(n, a, b);

        ws.write(result.join(" ") + "\n");
    }

    ws.end();
}