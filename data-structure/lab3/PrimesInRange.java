package pers.enming.cs210.lab3;

import java.util.Scanner;

public class PrimesInRange {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner scan = new Scanner(System.in);
		int boundary1 = scan.nextInt();
		int boundary2 = scan.nextInt();
		if (boundary1 > boundary2)
			boundary2 = boundary1 + (boundary1 = boundary2) * 0;
		int primes = getPrimeQuantityInRange(boundary1, boundary2);
		//int primes = sieveOfEratosthenes3(boundary1, boundary2);
		System.out.println(primes);
	}
	//miller rabin  18251848
	
	public static int sieveOfEratosthenes2(int boundary1, int boundary2) {
		boolean[][] sieve = new boolean[2][boundary2];
		// 7,19,5 0,10,4 10,20,4
		// sieve[3] = true;
		int counter = 0;

//		for (int i = 3; i <= boundary2; i += 2) {
//			sieve[i][] = true;
//		}
//		for (int i = 0; i <= boundary2/2; i ++) {
//			
//		}
//
//		for (int i = 3; i <= boundary2; i += 2) {
//			if (sieve[i]) {
//				// counter++;
//				if (i >= boundary1)
//					counter++;
//				for (int j = 2; j < boundary2 / i + 1; j++) {
//					if (i * j <= boundary2)
//						sieve[i * j] = false;
//				}
//			}
//		}
		return boundary1 > 3 ? counter : counter + 1;
	}

	public static int getPrimeQuantityInRange(int boundary1, int boundary2) {
		int counter = 0;
		for (int i = boundary1; i <= boundary2; i++) {
			if (i == 0 || i == 1) {
				counter++;
				continue;
			}
			for (int j = 2; j <= i / 2; j++) {
				if (i % j == 0) {
					counter++;
					break;
				}
			}
		}
		return boundary2 - boundary1 + 1 - counter;
	}
	
	public static int sieveOfEratosthenes3(int boundary1, int boundary2) {
		int x = boundary2>50000000?boundary2/3:boundary2/2;
		int[] sieve = new int[x];	
		int counter = 0;

		for (int i = 0,j=3; i < sieve.length; i ++,j+=2) {
			sieve[i] = j;
		} 
		
		for (int i = 0; i < sieve.length; i ++) {
			if( sieve[i]>0) {
				if (sieve[i] >= boundary1 && sieve[i] <= boundary2)
					counter++;
				for (int j = 2; j < boundary2 / sieve[i] + 1; j++) {
					if (sieve[i] * j <= boundary2)
						for(int k = 0; k <sieve.length; k++) {
							if (sieve[k]==sieve[i] * j)
								sieve[k]=0;
						}
				}
			}
		} 

		return boundary1 > 3 ? counter : counter + 1;
	}

	public static int sieveOfEratosthenes(int boundary1, int boundary2) {
		boolean[] sieve = new boolean[boundary2 + 1];
		// 7,19,5 0,10,4 10,20,4
		// sieve[3] = true;
		int counter = 0;

		for (int i = 3; i <= boundary2; i += 2) {
			sieve[i] = true;
		}

		for (int i = 3; i <= boundary2; i += 2) {
			if (sieve[i]) {
				// counter++;
				if (i >= boundary1)
					counter++;
				for (int j = 2; j < boundary2 / i + 1; j++) {
					if (i * j <= boundary2)
						sieve[i * j] = false;
				}
			}
		}

		return boundary1 > 3 ? counter : counter + 1;
	}
	
	public static int sieveOfEratosthenes1(int boundary1, int boundary2) {
		boolean[] sieve = new boolean[boundary2 + 1];
		int[] basePrimes = new int[] { 2, 3, 5, 7, 11 };
		sieve[0] = sieve[1] = true;

		for (int i = 2; i < boundary2 / 2 + 1; i++) {
			for (int j = 0; j < basePrimes.length; j++) {
				if (i * basePrimes[j] <= boundary2)
					sieve[i * basePrimes[j]] = true;
			}
		}

		int counter = 0;
		for (int i = boundary1; i <= boundary2; i++) {
			if (sieve[i] == true)
				counter++;
		}
		return boundary2 - boundary1 + 1 - counter;
	}
}
