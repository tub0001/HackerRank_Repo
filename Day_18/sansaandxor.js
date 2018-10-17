function processData(input) {
    var inputs = input.split("\n");
    var T = Number.parseInt(inputs[0]);
    for(var i=1; i<2*T; i+=2){
        var N = Number.parseInt(inputs[i]);
        var arr = inputs[i+1].split(" ");
        var nums = arr.map(function(a){
            return Number.parseInt(a);
        });
        if(nums.length %2 ==0) console.log(0);
        else{
            var xor = 0;
            for(j=0; j<nums.length; j+=2){
                xor ^= nums[j];
            }
            console.log(xor);
        }
    }
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