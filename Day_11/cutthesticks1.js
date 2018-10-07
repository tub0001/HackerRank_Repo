function processData(input) {
    var lines = input.split('\n'),
        length, sticks;

    var myRecFun = function(stickArr) {
        var smallest, tmpArr = [];
        if (stickArr.length > 0) {
            console.log(stickArr.length);
            stickArr = stickArr.sort(function(a, b) {
                return a - b;
            });
            smallest = stickArr[0];
            for (var i in stickArr) {
                if ((stickArr[i] - smallest) > 0) {
                    tmpArr.push(stickArr[i])
                }
            }
            myRecFun(tmpArr);
        }
    };


    length = lines[0];
    sticks = lines[1].split(" ");
    for (var i in sticks) {
        sticks[i] = Number(sticks[i]);
    }
    myRecFun(sticks);

}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function(input) {
    _input += input;
});

process.stdin.on("end", function() {
    processData(_input);
});