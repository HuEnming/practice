package pers.enming.cs210.review;

public class DistanceToPrimeNumber {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println(getDistance(8));
	}
	
	public static int getDistance(int num) {
		int minPrimeNumber = num;
		int maxPrimeNumber = num;
		if(checkPrimeNumber(num))
			return 0;
		do {
			minPrimeNumber --;	
		}while(!checkPrimeNumber(minPrimeNumber));
		
		do {
			maxPrimeNumber ++;	
		}while(!checkPrimeNumber(maxPrimeNumber));

		int minDistance = num - minPrimeNumber;
		int maxDistance =maxPrimeNumber-num;
		if(minDistance>maxDistance)
			return maxDistance;
			else 
				return minDistance;
	}
	
	public static boolean checkPrimeNumber(int num) {
		for(int i =2;i<=Math.sqrt(num);i++) {
			if(num%i==0)
				return false;
		}
		return true;
	}

}
