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

// Complete the beautifulDays function below.
function beautifulDays(i, j, k) {
    var num=0,count=0,happy=0;
        var h=0, sum = 0;
        for (var x = i; x <= j ; x++) {
            num = x;
            sum = 0;
        
            while (num != 0) {
                h = Math.floor(num % 10);
                sum = 10 * sum + h;
                num = Math.floor(num / 10);
            }
        happy = Math.abs(x- sum);
        if (happy % k == 0) {
            count++;
        }
    }
    return count;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const ijk = readLine().split(' ');

    const i = parseInt(ijk[0], 10);

    const j = parseInt(ijk[1], 10);

    const k = parseInt(ijk[2], 10);

    let result = beautifulDays(i, j, k);

    ws.write(result + "\n");

    ws.end();
}
