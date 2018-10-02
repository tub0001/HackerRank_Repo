// Complete the getNode function below.

/*
 * For your reference:
 *
 * SinglyLinkedListNode {
 *     int data;
 *     SinglyLinkedListNode next;
 * }
 *
 */
function getNode(head, positionFromTail) {
        var count=0;
        var current = head;
    
        while(current!=null){
            current=current.next;
            count++;
        }    
        var newposition = count - positionFromTail;
    
            var i=0;
            while(i!=(newposition-1)){
                head = head.next;
                i++;
            }
            return head.data;   

}