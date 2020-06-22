package pers.enming.cs210.lab1;

public class LuhnAlgorithm {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String[] cardNumberArray = {"6227007200120897790","5522458056248182","9558888958767506","5264103626364048","6223220194409076"};
		
		for (int i = 0; i < cardNumberArray.length; i++) {
	         System.out.println(review1(cardNumberArray[i]));
	      }
		
		//System.out.println(checkLuhn(cardNumber));

	}

	public static boolean checkLuhn(String number) {

		int sum = 0;
		for (int i = number.length(), j = 0; i > 0; i--, j = 1 - j) {
			if (j % 2 == 0)
				sum += Integer.parseInt(number.substring((i - 1), i));
			else {
				int evenNumbered = Integer.parseInt(number.substring((i - 1), i)) * 2;
				sum += (evenNumbered > 9 ? evenNumbered - 9 : evenNumbered);
			}
		}
		if (sum % 10 == 0)
			return true;
		else
			return false;
	}
	
	public static boolean review(String num) {
		int i = 1;
		int sum = 0;
		do {
			if(i%2==0) {
				int temp = Integer.parseInt(num.substring(num.length()-i,num.length()-i+1))*2;
				temp = temp>9?temp-9:temp;
				sum+=temp;
			}else {
				sum+=Integer.parseInt(num.substring(num.length()-i,num.length()-i+1));
			}
			i++;
		}while(num.length()-i>=0);
			if(sum%10==0)
				return true;
			else
				return false;
	}
	
	public static boolean review1(String num) {
		int sum=0;
		for(int i=1;i<=num.length();i++) {
			int numi = Integer.parseInt(Character.toString(num.charAt(num.length()-i)));
			if(i%2!=0) {
				sum+=numi;
			}else {
				sum+=(numi*2>9?numi*2-9:numi*2);
			}
		}
		//System.out.println(num.substring(num.length()-1,num.length()));
		if(sum%10==0)
			return true;
		else
			return false;
	}
}
