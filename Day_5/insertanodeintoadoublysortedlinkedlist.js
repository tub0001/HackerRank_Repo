// Complete the sortedInsert function below.

/*
 * For your reference:
 *
 * DoublyLinkedListNode {
 *     int data;
 *     DoublyLinkedListNode next;
 *     DoublyLinkedListNode prev;
 * }
 *
 */
function sortedInsert(head, data) {
        const node = new DoublyLinkedListNode(data);
        
        if (head == null) {
            head = node;
        } 
    else if ((head.data >=node.data)) {
        head.prev = node;
        node.next = head;  
        head = node; 
    } 
  
    else { 
        
        var current = head;
        
            while (current.next != null &&  
               current.next.data < node.data) 
                current = current.next; 
  
        node.next = current.next; 
  
        if (current.next != null) 
            node;
        current.next = node; 
        node.prev = current; 
    } 

return head;

}