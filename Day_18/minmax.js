'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the maxMin function below.
function maxMin(k, arr) {
    arr.sort(function (a, b) { return a - b; });

    var minFair = Infinity;
    for (var i = 0; i + k <= arr.length; i++) {
        var min = arr[i],
            max = arr[i + k - 1],
            fair = max - min;
        if (fair < minFair) {
            minFair = fair;
        }
    }

    console.log(minFair);
    return minFair;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const k = parseInt(readLine(), 10);

    let arr = [];

    for (let i = 0; i < n; i++) {
        const arrItem = parseInt(readLine(), 10);
        arr.push(arrItem);
    }

    const result = maxMin(k, arr);

    ws.write(result + '\n');

    ws.end();
}
