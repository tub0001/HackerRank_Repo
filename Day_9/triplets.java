import java.io.*;
import java.util.*;

public class Solution {
    public static final int N = 100010;
    public static long get(long[] num, int id) {
        return sum(num, id) - sum(num, id - 1);
    }
    public static void set(long[] num, int id, long val) {
        long cur = get(num, id);
        update(num, id, val - cur);
    }
    public static void update(long[] num, int id, long val) {
        while(id <= N) {
            num[(int)id] += val;
            id += (id & (-id));
        }
    }
    public static long sum(long[] num, int x) {
        long sum = 0;
        while(x > 0) {
            sum += num[(int)x];
            x -= (x & (-x));
        }
        return sum;
    }
    public static void main(String[] args) {
        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */
        Scanner input = new Scanner(System.in);
        int n = input.nextInt();
        long[] num = new long[n];
        long[] single = new long[N], tuple = new long[N], triplet = new long[N];
        TreeSet<Long> set = new TreeSet<Long>();
        HashMap<Long, Integer> map = new HashMap<Long, Integer>();
        for(int i = 0; i < n; i++)
       {
            num[i] = input.nextInt();
            set.add(num[i]);
        }     
        int cnt = 1;
        for(long tmp: set) {
            map.put(tmp, cnt++);
        }
        for(int i = 0; i < n; i++) {
            int id = map.get(num[i]);
            set(single, id, 1);
            set(tuple, id, sum(single, id - 1));
            set(triplet, id, sum(tuple, id - 1));
        }
        
        System.out.println(sum(triplet, cnt));
    }
}