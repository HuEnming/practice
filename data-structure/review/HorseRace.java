package pers.enming.cs210.review;

public class HorseRace {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int counter = 0;
		for (int i = 0; i < 50000000; i++) {
			int first = (int) (Math.random() * (53 + 26 + 14 + 7)) + 1;

			if (first >= 1 && first <= 53) {// A1
				int second = (int) (Math.random() * (26 + 14 + 7)) + 1;
				if (second >= 1 && second <= 14) {// C2
					int third = (int) (Math.random() * (26 + 7)) + 1;
					if (third >= 1 && third <= 26) {
						counter++;
					}
				}
				//System.out.println(first);
				//System.out.println(second);

				if (second >= 15 && second <= 15 + 7 - 1) {// D2
					int third = (int) (Math.random() * (26 + 14)) + 1;
					if (third >= 1 && third <= 26) {
						counter++;
					}
				}
			}

			// B1

			if (first >= 53 + 26 + 1 && first <= 53 + 26 + 14) {// C1
				int second = (int) (Math.random() * (26 + 53 + 7)) + 1;
				if (second >= 1 && second <= 53) {// A2
					int third = (int) (Math.random() * (26 + 7)) + 1;
					if (third >= 1 && third <= 26) {
						counter++;
					}
				}

				if (second >= 54 && second <= 54 + 7 - 1) {// D2
					int third = (int) (Math.random() * (26 + 14)) + 1;
					if (third >= 1 && third <= 26) {
						counter++;
					}
				}
			}

			if (first >= 53 + 26 + 15 && first <= 53 + 26 + 14 + 7) {// D1
				int second = (int) (Math.random() * (26 + 53 + 14)) + 1;
				if (second >= 1 && second <= 53) {// A2
					int third = (int) (Math.random() * (26 + 7)) + 1;
					if (third >= 1 && third <= 26) {
						counter++;
					}
				}

				if (second >= 54 && second <= 54 + 14 - 1) {// C2
					int third = (int) (Math.random() * (26 + 53)) + 1;
					if (third >= 1 && third <= 26) {
						counter++;
					}
				}
			}
		}

		System.out.println(counter/500000.0);
	}
	
}
