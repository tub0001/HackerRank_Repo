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
    var T = parseInt(readLine());
    for(var a0 = 0; a0 < T; a0++){
        var n = parseInt(readLine());
        a = readLine().split(' ');
        a = a.map(Number);
        // your code goes here
        var sb = 0;
        var sk1 = 0;
        var sk2 = 0;
        for(var i=0;i<a.length;i++){
            if(a[i]%3==0){
                sb++;
            }
            else if(a[i]%3==1){
                sk1++;
            } 
            else if(a[i]%3==2){
                sk2++;
            } 
        }
        if(sk1%2==0 && sk2%2==0){
            console.log("Koca");
        }
        else{
            console.log("Balsa");
        }
    }

}