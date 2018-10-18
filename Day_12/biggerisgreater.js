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

// Complete the biggerIsGreater function below.
function biggerIsGreater(str) {
    
     var wlen = str.length;
    var n = 0;
    var i = -1;
    var j = -1;

    while (n < wlen - 1) {
        if (str.charAt(n) < str.charAt(n + 1)) {
            i = n;
        }
        n++;
    }

    n = 0;
    while (n < wlen) {
        if (str.charAt(i) < str.charAt(n)) {
            j = n;
        }
        n++;
    }

    if (j === -1 || i === -1) {
        return 'no answer';
    } else {
        var letters = str.split('');
        var tmp = letters[i];

        letters[i] = letters[j];
        letters[j] = tmp;

        return letters.slice(0, i + 1).concat(letters.slice(i + 1).sort()).join("");
    }


}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const T = parseInt(readLine(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const w = readLine();

        let result = biggerIsGreater(w);

        ws.write(result + "\n");
    }

    ws.end();
}