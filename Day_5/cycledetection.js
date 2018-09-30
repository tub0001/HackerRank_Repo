'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

const SinglyLinkedListNode = class {
    constructor(nodeData) {
        this.data = nodeData;
        this.next = null;
    }
};

const SinglyLinkedList = class {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    insertNode(nodeData) {
        const node = new SinglyLinkedListNode(nodeData);

        if (this.head == null) {
            this.head = node;
        } else {
            this.tail.next = node;
        }

        this.tail = node;
    }
};

function printSinglyLinkedList(node, sep, ws) {
    while (node != null) {
        ws.write(String(node.data));

        node = node.next;

        if (node != null) {
            console.log(sep);
        }
    }
}


function hasCycle(head) {
    
 var set = [];
        var current = head;
        
        while(current!=null){
            if(!set.includes(current)){
                set.push(current);
                current=current.next;
            }
            else{
                return  true;
            }
        }
    
        return false;

}


function main() {

    const tests = parseInt(readLine(), 10);

    for (let testsItr = 0; testsItr < tests; testsItr++) {
        const index = parseInt(readLine(), 10);

        const llistCount = parseInt(readLine(), 10);

        let llist = new SinglyLinkedList();

        for (let i = 0; i < llistCount; i++) {
            const llistItem = parseInt(readLine(), 10);
            llist.insertNode(llistItem);
        }
      
      	var extra = new SinglyLinkedListNode(-1);
        var temp = llist.head;

        for (let i = 0; i < llistCount; i++) {
          	if (i == index) {
            	extra = temp;
          	}

          	if (i != llistCount-1) {
            	temp = temp.next;
          	}
        }

        temp.next = extra;

        let result = hasCycle(llist.head);

        console.log((result ? 1 : 0) + "\n");
    }

}