package pers.enming.cs210.lab11;

public class CircularPrime {
	public static void main(String[] args) {
		int counter = 0;
		for (int i = 2; i < 10000000; i++) {
			if(checkCircular(i))
				counter ++;
		}
		System.out.println(counter);
		int N = 1193;
		if (checkCircular(N))
			System.out.println("Yes");
		else
			System.out.println("No");
	}

	// Function to check if a number is prime or not.
	static boolean isPrime(int n) {
		// Corner cases
		if (n <= 1)
			return false;
		if (n <= 3)
			return true;

		// This is checked so that we can skip
		// middle five numbers in below loop
		if (n % 2 == 0 || n % 3 == 0)
			return false;

		for (int i = 5; i * i <= n; i = i + 6)
			if (n % i == 0 || n % (i + 2) == 0)
				return false;

		return true;
	}

	static boolean checkCircular(int N) {
		int length = Integer.toString(N).length();
		int temp1 = N;
		for (int i = 0; i < length; i++) {
			temp1 = (temp1 % 10) * (int) (Math.pow(10.0, ((length - 1) * 1.0))) + temp1 / 10;
			// System.out.println(temp1);
			if (!isPrime(temp1)) {
				return false;
			}
		}
		return true;
	}

}
