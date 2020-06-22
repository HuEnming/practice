package pers.enming.cs210.lab9;

import java.util.ArrayList;

public class CounteEight {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println(CounteEightInLong(0, 0));
	}

	public static int CounteEightInLong(long num, int counter) {
		if (num / 10 == 0) {
			if (num % 10 == 8)
				counter++;
			return counter;
		} else {
			if (num % 10 == 8)
				counter++;
			return CounteEightInLong(num / 10, counter);
		}
	}

	public static int Countunique(String sentence, ArrayList<Character> seen) {
		if (sentence.length() > 0) {
			char c = sentence.charAt(sentence.length() - 1);
			if (seen.indexOf(c) == -1) {
				seen.add(c);
			}
			return Countunique(sentence.substring(0, sentence.length() - 1), seen);
		} else {
			return seen.size();
		}
	}

	public static double compound(int y, double i, double x) {
		if (y > 0)
			return compound(y - 1, i, x * i);
		else
			return x;
		/* Enter your code here. Define factor, one, two and three below */

	}

}
