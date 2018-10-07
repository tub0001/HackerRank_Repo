function processData(input) {
    var inp = input.split("\n");
    var n = parseInt(inp[0].split(" ")[0]);
    var k = parseInt(inp[0].split(" ")[1]);
    var a = inp[1].split(" ");
    a = a.map(Number);
    var modArray = [];
    for(var i=0;i<k;i++){
        modArray[i] = 0;
    }
    
    for(i=0;i<n;i++){
        modArray[a[i]%k]++;
    }
    var size = 0
    for(var i=1;i<Math.ceil(k/2);i++){
        if(modArray[i] > modArray[k-i]){
            size += modArray[i];
        }else{
            size += modArray[k - i];
        }
    }
    if(modArray[0] != 0){
        size++;
    }
    if( k%2 ==0 && modArray[k/2] != 0){
        size++;
    }
    console.log(size);
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});