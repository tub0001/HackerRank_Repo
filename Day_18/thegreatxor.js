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


function main() {
    var q = parseInt(readLine());
    var x;
    var count;
    var len;
    for(var a0 = 0; a0 < q; a0++){
        x = parseInt(readLine());
        count = 0;
        bin_rev = x.toString(2).split('').reverse();
        len = bin_rev.length;
        for (i = 0; i < len; i++) {
            if (bin_rev[i] === '0') {
                count += Math.pow(2, i);
            }
        }
        console.log(count);
    }

}