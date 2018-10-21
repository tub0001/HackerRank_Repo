
function runGame(n, board) {
    var x = board.slice(0,n);
    x = x.map(function (a,i) {return Math.abs(a-board[i+n])-1;});
    return x.reduce(function (a,b) { return a^b; }) ? "player-2" : "player-1";
}

function processData(input) {
    var input_ary = input.split("\n");
    var idx=1;
    for (var i=0; i<parseInt(input_ary[0]); i++) {
        var boardSize = parseInt(input_ary[idx]);
        var board = input_ary.slice(idx+1, idx+1+boardSize*2);
        board = board.map(function(a) {return parseInt(a);});
        console.log(runGame(boardSize, board));
        idx += 2*boardSize+1;
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