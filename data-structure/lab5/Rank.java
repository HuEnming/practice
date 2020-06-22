package pers.enming.cs210.lab5;

import java.util.*;

public class Rank{
	private static int numS;	
	private static int rank;	
	private static ArrayList<ArrayList<String>> info= new ArrayList<ArrayList<String>>();	//a 2D arraylist to store student and score info
	
	public static void main(String args[]){
		Scanner sc = new Scanner(System.in);
		numS = Integer.parseInt(sc.nextLine());
		rank = Integer.parseInt(sc.nextLine());
		for(int i=0;i<numS;i++){
			info.add(new ArrayList<String>());
			info.get(i).add(sc.nextLine());
			info.get(i).add(sc.nextLine());
		}
		sc.close();
		sortRank();
		System.out.println(info.get(rank-1).get(0));
		System.out.println(info);
		
	}
	
	public static void sortRank(){
		int mark1;
		int mark2;
		String name1;
		String name2;
		for(int j=0;j<numS;j++){
			for(int i=0;i<numS-1-j;i++){
				mark1 = Integer.parseInt(info.get(i).get(1));
				mark2 = Integer.parseInt(info.get(i+1).get(1));
				if(mark1 < mark2){
					Collections.swap(info,i,i+1);
				}else if(mark1 == mark2){
					name1 = info.get(i).get(0);
					name2 = info.get(i+1).get(0);
					if(name1.compareToIgnoreCase(name2)>0){
						Collections.swap(info,i,i+1);
					}
				}
			}
		}
	}
	
	
}
