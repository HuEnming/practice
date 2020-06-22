package pers.enming.cs210.lab2;

public class BlockStackingProblem {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		double radiu = 12.6;// 25.3;// 7.8;
		double thickness = 1.5;// 1.08;// 0.65;
		double TargetLeaningDistance = 18.4;// 143;// 8.3;
		System.out.println(GetTowerHeigh(radiu, thickness, TargetLeaningDistance));

	}

	public static double GetTowerHeigh(double radiu, double thinkness, double TargetLeaningDistance) {
		double actualLeaningDistance = 0.0;
		// double edge = radiu / 2;
		int layer = 0;
		while (TargetLeaningDistance > actualLeaningDistance) {
			// actualLeaningDistance = 0.0;
			// layer ++;
			// for (int i = 0; i < layer; i ++) {
			// actualLeaningDistance += radiu / i / 2;
			// }
			layer++;
			actualLeaningDistance += radiu / layer;

		}
		return Math.round(thinkness * layer);
	}

}
