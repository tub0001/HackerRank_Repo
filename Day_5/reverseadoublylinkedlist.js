*
 * For your reference:
 *
 * DoublyLinkedListNode {
 *     int data;
 *     DoublyLinkedListNode next;
 *     DoublyLinkedListNode prev;
 * }
 *
 */
function reverse(head) {
        var temp = null; 
        var prev = null; 

        var current = head; 
  
        while (current != null) { 
            temp = current.next; 
            current.next = prev;
            current.prev =temp;
            prev=current;
            current = temp;  
        } 
        return prev;
}