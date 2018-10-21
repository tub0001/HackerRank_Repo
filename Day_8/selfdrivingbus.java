import java.io.*;
import java.util.*;

public class Solution {

    private static List<TreeSet<Integer>> adjacent = new ArrayList<>();
    
    public static boolean isConnected(int node, int startInc, int endInc) {
        TreeSet<Integer> neighbors = adjacent.get(node);
        Integer possible = neighbors.higher(startInc - 1);
        return possible != null && possible <= endInc;
    }
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(new BufferedInputStream(System.in));
        int n = scanner.nextInt();
        
        for (int i = 0; i < n; ++i) {
            adjacent.add(new TreeSet<>());
        }
        for (int i = 0; i < n - 1; ++i) {
            int a = scanner.nextInt() - 1;
            int b = scanner.nextInt() - 1;
            adjacent.get(a).add(b);
            adjacent.get(b).add(a);
        }
        Set<Integer> segmentStarts = new HashSet<>();
        for (int i = 0; i < n; ++i) {
            segmentStarts.add(i);
        }
        long count = 0;
        for (int length = 2; length <= n && !segmentStarts.isEmpty(); ++length) {
            count += segmentStarts.size();
            Set<Integer> nextSegmentStarts = new HashSet<>();
            for (Integer oldStart : segmentStarts) {
                if (oldStart + length - 1 < n && 
                    isConnected(oldStart + length - 1, oldStart, oldStart + length - 2)) {
                    nextSegmentStarts.add(oldStart);
                }
                if (oldStart > 0 && 
                    isConnected(oldStart - 1, oldStart, oldStart + length - 2)) {
                    nextSegmentStarts.add(oldStart - 1);
                }
            }
            segmentStarts = nextSegmentStarts;
        }
        count += segmentStarts.size();
        System.out.println(count);
    }
}