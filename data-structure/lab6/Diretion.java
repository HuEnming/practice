package pers.enming.cs210.lab6;

import java.util.Scanner;

public class Diretion {
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Stack stack = new Stack(100);
		Scanner scan = new Scanner(System.in);
		String words = "";
		while (!words.equals("Arrived")) {
			words = scan.nextLine();
			if (words.equals("Go Back")) {
				stack.pop();
			} else {
				stack.push(words);
			}
		}
		stack.pop();
		int num = stack.top + 1;
		for (int i = 0; i < num; i++) {
			String direction = ""; 
			switch(stack.pop()) {
			  case "Go North":
				  direction="Go South";
			    break;
			  case "Go South":
				  direction="Go North";
			    break;
			  case "Go West":
				  direction="Go East";
				    break;
			  case "Go East":
				  direction="Go West";
				    break;
			  default:
				  direction="";
			}
			System.out.println(direction);
		}
	}

}

class Stack {
	public String[] stringArray;
	public int top = -1;

	Stack(int length) {
		stringArray = new String[length];
	}

	public String pop() {
		top -= 1;
		return stringArray[top + 1];
	}

	public int push(String charData) {
		top += 1;
		stringArray[top] = charData;
		return top;
	}

	public String peek() {
		return stringArray[top];
	}

	public boolean isEmpty() {
		return top == -1;
	}
}
