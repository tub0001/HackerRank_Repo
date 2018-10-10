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

// Complete the minimumNumber function below.
function minimumNumber(n, password) {
    // Return the minimum number of characters to make the password strong
    var lc = 0, uc = 0, no = 0, sc = 0;
    var sum = 0;

    var lowercase = ".*[a-z]+.*";
    var uppercase = ".*[A-Z]+.*";
    var num = ".*[0-9]+.*";
    var specialchar = ".*[-!@#$%^&*()+]+.*";
    //Regex for pattern matching

    if (!(password.match(lowercase)))
        lc++;
    //if there is no match to a lowercase,"lc" is increased by 1.

    if (!(password.match(uppercase)))
        uc++;
    //if there is no match to an uppercase,"uc" is increased by 1.

    if (!(password.match(num)))
        no++;
    //if there is no match to a number,"no" is increased by 1.

    if (!(password.match(specialchar)))
        sc++;
    //if there is no match to a specialCharacter,"sc" is increased by 1.


    sum = lc + uc + sc + no;

    return (sum > (6 - n)) ? sum : (6 - n);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const password = readLine();

    let answer = minimumNumber(n, password);

    ws.write(answer + "\n");

    ws.end();
}