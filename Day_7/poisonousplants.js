Array.prototype.peek = function() {
    return this[this.length -1];
}

Array.prototype.isEmpty = function() {
    return this.length === 0;
}

function processData(input) {
    var pesticides = input.split('\n')[1].split(' ').map(Number);
    var plants = [];
    var maxDaysAlive = 0;

    for (var i=0; i < pesticides.length; i++) {
        var daysAlive = 0;
        while (!plants.isEmpty() && pesticides[i] <= plants.peek().value){
            daysAlive = Math.max(daysAlive, plants.pop().days);
        }

        daysAlive = plants.isEmpty() ? 0 : daysAlive + 1;
        maxDaysAlive = Math.max(maxDaysAlive, daysAlive);
        plants.push({value : pesticides[i], days :daysAlive});
    }

    console.log(maxDaysAlive);
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