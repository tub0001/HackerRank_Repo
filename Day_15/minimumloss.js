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

// Complete the minimumLoss function below.
function minimumLoss(price) {
    var n = price.length;
    var prices = price.map((v, i) => ({ v, i }));
    prices.sort((a, b) => a.v - b.v);
    var min = Number.MAX_VALUE;
    for (var i = 1; i < n; i++) {
        var prev = prices[i - 1];
        var curr = prices[i];
        if (curr.i < prev.i && (curr.v - prev.v) < min) {
            min = curr.v - prev.v;
        }
    }
    return min;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const price = readLine().split(' ').map(priceTemp => parseInt(priceTemp, 10));

    let result = minimumLoss(price);

    ws.write(result + "\n");

    ws.end();
}
