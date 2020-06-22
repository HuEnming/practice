package pers.enming.cs210.review;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class EratosthenesSieve {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		// int range = 10000000;
		int number = primeCounter(10000000);
		System.out.println(number);
		System.out.println(findPrime2(10000000));
	}

	public static int primeCounter(int range) {
		int counter = 0;
		boolean[] numArray = new boolean[range];
		for (int i = 2; i < numArray.length; i++) {
			numArray[i] = true;
		}
		for (int i = 2; i < numArray.length; i++) {
			if (numArray[i]) {
				counter++;
				//System.out.println(i);
				for (int j = i; j < numArray.length / i + 1; j++) {
					if (i * j < numArray.length) {
						numArray[i * j] = false;
					}
				}
			}
		}
		return counter;
	}

	public static int findPrime2(int n) {
		List<Integer> primes = new ArrayList<Integer>();
		primes.add(2);
		for(int i = 3; i <= n; i++) {
			int tmp = (int)Math.sqrt(i) + 1;
			for(int j = 2; j <= tmp; j++) {
				if(i % j == 0)	break;
				if(j == tmp)	primes.add(i);
			}
		}
		return primes.size();
	}

}
