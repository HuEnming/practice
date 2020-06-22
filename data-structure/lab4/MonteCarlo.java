package pers.enming.cs210.lab4;
import java.util.*;
import java.lang.Math;

public class MonteCarlo{
    private static double piece1, piece2, piece3;
    private static double nibble;
    private static int count = 0;
    
    public static void main(String args[]){
        Scanner sc = new Scanner(System.in);
        nibble = sc.nextDouble();
        nibble = nibble / 100.0;
        Random rand = new Random();
        //pieces();
        double num = 1;
        while(num <= 1000000){
            //double adjust = 1 - (nibble*rand.nextDouble());
            double adjust = 1 - nibble;
            
            pieces();
            triangle(adjust);
            num++;
        }
        //System.out.println("count: "+count +"   num: " + num);
        //System.out.println((count/(num-1))*100);
        System.out.println(Math.round((count/(num-1))*100));
    }
    
    public static void triangle(double adjust){
        if(piece3 + piece2 >= piece1){
            count++;
            //System.out.println("asdsadsadsadsa " + piece1);

        }else if(piece3 + piece2 >= piece1*(adjust)){
            count++;
            //System.out.println("asdsadsadsadsa " + piece1);

        }
    }
    
    public static void pieces(){
        Random rand = new Random();
        
        double x = 100*rand.nextDouble();
        double y = 100*rand.nextDouble();
        
        double num1 = Math.min(x, y);
        double num2 = Math.max(x, y) - Math.min(x, y);
        double num3 = 100 - Math.max(x, y);
        
        //double num1 = Math.random() * 100;
		// System.out.println(side1);
		//double num2 = Math.random() * (100 - num1);
		// System.out.println(side2);
		//double num3 = 100 - num1 - num2;

        piece1 = Math.max(num3, Math.max(num1, num2));
        piece2 = Math.min(num3, Math.min(num1, num2));
        piece3 = 100 - piece1 - piece2;
        
        /*
        
        
        double num1 = 9.999999*rand.nextDouble();
        double num2    = (9.999999-num1)*rand.nextDouble();
        double num3 = 10 - num1 - num2;
        
        System.out.println("piece1 " + piece1);
        System.out.println("piece2 " + piece2);
        System.out.println("piece3 " + piece3);
        
        
        piece1 = Math.abs(num1 - num2);
        piece2 = Math.min(num1, num2);
        piece3 = 1 - piece1 - piece2;
        */
    }
}