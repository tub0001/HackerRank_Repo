function processData(input) {
    //Enter your code here
    var lines = input.split('\n');
  var queue = [];
  for (var i = 1; i < lines.length; i++) {
    var type = parseInt(lines[i].split(' ')[0]);
    var num = parseInt(lines[i].split(' ')[1]);
    if (type === 1) {
      queue.push(num);
    } else if (type === 2) {
      queue.shift();
    } else if (type === 3) {
      console.log(queue[0]);
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
