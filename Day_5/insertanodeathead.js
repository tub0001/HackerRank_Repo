function insertNodeAtHead(head, data) {
    
    const node = new SinglyLinkedListNode(data);
            if(head==null){
                
            head=node;
                return head;
        }
        else{
            node.next=head;
            return node;
        }


}