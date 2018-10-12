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

// Complete the isValid function below.
function isValid(s) {
    
       var hm=new Map();
       
        for(var i=0;i<s.length;i++)
        {
            if(hm.get(s[i])!=null)
            {
                var value1=hm.get(s[i]);
                hm.set(s[i],value1+1);
            }
            else
            {
                hm.set(s[i],1);
            }
        }
        
        var arr=Array.from(hm);
        if(arr.length==1)
        {
            return "YES";
        }
        console.log(arr);
        var firstEntry=arr[0];
        var first=firstEntry[1];
        for(var k=1;k<arr.length;k++)
        {
            var entry=arr[k];
            var key=entry[0];
            var value=entry[1];
            if(value==1)
                {
                    arr.splice(k,1);
                    break;
                }
            if(first==1)
                {
                    var index=arr.indexOf(firstEntry);
                    arr.shift();
                    break;
                }
            else
                {
                    if(value%2==1&&first!=value)
                        {
                            var arr1=[];
                            arr1.push(key);
                            arr1.push(value-1);
                            arr[k]=arr1;
                            break;
                            
                        }
                }
        }
    
    
       
      
     
         var values = new Set();
    for(var l=0;l<arr.length;l++)
        {
            var arrap=arr[l];
            values.add(arrap[1]);
        }
        
        if(values.size==1)
        {
            return "YES";
        }
        else
        {
            return "NO";
        }
        


}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = isValid(s);

    ws.write(result + "\n");

    ws.end();
}