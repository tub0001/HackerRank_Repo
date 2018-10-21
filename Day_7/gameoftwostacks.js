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

/////////////// ignore above this line ////////////////////

function main() {
    var g = parseInt(readLine());
    for(var a0 = 0; a0 < g; a0++){
        var n_temp = readLine().split(' ');
        var n = parseInt(n_temp[0]);
        var m = parseInt(n_temp[1]);
        var x = parseInt(n_temp[2]);
        a = readLine().split(' ');
        a = a.map(Number);
        b = readLine().split(' ');
        b = b.map(Number);
        // your code goes here
        
        let sum = 0;
        let sum2 = 0;
        let i = 0;
        let k = 0;
        for (; i<a.length; ++i) { if (sum + a[i] > x) break; sum +=a[i]; }
        for (; k<b.length; ++k) { if (sum2 + b[k] > x) break; sum2 +=b[k]; }
        const items = [].concat(a.slice(0, i).reverse(), b.slice(0, k));
        let ttl = 0;
        let c = 0;
        let v = 0;
        let ret = 0;
        
        for (let j=c; j<items.length; ++j) {
            const item = items[j];
            ttl += item;
            ++v;
            while (ttl > x) {
                ttl -= items[c++];
                --v;
            }
            //console.log(ttl, v);
            ret = ret > v ? ret : v;
        }
        console.log(ret);
    }
    
    // 4 6 10 8 9 9 5
    // 1 2  3 3 4 2 1
}