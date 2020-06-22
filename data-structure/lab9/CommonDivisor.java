package pers.enming.cs210.lab9;

public class CommonDivisor {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int x = 12564344;
		int y = 782649283;
		
		int result = x > y ? getMaxCommonDivisor(x, y) : getMaxCommonDivisor(y, x);
		System.out.println(result);
	}

	public static int getMaxCommonDivisor(int minNum, int modulusNum) {
		if (modulusNum == 0)
			return minNum;
		else
			return getMaxCommonDivisor(modulusNum, minNum % modulusNum);
	}

}
