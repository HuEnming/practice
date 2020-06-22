package pers.enming.cs210.lab9;

import java.util.Scanner;

public class LongDivision {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner sc = new Scanner(System.in);
		// numS = Integer.parseInt(sc.nextLine());
		System.out.println(1012331.00 / 13.00);
		System.out.println(GetDivisionDigit(1012331, 13, 3));
		System.out.println(GetDivisionDigit(1012331, 13, 3) % 10);
	}

	public static int GetDivisionDigit(int num, int divisor, int nth) {
		if (nth == 0)
			return num / divisor;
		else {

			return GetDivisionDigit(num, divisor, nth - 1) * 10
					+ ((int) (num * Math.pow(10, nth - 1)) % divisor) * 10 / divisor;
			// GetDivisionDigit(num,divisor, nth-1)*10 + (int)(num*Math.pow(10,nth) -
			// GetDivisionDigit(num,divisor, nth-1)*divisor)*10/divisor;
			// (num - GetDivisionDigit(num,divisor, nth-1)*divisor)*10/divisor;
			// (int)(num*Math.pow(10,nth-1)%divisor*10/divisor);
			// System.out.println((int)(num*Math.pow(10,nth))%divisor);
		}
	}

}
