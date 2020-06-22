package pers.enming.cs210.review;

public class InsertToArray {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		int[] testArray = { 1, 3, 5, 6, 7, 8, 0, 0, 0 };
		for (int x : Insert(9, testArray)) {
			System.out.println(x);
		}
	}

	public static int[] Insert(int value, int[] array) {
		for (int i = 0; i < array.length; i++) {
			if (array[i] == 0) {
				array[i] = value;
				break;
			}
		}
		for (int i = array.length - 1; i > 1; i--) {
			if (array[i] < array[i - 1] && array[i] != 0) {
				int tmp = array[i];
				array[i] = array[i - 1];
				array[i - 1] = tmp;
			}
		}
		return array;
	}

}
