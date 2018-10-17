process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}


let cache = []; 

function getWays(n, c){
    
  
    if(n < 0) return 0;
    if(n == 0) return 1; 
    
    let count = 0; 
    for(let i = 0; i < c.length; i++){
        
        let cacheKey = (n - c[i]) + "-" + c.slice(0, i + 1).join();
        let innerCount = cache[cacheKey]; 
        if(innerCount == undefined){
            innerCount = getWays(n - c[i], c.slice(0, i + 1));
            cache[cacheKey] = innerCount;
        }

        count += innerCount;
    }
    
    return count; 
    
}

function main() {
    var n_temp = readLine().split(' ');
    var n = parseInt(n_temp[0]);
    var m = parseInt(n_temp[1]);
    c = readLine().split(' ');
    c = c.map(Number);
    var ways = getWays(n, c);
    console.log(ways); 
}