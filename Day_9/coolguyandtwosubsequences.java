import java.util.Arrays;
import java.util.Comparator;
import java.util.Scanner;

public class CoolguyAndTwoSubsequences {
    final static int constant = 1000000007;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int N = scanner.nextInt();

        final int[] A = new int[N];
        int[] l = new int[N];
        int[] r = new int[N];

        boolean[] mark = new boolean[N];
        Integer[] index = new Integer[N];

        for (int i = 0; i < N; i++) {
            A[i] = scanner.nextInt();
            l[i] = r[i] = i;
            mark[i] = false;
            index[i] = Integer.valueOf(i);
        }
        Arrays.sort(index, new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return A[o2] - A[o1];
            }
        });
        long res = 0;
        long dp = 0;
        for (int i = 0; i < N; i++) {
            int ptr = index[i];
            mark[ptr] = true;
            int left = 0;
            int right = 0;
            if (ptr > 0 && mark[ptr - 1]) {
                left = ptr - l[ptr - 1];
                dp = (dp + constant - fun1(left)) % constant;
            }
            if (ptr < N - 1 && mark[ptr + 1]) {
                right = r[ptr + 1] - ptr;
                dp = (dp + constant - fun1(right)) % constant;
            }
            l[ptr + right] = ptr - left;
            r[ptr - left] = ptr + right;

            long c = 0;

            c += (right + 1) * fun2(left) % constant;
            c %= constant;

            c += (left + 1) * fun2(right) % constant;
            c %= constant;

            c += (left + 1L) * (right + 1L) % constant * dp % constant;
            c %= constant;

            res += c * A[ptr] % constant;
            res %= constant;
            dp += fun1(left + right + 1);
            dp %= constant;
        }
        System.out.println(res);
        scanner.close();
    }

    private static long fun2(long p) {
        return p * (p + 1) * (p + 2) / 6 % constant;
    }

    private static long fun1(long p) {
        return p * (p + 1) / 2 % constant;
    }
}