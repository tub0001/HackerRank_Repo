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

// Complete the gemstones function below.
function gemstones(arr) {
    var s = "abcdefghijklmnopqrstuvwxyz";
    var c = s.split("");
    var res = 0;
    for (var j = 0; j < c.length; j++) {
        var count = 0;
        for (var i = 0; i < arr.length; i++) {
            var str = arr[i];
            if (str.includes(c[j])) {
                count++;
            }
            else {
                break;
            }
        }
        if (count == arr.length) {
            res++;
        }

    }
    return res;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let arr = [];

    for (let i = 0; i < n; i++) {
        const arrItem = readLine();
        arr.push(arrItem);
    }

    let result = gemstones(arr);

    ws.write(result + "\n");

    ws.end();
}
