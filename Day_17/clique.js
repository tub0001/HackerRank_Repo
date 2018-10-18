function processData(input) {
    //Enter your code here
    input = input.split("\n");
    var n = parseInt(input.shift());
    
    for(var i = 0; i < input.length; i++){
        var arr = input[i].split(" ");
        var nodes = parseInt(arr[0]);
        var edges = parseInt(arr[1]);
        var r = nodes - 1;
        /*
        if (edges == (nodes*(nodes-1)/2)) {
          console.log(nodes);
          continue;
        }
        */
        while(true){
            var m = (1/2)*(Math.pow(nodes,2)-(nodes%r)*(Math.pow(Math.ceil(nodes/r),2)) 
                    - (r - (nodes % r)) * (Math.pow(Math.floor(nodes/r),2)));
            if(edges > m){
                console.log(r + 1);
                break;   
            }else{
                r--;
            }
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