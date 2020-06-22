package pers.enming.cs210.lab11;

import java.util.Scanner;

public class Palindrome {

	public static void main(String[] args) {
		Scanner scan = new Scanner(System.in);
		String iputNumber = scan.nextLine();
		//String iputNumber = "585";
		int counter = 0;
		for (int i = 2; i < 11; i++) {
			String paresedNumber = transRadix(Integer.parseInt(iputNumber), i);
			if (isPalindrome(paresedNumber)) {
				counter++;
			}
		}
		System.out.println(counter);
	}

	private static boolean isPalindrome(String input) {
        int begin = 0, end = input.length() - 1;
        char[] chars = input.toCharArray();

        while (begin < end) {
            if (chars[begin] == chars[end]) {
                begin++;
                end--;
            } else {
                return false;
            }
        }
        return true;
    }


	static String transRadix(int num, int toRadix) {
		StringBuffer sb = new StringBuffer();

		while (num != 0) {
			int x = num % toRadix;
			num = num / toRadix;
			sb.insert(0, x);
		}
		return sb.toString();
	}

}
