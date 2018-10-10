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

// Complete the pangrams function below.
function pangrams(s) {
    var str = s.toLowerCase().replace(/ +/g, "");
    //console.log(str);
    var set = new Set();
    let count = 0;
    for (var i = 0; i < str.length; i++) {
        set.add(str.charAt(i));
    }

    if (set.size == 26) {
        return "pangram";

    }
    else {
        return "not pangram";
    }

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = pangrams(s);

    ws.write(result + "\n");

    ws.end();
}