import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.StringTokenizer;

public class DynamicSummation {

    static final int magic[] = { 11 * 13 * 17 * 19 * 23 * 25 * 27, 9 * 31 * 37 * 41 * 43 * 47, 49 * 53 * 59 * 61 * 64,
            67 * 71 * 73 * 79, 29 * 81 * 83 * 89, 97 * 101 * 9 };
    static final int magicIndices[] = new int[111];
    static {
        Arrays.fill(magicIndices, -1);
        for (int i = 2; i <= 101; i++) {
            for (int j = 0; j < magic.length; j++)
                if (gcd1(i, magic[j]) == i) {
                    magicIndices[i] = j;
                    break;
                }
        }
    }
    static int delta[] = new int[magic.length];
    static int N;
    static int Q;
    static long MOD;
    static List<Integer> tmpE[];
    static List<Integer> e[];
    static int[] left;
    static int[] right;
    static int stamp;

    static void dfs(int u, int parent) {
        e[u] = new ArrayList<>();
        left[u] = ++stamp;
        for (int v : tmpE[u])
            if (v != parent) {
                e[u].add(v);
                dfs(v, u);
            }
        right[u] = stamp;
    }

    static long pow(long a, long n, long mod) {
        a %= mod;
        long res = 1;
        while (n > 0) {
            if (n % 2 == 1)
                res = res * a % mod;
            a = a * a % mod;
            n /= 2;
        }
        return res;
    }

    static class SegmentTree {
        int begin[];
        int end[];
        int len[];
        int cnt[][];
        int mark[][];
        int _left, _right, _delta[], res[];

        public SegmentTree(int n) {
            begin = new int[4 * n];
            end = new int[4 * n];
            len = new int[4 * n];
            cnt = new int[4 * n][magic.length];
            mark = new int[4 * n][magic.length];
            build(1, 1, n);
        }

        private void build(int i, int left, int right) {
            begin[i] = left;
            end[i] = right;
            len[i] = end[i] - begin[i] + 1;
            if (left < right) {
                int mid = (left + right) / 2;
                build(2 * i, left, mid);
                build(2 * i + 1, mid + 1, right);
            }
        }

        private void push(int i) {
            for (int m = 0; m < magic.length; m++) {
                cnt[i][m] = (int) ((cnt[i][m] + 1L * len[i] * mark[i][m] % magic[m]) % magic[m]);
                if (begin[i] < end[i]) {
                    mark[2 * i][m] = (mark[2 * i][m] + mark[i][m]) % magic[m];
                    mark[2 * i + 1][m] = (mark[2 * i + 1][m] + mark[i][m]) % magic[m];
                }
                mark[i][m] = 0;
            }
        }

        public void update(int left, int right, int[] delta) {
            _left = left;
            _right = right;
            _delta = delta;
            for (int i : delta)
                assert (i >= 0);
            _update(1);
        }

        private void _update(int i) {
            push(i);
            if (begin[i] > _right || end[i] < _left)
                return;
            if (_left <= begin[i] && end[i] <= _right) {
                for (int m = 0; m < magic.length; m++)
                    mark[i][m] = (mark[i][m] + _delta[m]) % magic[m];
                push(i);
            } else {
                _update(2 * i);
                _update(2 * i + 1);
                for (int m = 0; m < magic.length; m++)
                    cnt[i][m] = (cnt[2 * i][m] + cnt[2 * i + 1][m]) % magic[m];
            }
        }

        public int[] query(int left, int right) {
            _left = left;
            _right = right;
            res = new int[magic.length];
            _query(1);
            return res;
        }

        private void _query(int i) {
            push(i);
            if (begin[i] > _right || end[i] < _left)
                return;
            if (_left <= begin[i] && end[i] <= _right) {
                for (int m = 0; m < magic.length; m++)
                    res[m] = (res[m] + cnt[i][m]) % magic[m];
            } else {
                _query(2 * i);
                _query(2 * i + 1);
            }
        }
    }

    static int gcd1(int a, int b) {
        return b == 0 ? a : gcd1(b, a % b);
    }

    // return array [d, a, b] such that d = gcd(p, q), ap + bq = d
    static int[] gcd(int p, int q) {
        if (q == 0)
            return new int[] { p, 1, 0 };

        int[] vals = gcd(q, p % q);
        int d = vals[0];
        int a = vals[2];
        int b = vals[1] - (p / q) * vals[2];
        return new int[] { d, a, b };
    }

    @SuppressWarnings("unchecked")
    public static void main(String[] args) throws Exception {
        BufferedReader cin = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer token = new StringTokenizer(cin.readLine());

        N = Integer.parseInt(token.nextToken());
        tmpE = new ArrayList[N + 1];
        e = new ArrayList[N + 1];
        left = new int[N + 1];
        right = new int[N + 1];
        for (int i = 0; i < tmpE.length; i++)
            tmpE[i] = new ArrayList<>();
        for (int i = 1; i < N; i++) {
            token = new StringTokenizer(cin.readLine());
            int u = Integer.parseInt(token.nextToken());
            int v = Integer.parseInt(token.nextToken());
            tmpE[u].add(v);
            tmpE[v].add(u);
        }

        dfs(1, -1);

        SegmentTree tree = new SegmentTree(N);
        for (Q = Integer.parseInt(cin.readLine()); Q > 0; Q--) {
            token = new StringTokenizer(cin.readLine());
            if (token.nextToken().charAt(0) == 'U') {
                int r = Integer.parseInt(token.nextToken());
                int t = Integer.parseInt(token.nextToken());
                long a = Long.parseLong(token.nextToken());
                long b = Long.parseLong(token.nextToken());

                for (int m = 0; m < magic.length; m++) {
                    delta[m] = (int) ((pow(a, b, magic[m]) + pow(a + 1, b, magic[m]) + pow(b + 1, a, magic[m]))
                            % magic[m]);
                }

                if (r == t)
                    tree.update(1, N, delta);
                else if (left[t] < left[r] && right[t] >= right[r]) {
                    // if t is the grandparent of r
                    tree.update(1, N, delta);

                    for (int m = 0; m < magic.length; m++) {
                        // compute the inverse of delta to do the subtraction
                        delta[m] = magic[m] - delta[m];
                    }
                    // do a binary search here
                    int low = 0, high = e[t].size() - 1, mid = -1, v = -1;
                    while (low <= high) {
                        mid = (low + high) / 2;
                        v = e[t].get(mid);
                        if (left[v] <= left[r] && right[v] >= right[r])
                            break;
                        else if (right[v] < left[r])
                            low = mid + 1;
                        else
                            high = mid - 1;
                    }

                    tree.update(left[v], right[v], delta);
                } else {
                    tree.update(left[t], right[t], delta);
                }
            } else {
                int r = Integer.parseInt(token.nextToken());
                int t = Integer.parseInt(token.nextToken());
                int mod = Integer.parseInt(token.nextToken());

                int res[] = null;

                if (r == t)
                    res = tree.query(1, N);
                else if (left[t] < left[r] && right[t] >= right[r]) {
                    // if t is the grandparent of r

                    res = tree.query(1, N);

                    // do a binary search here
                    int low = 0, high = e[t].size() - 1, mid = -1, v = -1;
                    while (low <= high) {
                        mid = (low + high) / 2;
                        v = e[t].get(mid);
                        if (left[v] <= left[r] && right[v] >= right[r])
                            break;
                        else if (right[v] < left[r])
                            low = mid + 1;
                        else
                            high = mid - 1;
                    }
                    int subtract[] = tree.query(left[v], right[v]);
                    for (int m = 0; m < magic.length; m++)
                        res[m] = (res[m] - subtract[m] + magic[m]) % magic[m];
                } else {
                    res = tree.query(left[t], right[t]);
                }

                List<Integer> factor = new ArrayList<>();
                int tmp = mod;
                for (int i = 2; i * i <= tmp; i++)
                    if (tmp % i == 0) {
                        int j = i;
                        while (tmp % (j * i) == 0)
                            j *= i;
                        factor.add(j);
                        tmp /= j;
                    }
                if (tmp > 1)
                    factor.add(tmp);

                List<Integer> inv = new ArrayList<>(factor.size());
                List<Integer> M = new ArrayList<>(factor.size());
                for (int i = 0; i < factor.size(); i++) {
                    M.add(mod / factor.get(i));
                    int cb[] = gcd(M.get(i), factor.get(i));
                    while (cb[1] < 0)
                        cb[1] += factor.get(i);
                    inv.add(cb[1] % factor.get(i));
                }

                long ans = 0;
                for (int i = 0; i < factor.size(); i++)
                    ans += 1L * inv.get(i) * (res[magicIndices[factor.get(i)]] % factor.get(i)) % mod * M.get(i) % mod;
                System.out.println(ans % mod);
            }

        }

        cin.close();
    }

    static class Pair<U extends Comparable<U>, V extends Comparable<V>> implements Comparable<Pair<U, V>> {
        final U _1;
        final V _2;

        private Pair(U key, V val) {
            this._1 = key;
            this._2 = val;
        }

        public static <U extends Comparable<U>, V extends Comparable<V>> Pair<U, V> instanceOf(U _1, V _2) {
            return new Pair<U, V>(_1, _2);
        }

        @Override
        public String toString() {
            return _1 + " " + _2;
        }

        @Override
        public int hashCode() {
            int res = 17;
            res = res * 31 + _1.hashCode();
            res = res * 31 + _2.hashCode();
            return res;
        }

        @Override
        public int compareTo(Pair<U, V> that) {
            int res = this._1.compareTo(that._1);
            if (res < 0 || res > 0)
                return res;
            else
                return this._2.compareTo(that._2);
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj)
                return true;
            if (!(obj instanceof Pair))
                return false;
            Pair<?, ?> that = (Pair<?, ?>) obj;
            return _1.equals(that._1) && _2.equals(that._2);
        }
    }
}