package pers.enming.cs210.lab5;

import java.util.Scanner;

public class StringsSorting {
	public static void main(String[] args) {
		Scanner scan = new Scanner(System.in);
		int num = scan.nextInt();
		//do {
		//	num = scan.nextInt();
		//} while (0 < num && num <= 100);
		int rank = scan.nextInt();

		int[] lengthArray = new int[num];
		String[] stringArray = new String[num];

		String inputString;
		Scanner scan1 = new Scanner(System.in);
		for (int i = 0; i < num; i++) {
			inputString = scan1.nextLine();
			int lengh = inputString.length();
		
			lengthArray[i] = lengh;
			stringArray[i] = inputString;
		}
		
		String outputString = sortString(rank, lengthArray, stringArray);
		System.out.println(outputString);

	}
	
	public static String sortString(int rank,int[] arr, String[] strArr) {
		for(int i = 0; i < arr.length - 1; i++) {
            int k = i;
            for(int j = k + 1; j < arr.length; j++){
                if(arr[j] > arr[k]){ 
                    k = j; 
                }
                if(arr[j] == arr[k] && strArr[j].compareTo(strArr[k])>0 ){ 
                    k = j; 
                }
            }
        
            if(i != k){  
                int temp = arr[i];
                arr[i] = arr[k];
                arr[k] = temp;
                
                String tempStr = strArr[i];
                strArr[i] = strArr[k];
                strArr[k] = tempStr;
            }    
        }
        
        return strArr[rank+1];
	}

	public static String bubbleSort(int rank, int[] lengthArray, String[] stringArray) {
		for (int i = 0; i < lengthArray.length - 1; i++) {
			for (int j = 0; j < lengthArray.length - 1 - i; j++) {
				if (lengthArray[j] > lengthArray[j + 1]) {
					int temp1 = lengthArray[j];
					lengthArray[j] = lengthArray[j + 1];
					lengthArray[j + 1] = temp1;

					String temp2 = stringArray[j];
					stringArray[j] = stringArray[j + 1];
					stringArray[j + 1] = temp2;
				}
				if (lengthArray[j] == lengthArray[j + 1] && stringArray[j].compareTo(stringArray[2]) > 0) {
					String temp2 = stringArray[j];
					stringArray[j] = stringArray[j + 1];
					stringArray[j + 1] = temp2;
				}
			}
		}
		return stringArray[rank];
	}

	public static String selectionSort(int rank, double[] lengthArray, String[] stringArray) {
		for (int i = 0; i < lengthArray.length; i++) {
			int index = i;
			for (int j = i; j < lengthArray.length; j++) {
				if (lengthArray[i] < lengthArray[i + 1]) {
					index = j;

				}
				if (lengthArray[i] == lengthArray[i + 1] && stringArray[i].compareTo(stringArray[2]) > 0) {
					index = j;
				}
				double temp1 = lengthArray[i];
				lengthArray[i] = lengthArray[index];
				lengthArray[index] = temp1;

				String temp2 = stringArray[i];
				stringArray[i] = stringArray[index];
				stringArray[index] = temp2;
			}
		}
		return stringArray[stringArray.length + 1 - rank];
	}
}
