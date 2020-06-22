package pers.enming.cs210.lab10;

import java.util.Random;

public class test2 {
	public static void main(String[] args) {
		String[] a = { "3", "1", "4", "5", "5" };
		System.out.println(CalculateCall(5, a));
//		int yourNumber=0;
//		for (int j = 0; j < 5; j++) {
//			if (Integer.parseInt(a[j]) == 2 || Integer.parseInt(a[j]) == 1)
//				yourNumber++;
//		}
//		System.out.println(RunRandeom(2, yourNumber, 5, 8));
		
	}

	public static String CalculateCall(int peopleNum, String[] yourDices) {
		int[] result = new int[3];
		int[] yourData = new int[2];
		for (int i = 1; i < 7; i++) {
			int yourNumber = 0;
			for (int j = 0; j < 5; j++) {
				if (Integer.parseInt(yourDices[j]) == i || Integer.parseInt(yourDices[j]) == 1)
					yourNumber++;
			}
			if(yourNumber>yourData[0])
			{
				yourData[0]=yourNumber;
				yourData[1]=i;
			}
		}
		//return (yourData[0]+"   "+yourData[1]);
			
			
			for (int k = yourData[0]; k < (5 * peopleNum); k++) {
				int rate = RunRandeom(yourData[1], yourData[0], peopleNum, k);
				if (rate > 500000) {
					if (rate < result[2] || result[2] == 0) {
						result[0] = k;
						result[1] = yourData[1];
						result[2] = rate;
						System.out.println(result[0] + " " + result[1] + " " + result[2]);
					} 
				}
			}
//			return result[0] + "   " + result[1];
			
			
//					else {
//						break;
//					}
				//} 
//				else {
//					continue;
//				}
		//	}
		
			return (result[0] + " " + result[1] + " " + result[2]);
	}

	public static int RunRandeom(int dian, int yourNumber, int peopleNum, int call) {
		Random r = new Random();
		int counter = 0;
		int win = 0;
		for (int k = 0; k < 1000000; k++) {
			for (int i = 0; i < peopleNum - 1; i++) {
				for (int j = 0; j < 5; j++) {
					int randomNumber = r.nextInt(6) + 1;
					if (randomNumber == dian || randomNumber == 1) {
						counter++;
					}
				}
			}
			if (counter + yourNumber >= call)
				win++;
			counter = 0;
		}
		return win;
	}

}
