function processData(input) {
    //Enter your code here
      var arr = input.split("\n");
    var s = "";
    var undo = [];
    for(var cnt=1; cnt<arr.length; cnt++) {
        var data = arr[cnt].split(" ");
        switch(data[0]) {
            case "1":
                undo.push(s);
                s += data[1]; 
                break;
            case "2":
                undo.push(s);
                s = s.slice(0, s.length-parseInt(data[1])); 
                break;
            case "3": 
                console.log(s.charAt(parseInt(data[1])-1)); 
                break;
            case "4": 
                s = undo[undo.length-1];
                undo.pop();
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
