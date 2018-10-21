import java.io.*;
import java.util.*;

public class Solution {
    private ArrayList<Long> maxN;
    
    public static void main(String[] args) {
        Solution solver = new Solution();
        Scanner in = new Scanner(System.in);
        int t = in.nextInt();
        for (int i = 0; i < t; ++i) {
            long N = in.nextLong();
            System.out.println(solver.getAnswer(N));
        }
    }
    
    private int getAnswer(long N) {
        if (maxN == null) {
            maxN = new ArrayList<>();
            maxN.add(1L);
        }

        while (maxN.get(maxN.size() - 1) < N) {
            findNextMaxN();
        }
        
        int i = 0;
        while (N > maxN.get(i)) {
            ++i;
        }
        return i;
    }
    
    private void findNextMaxN() {
        int cost = maxN.size();
        long L = maxN.get(cost - 1);
        long R = 2 * L + 100;
        while (L + 1 < R) {
            long M = (L + R) / 2;
            if (trySplit(M, cost)) {
                L = M;
            } else {
                R = M;
            }
        }
        maxN.add(L);
    }
    
    private boolean trySplit(long N, int cost) {
        long sum = N;
        int pos = 1;
        while (sum > 0) {
            if (pos * pos > cost) { return false; }
            long cur = maxN.get(cost - pos * pos);
            sum -= cur;
            pos++;
        }
        return true;
    }
}