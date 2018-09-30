function deleteNode(head, position) {
        var node,current;
        current=head;
        if(position==0){
            head=head.next;    
        }
        else{
        for(var i=0;i<position-1;i++){
            current=current.next;
        }
        node=current.next;
        current.next=node.next;
        }
       
        return head;

}