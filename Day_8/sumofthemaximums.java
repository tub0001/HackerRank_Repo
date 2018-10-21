import java.io.*;

public class Solution {

    final static int D = 1000;

    void solve() throws IOException {
        in = new InputReader("__std");
        out = new OutputWriter("__std");

        int n = in.readInt();
        int m = in.readInt();
        int[] a = new int[n];
        for (int i = 0; i < n; ++i) {
            a[i] = in.readInt();
        }

        // stack
        int len;
        int[] s = new int[n];

        // decomposition
        int k = n / D;
        if (n % D > 0) ++k;

        long[] w = new long[n + 1];
        long[][] b = new long[k][];
        int[][] mb1 = new int[k - 1][];
        int[][] mb2 = new int[k - 1][];
        for (int i = 0; i < k; ++i) {
            int p = i * D;
            b[i] = new long[n - p + 1];
            len = 0;
            for (int j = 0; j < n - p; ++j) {
                while (len > 0 && a[p + s[len - 1]] <= a[p + j]) --len;
                int l = len > 0 ? s[len - 1] + 1 : 0;
                s[len++] = j;
                w[j + 1] = w[l] + (long) (j - l + 1) * a[p + j];
                b[i][j + 1] = b[i][j] + w[j + 1];
            }

            if (i < k - 1) {
                mb1[i] = new int[D];
                mb1[i][D - 1] = p + D - 1;
                for (int j = D - 2; j >= 0; --j) {
                    mb1[i][j] = a[p + j] > a[mb1[i][j + 1]] ? p + j : mb1[i][j + 1];
                }

                mb2[i] = new int[n - p - D];
                mb2[i][0] = p + D;
                for (int j = 1; j < n - p - D; ++j) {
                    mb2[i][j] = a[p + D + j] > a[mb2[i][j - 1]] ? p + D + j : mb2[i][j - 1];
                }
            }
        }

        int[] r = new int[n];
        long[] g = new long[n + 1];
        len = 0;
        for (int j = n - 1; j >= 0; --j) {
            while (len > 0 && a[s[len - 1]] <= a[j]) --len;
            r[j] = len > 0 ? s[len - 1] : n;
            g[j] = g[r[j]] + (long) (r[j] - j) * a[j];
            s[len++] = j;
        }

        while (m-- > 0) {
            int L = in.readInt() - 1;
            int R = in.readInt() - 1;
            long v = 0;
            if (R - L + 1 > D) {
                int i = L / D;
                int p = i * D;
                v = b[i][R - p + 1];
                int mi2 = mb2[i][R - p - D];
                for (int j = p; j < L; ++j) {
                    int mi1 = mb1[i][j - p];
                    int t = a[mi1] > a[mi2] ? mi1 : mi2;
                    v += (long) (r[t] - R - 1) * a[t] + g[r[t]] - g[j];
                }
            } else {
                len = 0;
                for (int j = 0; j < R - L + 1; ++j) {
                    while (len > 0 && a[L + s[len - 1]] <= a[L + j]) --len;
                    int l = len > 0 ? s[len - 1] + 1 : 0;
                    s[len++] = j;
                    w[j + 1] = w[l] + (long) (j - l + 1) * a[L + j];
                    v += w[j + 1];
                }
            }
            out.println(v);
        }

        exit();
    }

    void exit() {
        out.close();
        System.exit(0);
    }

    InputReader in;
    OutputWriter out;

    public static void main(String[] args) throws IOException {
        new Solution().solve();
    }

    class InputReader {

        private InputStream stream;

        private byte[] buffer = new byte[1024];
        private int pos, len;

        private int cur;

        InputReader(String name) throws IOException {
            if (name.equals("__std")) {
                stream = System.in;
            } else {
                stream = new FileInputStream(name);
            }
            cur = read();
        }

        private int read() throws IOException {
            if (len == -1) {
                throw new EOFException();
            }
            if (pos >= len) {
                pos = 0;
                len = stream.read(buffer);
                if (len == -1) return -1;
            }
            return buffer[pos++];
        }

        private boolean whitespace() {
            return cur == ' ' || cur == '\t' || cur == '\r' || cur == '\n' || cur == -1;
        }

        int readInt() throws IOException {
            if (cur == -1) {
                throw new EOFException();
            }
            while (whitespace()) {
                cur = read();
            }
            if (cur == -1) {
                throw new EOFException();
            }
            int sign = 1;
            if (cur == '-') {
                sign = -1;
                cur = read();
            }
            int res = 0;
            while (!whitespace()) {
                if (cur < '0' || cur > '9') {
                    throw new NumberFormatException();
                }
                res *= 10;
                res += cur - '0';
                cur = read();
            }
            return res * sign;
        }
    }

    class OutputWriter {

        private PrintWriter writer;

        OutputWriter(String name) throws IOException {
            if (name.equals("__std")) {
                writer = new PrintWriter(System.out);
            } else {
                writer = new PrintWriter(name);
            }
        }

        void println(Object value) {
            writer.println(value);
        }

        void close() {
            writer.close();
        }
    }
}