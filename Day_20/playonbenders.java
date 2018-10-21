import java.util.*;
import java.io.*;



class Solution{

	static int grundy[];

	public static int findgrundy(int index,ArrayList<Integer> adj[])
	{
        if(grundy[index]!=-1)
            return grundy[index];
		if(adj[index].size()==0)
		{
			grundy[index]=0;
			return 0;
		}
		else
		{
			Set<Integer> a=new HashSet<Integer>();
			for(int x:adj[index])
			{
				grundy[x]=findgrundy(x,adj);
				a.add(grundy[x]);
			}
			int i=0;

			while(a.contains(i))
				i++;

			grundy[index]=i;
			
			return grundy[index];
		}

	}


	public static void main(String args[]) throws IOException
	{
		BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
		PrintWriter out=new PrintWriter(System.out);


		String s[]=br.readLine().split(" ");
		int n=Integer.parseInt(s[0]);
		int m=Integer.parseInt(s[1]);

		ArrayList<Integer> adj[]=new ArrayList[n+1];
		grundy=new int[n+1];

		for(int i=1;i<=n;i++)
		{
			adj[i]=new ArrayList<Integer>();
		}
		for(int i=0;i<m;i++)
		{
			s=br.readLine().split(" ");
			int x=Integer.parseInt(s[0]);
			int y=Integer.parseInt(s[1]);
			adj[x].add(y);
			
		}

		Arrays.fill(grundy,-1);

		for(int i=1;i<=n;i++)
			grundy[i]=findgrundy(i,adj);
		int k=Integer.parseInt(br.readLine());

		for(int i=0;i<k;i++)
		{
			int num=Integer.parseInt(br.readLine());
			int ans=0;

			 s=br.readLine().split(" ");
			for(int j=0;j<num;j++)
			{
				int x=Integer.parseInt(s[j]);
				ans^=grundy[x];
			}

			out.println(ans==0?"Iroh":"Bumi");
		}


		

		out.flush();
		out.close();

	}
}