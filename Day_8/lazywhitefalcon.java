import java.io.*;
import java.util.*;

public class Solution {

    private static class TreeNode {
        int id;
        TreeNode[] ancestors;
        int serialPosition;
        int subTreeSize;
        int level;
        List<TreeNode> children;
        int value;
        
        public TreeNode(int id) {
            this.id = id;
            children = new LinkedList<>();
            level = -1;
            value = 0;
        }
        
        public TreeNode getAncestorAt(int ancLevel) {
            TreeNode curNode = this;
            ancLevel = level - ancLevel;
            int logLevel = 0;
            while(ancLevel > 0) {
                while((ancLevel & 1) == 0) {
                    ancLevel >>= 1;
                    logLevel++;
                }
                curNode = curNode.ancestors[logLevel];
                ancLevel--;
            }
            return curNode;
        }
    }
    
    private static class BinaryIndexedTree {
        private int[][] values;
        private final int SIZE;
        private final int LOG_SIZE;

        public BinaryIndexedTree(int size) {
            SIZE = size;
            LOG_SIZE = 32 - Integer.numberOfLeadingZeros(size-1) + 1;
            values = new int[LOG_SIZE][];

            for(int i = 0; i < LOG_SIZE; i++) {
                values[i] = new int[size];
                Arrays.fill(values[i], 0);
                size = (size + 1) >> 1;
            }
        }

        public void add(int left, int right, int value) {
            int logPos = 0;
            while(left < right) {
                if((left & 1) == 1) {
                    values[logPos][left] += value;
                    left++;
                }
                if((right & 1) == 1) {
                    values[logPos][right - 1] += value;
                    right--;
                }
                logPos++;
                left >>= 1;
                right >>= 1;
            }
        }

        public int get(int position) {
            int result = 0;
            for(int k = 0; k < LOG_SIZE; k++) {
                result += values[k][position];
                position >>= 1;
            }
            return result;
        }
    }
    
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();
        int q = in.nextInt();
        TreeNode[] nodes = new TreeNode[n];
        for(int i = 0; i < n; i++) nodes[i] = new TreeNode(i);
        for(int i = 1; i < n; i++) {
            int a = in.nextInt();
            int b = in.nextInt();
            nodes[a].children.add(nodes[b]);
            nodes[b].children.add(nodes[a]);
        }
        int curPos = 0;
        Deque<TreeNode> stack = new LinkedList<>();
        TreeNode[] ancestors = new TreeNode[n];
        stack.add(nodes[0]);
        while(!stack.isEmpty()) {
            TreeNode curNode = stack.peekLast();
            if(curNode.level != -1) {
                stack.pollLast();
                curNode.subTreeSize = curPos - curNode.serialPosition;
            } else {
                TreeNode[] childrenAncestors;
                if(curNode.ancestors != null) {
                    curNode.level = curNode.ancestors[0].level + 1;
                    ancestors[curNode.level] = curNode;
                    int level = curNode.level + 1;
                    int logLevel = 0;
                    while(level > 0) {
                        level >>= 1;
                        logLevel++;
                    }
                    childrenAncestors = new TreeNode[logLevel];
                    level = 1;
                    for(int i = 0; i < logLevel; i++) {
                        childrenAncestors[i] = ancestors[curNode.level + 1 - level];
                        level <<= 1;
                    }
                } else {
                    curNode.level = 0;
                    ancestors[0] = curNode;
                    childrenAncestors = new TreeNode[]{curNode};
                }
                curNode.serialPosition = curPos++;
                for(TreeNode child : curNode.children) {
                    child.ancestors = childrenAncestors;
                    child.children.remove(curNode);
                    stack.add(child);
                }
            }
        }
        BinaryIndexedTree bit = new BinaryIndexedTree(n);
        for(int a0 = 0; a0 < q; a0++) {
            int op = in.nextInt();
            int a = in.nextInt();
            int b = in.nextInt();
            if(op == 1) {
                int curValue = nodes[a].value;
                bit.add(nodes[a].serialPosition, nodes[a].serialPosition + nodes[a].subTreeSize, b - curValue);
                nodes[a].value = b;
            } else {
                TreeNode nodeA = nodes[a];
                TreeNode nodeB = nodes[b];
                if(nodeA.level > nodeB.level) {
                    TreeNode temp = nodeA;
                    nodeA = nodeB;
                    nodeB = temp;
                }
                nodeB = nodeB.getAncestorAt(nodeA.level);
                while(nodeB != nodeA) {
                    int logLevel = nodeA.ancestors.length - 1;
                    while(logLevel >= 0 && nodeA.ancestors[logLevel] == nodeB.ancestors[logLevel]) logLevel--;
                    if(logLevel < 0) logLevel = 0;
                    nodeA = nodeA.ancestors[logLevel];
                    nodeB = nodeB.ancestors[logLevel];
                }
                TreeNode commonAncestor = nodeA;
                nodeA = nodes[a];
                nodeB = nodes[b];
                long sumValues = bit.get(nodeA.serialPosition) + bit.get(nodeB.serialPosition) - bit.get(commonAncestor.serialPosition);
                if(commonAncestor.ancestors != null) sumValues -= bit.get(commonAncestor.ancestors[0].serialPosition);
                System.out.println(sumValues);
            }
        }
        in.close();
    }
}