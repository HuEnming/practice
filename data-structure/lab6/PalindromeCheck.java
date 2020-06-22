package pers.enming.cs210.lab6;

import java.util.Scanner;

public class PalindromeCheck {
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner scan = new Scanner(System.in);
		String words = scan.nextLine();
		Stack stack = new Stack(words.length());

		for (int i = 0; i < words.length() / 2; i++) {
			//int top = stack.push(Character.toString((words.charAt(i))));
		}
		int num = words.length() % 2;
		String newWords = "";
		for (int j = 0; j < words.length() / 2; j++) {
			newWords = newWords + stack.pop();
		}

		System.out.println(words.substring(words.length() / 2 + num).equals(newWords) ? "TRUE" : "FALSE");
	}

}

/*
 * class Stack { public String[] stringArray; public int top = -1;
 * 
 * Stack(int length) { stringArray = new String[length]; }
 * 
 * public String pop() { top -= 1; return stringArray[top + 1]; }
 * 
 * public int push(String charData) { top += 1; stringArray[top] = charData;
 * return top; }
 * 
 * public String peek() { return stringArray[top]; }
 * 
 * public boolean isEmpty() { return top == -1; } }
 */
