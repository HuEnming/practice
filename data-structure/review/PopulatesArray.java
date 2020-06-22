package pers.enming.cs210.review;

import java.util.Scanner;

public class PopulatesArray {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println("Input the length of the array!");
		Scanner sc = new Scanner(System.in);
		int length = sc.nextInt();
		int[] myArray = new int[length];
		for (int i = 0; i < length; i++) {
			myArray[i] = sc.nextInt();
		}
		
		for (int x : myArray) {
			System.out.println(x);
		}
	}

}
