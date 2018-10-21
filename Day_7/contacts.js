class Trie {
    constructor() {
        this.root = {count:0};
    }
    
    add(name) {
        let node = this.root;
        for(let i = 0; i < name.length; i++) {
            let c = name[i];
            node.count++;
            if (!node[c]) {
                node[c] = {count: 0};
            }
            node = node[c];
        }
        node.count++;
    }
    
    find(name) {
        let node = this.root;
        for (let i = 0; i < name.length; i++) {
            let nextNode = node[name[i]];
            if (nextNode) {
                node = nextNode;
            } else {
                console.log(0);
                return;
            }
        }
        console.log(node.count);
    }
}

function processData(input) {
    let lines = input.split('\n');
    let n = +lines[0];
    let commands = lines.slice(1, n+1);
    let t = new Trie();
    commands.forEach(c => {
        let split = c.split(" ");
        let cmd = split[0];
        let name = split[1];
        if (cmd === "add") {
            t.add(name);
        } else if (cmd === "find") {
            t.find(name);
        }
    })
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