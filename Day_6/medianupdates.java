import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

class Solution{
    /* Head ends here*/
    
            static List<Long> list = new ArrayList<Long>();
    
    public static void updateMedian(String input, long value) {
        int index = Collections.binarySearch(list, value);
        if(input.equalsIgnoreCase("r")) {
            if(index < 0) {
                System.out.println("Wrong!");
                return;
            }
            else{
                list.remove(index);
            }
        }
        else {
            if(index < 0) {
                list.add(- index - 1, value);
            }
            else {
                list.add(index, value);
            }
        }
        
        if(list.size() == 0) {
            System.out.println("Wrong!");
        }
        else if (list.size() % 2 == 0) {
            long median = (list.get(list.size() / 2) + list.get(list.size() / 2 - 1));
            if(median % 2 != 0) {
                System.out.printf("%.1f", median/2.0);
                System.out.println();
            }
            else {
                System.out.println(median / 2);
            }
        }
        else {
            System.out.println(list.get((list.size() - 1)/2));
        }
    }
    
    
    static void median(String a[],int x[]) {
        
        for(int i = 0; i < a.length; i++) {
            updateMedian(a[i], x[i]);
        }
        
        
    }
    
    /* Tail starts here*/
    
   public static void main( String args[] ) {
      

      Scanner in = new Scanner(System.in);
      
      int N;
      N = in.nextInt();
   
      String s[] = new String[N];
      int x[] = new int[N];
      
      for(int i=0; i<N; i++){
         s[i] = in.next();
         x[i] = in.nextInt();
      }
   
      median(s,x);
    }
}