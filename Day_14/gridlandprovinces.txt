import java.util.*;

import static java.lang.Math.*;
import static java.lang.System.*;

class Solution {
    private final static Scanner sc = new Scanner(in).useLocale(Locale.ROOT);
    private final static long MOD1 = (2L << 30) - 41, MUL1 = 107;
    private final static long MOD2 = (2L << 30) - 1, MUL2 = 101;
    private final static long[] MULS1 = new long[10000], MULS2 = new long[10000]; 
    private final static Set<Long> result = new HashSet<>();
    private static int total = 0;

    public static void main(String[] args) {
        for (int i = 0; i < MULS1.length; ++i) {
            MULS1[i] = i > 0 ? MULS1[i - 1] * MUL1 % MOD1 : 1;
            MULS2[i] = i > 0 ? MULS2[i - 1] * MUL2 % MOD2 : 1;
        }

        for (int cases = sc.nextInt(); cases > 0; --cases) {
            result.clear();
            sc.nextInt();
            char[] str1 = sc.next().toCharArray();
            char[] str2 = sc.next().toCharArray();

            for (int i = 0; i < str1.length; ++i) {
                test(str1, str2, i, false);
                test(str2, str1, i, false); 
                test(str1, str2, i, true);
                test(str2, str1, i, true);
            }
            reverse(str1);
            reverse(str2);
            for (int i = 0; i < str1.length; ++i) {
                test(str1, str2, i, false);
                test(str2, str1, i, false); 
                test(str1, str2, i, true);
                test(str2, str1, i, true);
            }
            out.println(result.size());
        }
    }

    static void test(char[] s1, char[] s2, int offs, boolean odd) {
        long h1 = 0, h2 = 0, h3 = 0, h4 = 0;
        for (int i = 0; i < offs; ++i) {
            h1 = (h1 + s1[i] * MULS1[offs - 1 - i]) % MOD1;
            h1 = (h1 + s2[i] * MULS1[offs + i]) % MOD1;
            h3 = (h3 + s1[i] * MULS2[offs - 1 - i]) % MOD2;
            h3 = (h3 + s2[i] * MULS2[offs + i]) % MOD2;
        }
        if (odd) {
            h1 = (h1 + s2[offs] * MULS1[offs * 2]) % MOD1;
            h1 = (h1 + s1[offs] * MULS1[offs * 2 + 1]) % MOD1;
            h3 = (h3 + s2[offs] * MULS2[offs * 2]) % MOD2;
            h3 = (h3 + s1[offs] * MULS2[offs * 2 + 1]) % MOD2;
            char[] s = s1; s1 = s2; s2 = s;
            ++offs;
        }
        for (int i = offs; i < s1.length; ++i) {
            h2 = (h2 + s1[i] * MULS1[s1.length * 2 + offs - 1 - i]) % MOD1;
            h2 = (h2 + s2[i] * MULS1[i + offs]) % MOD1;
            h4 = (h4 + s1[i] * MULS2[s1.length * 2 + offs - 1 - i]) % MOD2;
            h4 = (h4 + s2[i] * MULS2[i + offs]) % MOD2;
        }
        result.add(((h1 + h2) % MOD1) * MOD2 + (h3 + h4) % MOD2);

        for (int i = offs; i < s1.length - 1; i += 2) {
            h1 = (h1 + s2[i] * MULS1[i * 2]) % MOD1;
            h1 = (h1 + s1[i] * MULS1[i * 2 + 1]) % MOD1;
            h1 = (h1 + s1[i + 1] * MULS1[i * 2 + 2]) % MOD1;
            h1 = (h1 + s2[i + 1] * MULS1[i * 2 + 3]) % MOD1;
            h2 = (h2 + s2[i] * (MOD1 - MULS1[i * 2])) % MOD1;
            h2 = (h2 + s2[i+1] * (MOD1 - MULS1[i * 2 + 1])) % MOD1;
            h2 = (h2 + s1[i] * (MOD1 - MULS1[s1.length * 2 - 1])) % MOD1;
            h2 = (h2 + s1[i+1] * (MOD1 - MULS1[s1.length * 2 - 2])) % MOD1;
            h2 = (h2 * MUL1 * MUL1) % MOD1;
  
            h3 = (h3 + s2[i] * MULS2[i * 2]) % MOD2;
            h3 = (h3 + s1[i] * MULS2[i * 2 + 1]) % MOD2;
            h3 = (h3 + s1[i + 1] * MULS2[i * 2 + 2]) % MOD2;
            h3 = (h3 + s2[i + 1] * MULS2[i * 2 + 3]) % MOD2;
            h4 = (h4 + s2[i] * (MOD2 - MULS2[i * 2])) % MOD2;
            h4 = (h4 + s2[i+1] * (MOD2 - MULS2[i * 2 + 1])) % MOD2;
            h4 = (h4 + s1[i] * (MOD2 - MULS2[s1.length * 2 - 1])) % MOD2;
            h4 = (h4 + s1[i+1] * (MOD2 - MULS2[s1.length * 2 - 2])) % MOD2;
            h4 = (h4 * MUL2 * MUL2) % MOD2;
  
            result.add(((h1 + h2) % MOD1) * MOD2 + (h3 + h4) % MOD2);
        }
    }

    private static void reverse(char[] str) {
        for (int i = str.length / 2 - 1; i >= 0; --i) {
            char t = str[i];
            str[i] = str[str.length - 1 - i];
            str[str.length - 1 - i] = t;
        }
    }

}