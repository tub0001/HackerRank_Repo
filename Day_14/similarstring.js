process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = [];
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();
});

function readLine() {
    return input_stdin_array[input_currentline++];
}


function getDictionary(str, len) {
    var dictionary = [],
        i, j, k, n, c;
    for (i = 0; i < len; ++i) {
        n = 0;
        j = i;
        k = i * 10;

        while (n < 10 && j < len) {
            c = str[j++];
            if (null == dictionary[k + c]) {
                dictionary[k + c] = n++;
            }
        }
    }
    return dictionary;
}


function strToNums(input) {
    var str = [];
    for (var i = 0, len = input.length; i < len; ++i) {
        str.push(input.charCodeAt(i) - 97);
    }
    return str;
}


function buildTree(str, len, dictionary) {
    var root = [],
        node,
        current, next, index, c, i, j;

    for (i = 0; i < len; ++i) {
        current = root;

        for (j = i + 1; j < len; ++j) {
            c = str[j];
            index = dictionary[c + i * 10];
            current = current[index] || (current[index] = (node = [], node[10] = 0, node));
            ++current[10];

            if (j - i > 50) {
                (current[11] = current[11] || []).push(i);
                break;
            }
        }
    }
    return root;
}


function query(tree, dictionary, str, len, li, ri) {
    if (1 === ri - li) {
        return len;
    }

    var current = tree,
        node, positions, i;

    for (i = li + 1; i < ri; ++i) {
        node = current[dictionary[str[i] + li * 10]];
        if (!node) {
            if (!(positions = current[11])) {
                return 1;
            }

            return naiveCount(str, len, dictionary, positions, li, ri);
        }
        if (1 === node[10]) {
            return 1;
        }
        current = node;
    }
    return current[10];
}


function naiveCount(str, len, dictionary, positions, li, ri) {
    var count = 0,
        offset2 = li * 10,
        start = li + 50,
        pos, pLen, i;

    for (i = 0, pLen = positions.length; i < pLen; ++i) {
        pos = positions[i];
        if (pos === li || (pos + ri - li <= len && match(str, dictionary, pos - li, start, ri, pos * 10, offset2))) {
            ++count;
        }
    }
    return count;
}

function match(str, dictionary, pos, start, end, offset1, offset2) {
    for (var j = start; j < end; ++j) {
        if (dictionary[str[pos + j] + offset1] !== dictionary[str[j] + offset2]) {
            return false;
        }
    }
    return true;
}

function main() {
    var tests = +readLine().split(' ')[1],
        str = strToNums(readLine()),
        len = str.length,
        dictionary = getDictionary(str, len),
        tree = buildTree(str, len, dictionary),
        stdout = process.stdout,
        input, i

    // Itearte over the tests
    for (i = 0; i < tests; ++i) {
        input = readLine().split(' ');
        stdout.write(query(tree, dictionary, str, len, (input[0] | 0) - 1, (input[1] | 0)) + "\n");
    }
}

