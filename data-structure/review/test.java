package pers.enming.cs210.review;

public class test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String str = "12";
		System.out.println(str.substring(1, str.length() - 1));
		System.out.println(power(2,3));
		System.out.println('a'-1);
		System.out.println((((11&19)|5)));
		System.out.println((7)<<3);
		System.out.println((((4|17)|2))>>1);
		System.out.println('a'+""+"@");
	}

	public static int power(int k, int n) { // raise k to the power n
		if (n == 0)
			return 1;
		else {
			/*
			 * int t = power(k, n / 2); // if odd, will discard remainder if ((n % 2) == 0)
			 * return t * t; else return k * t * t; // extra multiplication to make up
			 */ }
		return k * power(k, n - 1);
	}

}
