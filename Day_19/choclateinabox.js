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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the chocolateInBox function below.
 */
function chocolateInBox(arr) {
    /*
     * Write your code here.
     */
    let ans = 0,
        count = 0

    for (let i = 0; i < arr.length; i++) {
        ans ^= arr[i]
    }
    for (let i = 0; i < arr.length; i++) {
        if ((ans ^ arr[i]) < arr[i]) {
            count++
        }
    }
    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const arrCount = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = chocolateInBox(arr);

    ws.write(result + "\n");

    ws.end();
}
