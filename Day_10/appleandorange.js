'use strict';

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

// Complete the countApplesAndOranges function below.
function countApplesAndOranges(s, t, a, b, apples, oranges){
    var sum=0,sum1=0;
    let length = Math.max(apples.length, oranges.length)


    for(let i=0; i<length;i++){
      //For APPLES:
        if(typeof apples[i] !== 'undefined'){
    if ((apples[i] + a) >= s && (apples[i] + a) <= t){
        sum++;
        }
    }
     //For ORANGES:
        if(typeof oranges[i] !== 'undefined'){
    if ((oranges[i] + b) >= s && (oranges[i] + b) <= t){
        sum1++;
        }
    }
    }
    console.log(sum);
    console.log(sum1);
}
        
function main() {
    const st = readLine().split(' ');

    const s = parseInt(st[0], 10);

    const t = parseInt(st[1], 10);

    const ab = readLine().split(' ');

    const a = parseInt(ab[0], 10);

    const b = parseInt(ab[1], 10);

    const mn = readLine().split(' ');

    const m = parseInt(mn[0], 10);

    const n = parseInt(mn[1], 10);

    const apples = readLine().split(' ').map(applesTemp => parseInt(applesTemp, 10));

    const oranges = readLine().split(' ').map(orangesTemp => parseInt(orangesTemp, 10));

    countApplesAndOranges(s, t, a, b, apples, oranges);
}