package pers.enming.cs210.lab10;

import java.util.Random;

public class DiceProbability {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int[] dice = { 3, 4, 1, 4, 2 };
		int[] call = { 7, 4 };
		System.out.println(CalculateProbability(6, dice, call));
	}

	public static int CalculateProbability(int peopleNum, int[] yourDices, int[] call) {

		int yourNumber = 0;
		for (int i = 0; i < 5; i++) {
			if (yourDices[i] == call[1] || yourDices[i] == 1)
				yourNumber++;
		}

		Random r = new Random();
		int counter = 0;
		int win = 0;
		for (int k = 0; k < 1000000; k++) {
			for (int i = 0; i < peopleNum - 1; i++) {
				for (int j = 0; j < 5; j++) {
					int randomNumber = r.nextInt(6)+1;
					if (randomNumber == call[1] || randomNumber == 1) {
						counter++;
					}
				}
			}
			if (counter + yourNumber >= call[0])
				win++;
			counter = 0;
		}

		// return Math.pow(1.0/3, (double)call[0])*(peopleNum-1)*5-
		return (int)Math.round(win * 100 / 1000000);
	}
}
