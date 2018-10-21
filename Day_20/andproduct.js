function processData(input) {
  var stime = Date.now();
  var data = input.split("\n");
  for( var i=0; i < data[0]; i++ ) {
    var numbers = data[i+1].split(" ").map(Number);
    
    // Check each bit
    var result = numbers[0];
    for( var b=0; b<32; b++) {
      var val = 1<<b>>>0;
      if( result & val ) {
        if( (result + val) <= numbers[1] ) {
          result = result & ~val;
        }
      }
    }    
    
    console.log(result >>> 0);
  }
  console.error((Date.now()-stime)/1000);
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