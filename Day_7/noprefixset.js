function processData(input) {
    //Enter your code here
    
    var trie = {};
    var bad = null;
    
    function add(str) {
        // Add str to trie or return false if bad set.
        var t = trie;
        var match = false;
        for (var i=0, c; c = str[i]; i++) {
            if (t[c]) {
                // Last element
                if (i == str.length - 1) return false;                
            } else {
                t[c] = {};
            }
            if (t._end) return false;
            t = t[c];
        }
        t._end = true;
        return true;
    }
    
    input.split('\n')
        .forEach(function(value, index) {
            // N
            if (index === 0) return;
            if (!bad && !add(value)) {
                bad = value;
                return;
            }
        });
    
    if (bad) {
        console.log('BAD SET');
        console.log(bad);
    } else {
        console.log('GOOD SET');
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