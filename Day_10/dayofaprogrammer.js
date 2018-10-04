'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the dayOfProgrammer function below.
function dayOfProgrammer(year) {
    var sum=215;
        var feb=0;
        if(year>=1700&&year<=1917)
        {
            if(year%4==0)
                {
                feb=29;
                }
            else
                {
                feb=28;
                }
        }
        else if(year==1918)
            {
            feb=15;
            }
        else{
            
        if(year%400==0)
            {
            feb=29;
            }
        else if(year%4==0&&year%100!=0)
            {
            feb=29;
            }
        else
            {
            feb=28;    
            }
        }
        sum+=feb;
        var day=256-sum;
        var res=day+".09."+year;
        return res;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const year = parseInt(readLine().trim(), 10);

    const result = dayOfProgrammer(year);

    ws.write(result + '\n');

    ws.end();
}