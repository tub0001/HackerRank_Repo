import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class JagguPlayingwithBalloons3
{
    static int N=1000000;
    static long[] balloons=new long[N];
    static int[] bucket1=new int[N];
    static int[] bucket2=new int[N];
    
    public static void main(String[] args) throws IOException
    {
        //BufferedReader in = new BufferedReader(new FileReader("input"));
      BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
      PrintWriter pw=new PrintWriter(System.out);
      //PrintWriter pw=new PrintWriter("output");
      
      for(int i=N-1;i>=0;i--)
      {
          bucket1[i]=i|(i+1);
          //pw.println(bucket1[i]);
          if (bucket1[i] >= N) {
              bucket2[i] = bucket1[i] - N;
          } else {
              bucket2[i] = bucket2[bucket1[i]];
          }
      }
      
      int nofq=Integer.parseInt(in.readLine());
      String[] s;    
        
      while(nofq-->0)
      {
          s=in.readLine().split(" ");
          if(s[0].equals("R"))
          {
              pw.println(count(Integer.parseInt(s[2])-1)-count(Integer.parseInt(s[1])-2));
          }
          else
          {
              update(Integer.parseInt(s[1])-1,Integer.parseInt(s[2]),Integer.parseInt(s[3]));
          }
          
      }
      pw.flush();
      
      
  }
  
  public static void update(int pos,int M,int plus)
  {
      for (int i = 0; i < 50; i++) 
      {
          int x = (pos + i * plus) % N;
          int multiplier = 1000;
          while (multiplier > 0) {
              if (bucket2[x] == x) 
              {
                  addition(x, M*multiplier);
                  break;
              } 
              else 
              {
                  addition(x,M);
                  multiplier--;
                  x = bucket2[x];
              }
          }
      }
  }
  
  public static void addition(int pos, long M) 
  {
      long add = M;
      while (pos < N) {
          balloons[pos] += add;
          add += M;
          pos = pos | (pos + 1);
      }
  }
  
  public static long count(int pos) {
      long r = 0;
      while (pos >= 0) {
          r += balloons[pos];
          pos = (pos & (pos + 1)) - 1;
      }
      return r;
  }
  
}