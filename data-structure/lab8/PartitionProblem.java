package pers.enming.cs210.lab8;

import java.util.Random;

public class PartitionProblem {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int[] bigNumbers = new int[] { 40, 1620243245, 676519318, 1448562316, 588259083, 1657685952, 1259248075,
				1249333865, 701357539, 1124032684, 1281294568, 1739829499, 1715575050, 243385769, 1476128934, 940227405,
				1231289694, 15703493, 1928184040, 95797696, 82246990, 1926085728, 976959161, 558700770, 132067144,
				1914761640, 508815619, 1181964935, 781134463, 224137457, 1582237767, 956184431, 1024094177, 527627984,
				979068468, 200891188, 889853575, 1916225661, 602585198, 2097149275, 1733564654 };

//		long[] bigNumbers = new long[] { 6974281826L, 9192342L, 162342532, 727893309836L, 1342472, 52342738283L, 23426837293L, 2342908, 23423738492L,
//				18234228372L, 63823424927L, 4728423, 61662353L, 937334526L, 524263, 467372342283L, 63738272342L, 74525234236L, 47382723423L, 46263812342L,
//				6323426, 63234273829L, 7474832L, 5252517534L, 3345377362L, 616528723L, 3345473L, 6234537, 6673452L, 4734523874L, 7680948237L,
//				234623483L, 7283729L, 6784534L, 52634511L, 83945345534L, 83457398L, 6726458L, 7283947365L, 62545345 };
		// -7281826-9192912-1627384-7309836+1726482-5738283+6837293+9087362-3738492-1828372-6384927+4728495-6262538+9373626-5242672+46737283+6373827-7452536-4738273+4626381-6363283+6373829-7474832+5252517-3377362+61628723+3475873-6237489-6673742+4723874-7648237-2346783-7283749+6782364+526351-83945534+8345798-6726648+7283947+6254526

		int[] operators = new int[bigNumbers.length];

		operators = runRandom(bigNumbers);
	}

	public static int[] runRandom(int[] bigNumbers) {
		int[] operators = new int[bigNumbers.length];
		long smallResult = 1000;
		for (int j = 0; j < 10000000; j++) {
			long sum = 0;
			for (int i = 0; i < bigNumbers.length; i++) {
				double d = Math.random();
				d = d * 10;
				int a = (int) Math.floor(d);
				int operator = 1;
				if (a % 2 == 0)
					operator = -1;
				operators[i] = operator;
				sum += operator * (long)bigNumbers[i];
			}
			if (Math.abs(sum) < smallResult) {
				smallResult = Math.abs(sum);
				System.out.println(smallResult);
				for (int k = 0; k < operators.length; k++) {
					if (sum >= 0) {
						System.out.print(operators[k] == 1 ? "+" : "-");
						System.out.print(bigNumbers[k]);
					} else {
						System.out.print(operators[k] == 1 ? "-" : "+");
						System.out.print(bigNumbers[k]);
					}
				}
				if (sum == 0)
					break;
				System.out.println();
			}
		}
		return operators;
	}

}
