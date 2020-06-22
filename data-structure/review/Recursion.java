package pers.enming.cs210.review;

public class Recursion {
		public static void main(String[] args){
		 System.out.println(function(83));
		 System.out.println(((5|7|16|11)&167)>>1);
		 System.out.println(5|7|16|11);
		 System.out.println(5|7|16|11);
		}
		public static int function(int input){
		 input++;
		 if(input%13==2){
		 return 8;
		 }
		 return (function(input+2)-3);
		}

}
