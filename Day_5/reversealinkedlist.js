// Complete the reverse function below.

/*
 * For your reference:
 *
 * SinglyLinkedListNode {
 *     int data;
 *     SinglyLinkedListNode next;
 * }
 *
 */
function reverse(head) {
    var prev_Node=null;
    var nextNode;
        while(head!=null)
        {
            nextNode=head.next;
            head.next=prev_Node;
            prev_Node=head;
            head=nextNode;
        }
        return prev_Node;

}