function packString(str) {
    let packed = [];

    let lastChar = null;
    for(let i=0; i<str.length; ++i) {
        const ch = str.charAt(i);
        if(ch !== lastChar)  packed[packed.length] = {char: lastChar = ch, count: 1};
        else  ++packed[packed.length - 1].count;
    }

    return packed; // [{char:'a', count:4}, {char:'b', count:2}, ..]
}

function findPalindromeLen(packed, startLeft) { // 'cacbbba'
    let startRight = packed.length - 1;
    let left = startLeft;
    let right = startRight;
    let startDifference = 0;
    
    while(left < right) {
        if((packed[left].char !== packed[right].char) || // different chars
           (left !== startLeft && packed[left].count !== packed[right].count))  { // different count & !beginning
            left = startLeft;
            right = --startRight;
            startDifference = 0;
            continue;
        }

        if(left === startLeft)  startDifference = Math.abs(packed[left].count - packed[right].count);

        if(right === left)  break; // palindrome found
        
        ++left;
        --right;
    }

    let len = 0;
    while(startLeft <= startRight)  len += packed[startRight--].count;
    len -= startDifference;
    return  packed[startLeft].count > len ? packed[startLeft].count : len; // 'abbbbbbcb'
}

function findMaxPalindromeLen(packed) {
    let max = 0;
    for(let i=0; i<packed.length; ++i) {
        const palLen = findPalindromeLen(packed, i);
        if(palLen > max)  max = palLen;
    }

    return max;
}

function rotatePacked(packed) {
    const ch = packed[0].char;

    if(packed[0].count < 2)  packed.splice(0, 1);
    else  --packed[0].count; // remove ch from the beginning

    if(packed[packed.length - 1].char !== ch)  packed[packed.length] = {char: ch, count: 1};
    else  ++packed[packed.length - 1].count; // add ch to the end
}


function processData(input) {
    //Enter your code here
    const str = input.split('\n')[1];
    const pckd = packString(str);
    
    for(let i=0; i<str.length; ++i) {
        console.log( findMaxPalindromeLen(pckd) );
        if(i+1 < str.length) rotatePacked(pckd);
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