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

// Complete the anagram function below.
function anagram(q, s) {
    if (s.length % 2 != 0) {
        return -1;
    }
    else {
        var s1 = s.substring(0, s.length / 2);
        var s11 = s1.split("");
        var s2 = s.substring(s.length / 2);
        var count = 0;
        for (var i = 0; i < s1.length; i++) {
            if (!s2.includes(s11[i])) {
                count++;
            }
            else {
                var index = s2.indexOf(s11[i]);


                s2 = s2.substring(0, index) + s2.substring(index + 1);

            }

        }
        return count;
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        let result = anagram(q, s);

        ws.write(result + "\n");
    }

    ws.end();
}
