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

 const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

/*
 * Complete the letterIslands function below.
 */
function letterIslands(s, k) {

    let g = 0;
    let worked = [];
    let l = s.length / k;
    for(let i = 0; i < l; i++) {
       let str = '';
        for(let n = i; n < l; n++) {
             str += s[n];
            if(worked.indexOf(str) == -1) {
                 worked.push(str);
                
                 if(s.match(new RegExp(`(${str})+`, 'gm')).length == k) { 
                     g++; }
            }
            
        } 
    
    }
    
    return g;
}

function main() {
   

    const s = readLine();

    const k = parseInt(readLine(), 10);

    let result = letterIslands(s, k);

    ws.write(result + "\n");

    ws.end();
}