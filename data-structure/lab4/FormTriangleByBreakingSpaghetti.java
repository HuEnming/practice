package pers.enming.cs210.lab4;

import java.util.Random;
import java.util.Scanner;

public class FormTriangleByBreakingSpaghetti {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner scan = new Scanner(System.in);
		int maximPercentage = scan.nextInt();
		int probability = getProbabilityOfFormTriangle(maximPercentage);
		System.out.println(probability);
		// System.out.println(checkTriangle(10.0,20.0,100.0,70));
	}

	public static int getProbabilityOfFormTriangle(int percentage) {
		int counter = 0;
		for (int i = 0; i < 1000000; i++) {

			double side1 = Math.random() * 10;
			// System.out.println(side1);
			double side2 = Math.abs(Math.random() * 10 - side1);
			side1 = Math.abs(side1 - side2);
			// System.out.println(side2);
			double side3 = 10 - side1 - side2;

			if (checkTriangle(side1, side2, side3, percentage))
				counter++;
		}

		return (int)Math.round(counter / 10000.0);
	}

	public static double getRandom() {
		double randomNumber = Math.random();
		// Random ran =new Random();
		// double randomNumber = ran.nextDouble();
		return randomNumber == 0 ? getRandom() : randomNumber;
	}

	public static boolean checkTriangle(double side1, double side2, double side3, int percentage) {
		double largeSide = Math.max(side3, Math.max(side1, side2));
		// if ((10 - largeSide) / largeSide > (percentage / 100.0))
		if ((10 - largeSide) > largeSide * (1 - (percentage / 100.0))||(10 - largeSide) > largeSide)
			// if ((side1 + side2) > side3 && (side2 + side3) > side1 && (side1 + side3) >
			// side2)
			return true;
		else
			return false;
	}

}
