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

// Complete the pylons function below.
function pylons(k, arr) {
    var reach = k - 1;
    var count = 0;
    // start at first index
    var i = 0;
    while (i < arr.length) {
        var j = i + reach;
        while (arr[j] !== 1) {
            j--;
            if (i - reach - 1 === j) {
                return -1;
            }
        }
        i = j + reach + 1;
        count++;
    }
    return count; 

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = pylons(k, arr);

    ws.write(result + "\n");

    ws.end();
}
