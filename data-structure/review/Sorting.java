package pers.enming.cs210.review;

public class Sorting {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int[] testArray = { 1, 5, 3, 62, 7, 83, 9, 2, 23, 64, 84, 14, 56, 77 };
		int[] testArray1 = { 2, 23, 64, 84, 14, 56, 77, 1, 5, 3, 62, 7, 83, 9 };
		testbubbleSort(testArray);
		for (int x : testArray) {
			System.out.print(x + "  ");
		}
		System.out.println();
		selectionSort(testArray1);
		for (int x : testArray1) {
			System.out.print(x + "  ");
		}
	}

	/*
	 * outer ¡®bubbling¡¯ loop running from end of array backwards, bubbling biggest
	 * element to the top each time it runs { inner ¡®swapping¡¯ loop running from
	 * start of array up to last unsorted element, swapping two elements at a time {
	 * check if element[i] > element[i+1] if so, swap them } }
	 */
	public static void bubblesort(int[] array) {
		int outer, inner;
		for (outer = array.length - 1; outer > 0; outer--) {
			for (inner = 0; inner < outer; inner++) {
				if (array[inner] > array[inner + 1]) {
					swap(array, inner, inner + 1);
				}
			}
		}
	}
	
	public static void testbubbleSort(int[] array) {
		for(int i=0;i<array.length-1;i++) {
			for(int j=0;j<array.length-1-i;j++) {
				if(array[j]>array[j+1]) {
					int temp = array[j];
					array[j]=array[j+1];
					array[j+1]=temp;
				}
			}
		}
	}

	/*
	 * outer loop running through each place in the array looking for the correct
	 * element to swap into that place ¨C starts at the beginning { inner loop which
	 * always looks for the smallest remaining unsorted item { find minimum swap
	 * array[outer] with array[minimum] } }
	 */
	public static void selectionSort(int[] array) {
		int min;
		for (int outer = 0; outer < array.length; outer++) {
			// outer is the point where the unsorted numbers start
			min = outer;
			// min¡¯s default value is the first slot to be checked
			for (int i = outer + 1; i < array.length; i++) {
				// inner loop checks through the unsorted numbers
				if (array[i] < array[min]) {
					min = i; // inner loop finds the minimum
				}
				// min always refers to the min found so far
			}
			swap(array, outer, min);
			// all items with slot numbers less than or equal to outer are sorted
		}
	}

	public static void insertionSort(int[] array) {
		for (int outer = 1; outer < array.length; outer++) {
			// outer is the next element to be sorted

			int temp = array[outer]; // back it up
			int inner = outer; // inner used to track shifts
			while (inner > 0 && array[inner - 1] >= temp) {
				array[inner] = array[inner - 1];// swap
				inner--;
			} // shift them all right until one is smaller
			array[inner] = temp;
		}
	}
	
	public static void insertionSort1(int[] array) {
		for (int outer = 1; outer < array.length; outer++) {
			int temp = array[outer]; 
			for(int inner = outer; inner >0;inner--) {
				//if(inner==0)
				//	System.out.print("inner="+inner);
				if(array[inner-1]>temp)
					array[inner]=array[inner-1];
				else {
					array[inner]=temp;
					break;
				}
			}
		}
	}

	public static void swap(int[] array, int first, int second) {
		int temp = array[first];
		array[first] = array[second];
		array[second] = temp;
	}

}
