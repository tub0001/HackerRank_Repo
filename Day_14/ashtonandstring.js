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
 * Complete the ashtonString function below.
 */
 function ashtonString(s, k) {
//     var subStrings = [];
//     var val = getAllSubstrings(s);
//     val.sort();
//     var op="";
//     console.log(val);
//     for(let i=0;i<val.length;i++) {
//         op+=val[i];
//     }
    
//     var ans = op.charAt(k-1);
//     return ans;
        
//     }
// function findMin(str){
//     var min = "a";
//     for(let i=0;i<str.length;i++) { 
//         if(str.charAt(i)<min)
//             min = s.charAt(i);
//     }     
//     return min;
// }

// function getAllSubstrings(str) {
//   var i, j, result = [];

//   for (i = 0; i < str.length; i++) {
//       for (j = i + 1; j < str.length + 1; j++) {
//           result.push(str.slice(i, j));
//       }
//   }
//   return result;
     
     
     const set = new Set();
     var index = k; 
        for (let x = 0; x < s.length; x++) {
            for (let y = 1; y <= s.length - x; y++) {
                set.add(s.substr(x, y));
            }
        }
        
        const arr = Array.from(set)
        arr.sort();
        // console.log(arr.join(''));
        // console.log(arr.join('')[index-1]);
         return arr.join('')[index-1];
 }


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const s = readLine();

        const k = parseInt(readLine(), 10);

        let res = ashtonString(s, k);

        ws.write(res + "\n");
    }

    ws.end();
}