function processData(input) {
    var lines = input.split('\n');
    for(var i = 1; i < lines.length; i++) {
        var str = lines[i];
        var stack = [];
        var balanced = true;
        for(var j = 0; j < str.length; j++) {
            var c = str[j];
            if(c === '{' || c === '[' || c === '(' ) {
                stack.push(c);
            } else {
                var bracket = stack.pop();
                if( bracket !== '{' && c === '}') {
                    balanced = false;
                    j = str.length;
                } else if(bracket !== '[' && c === ']') {
                    balanced = false;
                    j = str.length;
                } else if(bracket !== '(' && c === ')') {
                    balanced = false;
                    j = str.length;
                }
            }
        }
        if(balanced && stack.length === 0) {
            console.log('YES');
        } else {
            console.log('NO');
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