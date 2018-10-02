// Complete the mergeLists function below.

/*
 * For your reference:
 *
 * SinglyLinkedListNode {
 *     int data;
 *     SinglyLinkedListNode next;
 * }
 *
 */
function mergeLists(head1, head2) {
        var current1=head1;
        var current2=head2;
        
        if(current1==null){
            return current2;
        }
         if(current2==null){
            return current1;
        }
        if(current1.data > current2.data){
          current2.next = mergeLists(current1,current2.next);
                return current2;
            }
            else{
            current1.next = mergeLists(current1.next,current2);
                return current1;
        }
}