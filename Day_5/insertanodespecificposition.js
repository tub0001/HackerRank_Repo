function insertNodeAtPosition(head, data, position) {

    const node = new SinglyLinkedListNode(data);
        
        if(head==null)
        {
            head=node;
            return head;
            
        }else{
            var current = head;
            var insert_position=0;
            while(insert_position != (position-1)){
                current = current.next;
                
                insert_position++;
            }
                  node.next=current.next;
                  
                current.next=node;
                  
            return head;
        }

}