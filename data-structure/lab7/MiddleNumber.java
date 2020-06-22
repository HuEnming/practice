package pers.enming.cs210.lab7;

import java.util.Scanner;

public class MiddleNumber {
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Queue queue = new Queue(100);
		Scanner scan = new Scanner(System.in);
		String words = "start";
		while (!words.isBlank()) {
			String[] data = words.split(" ");
			switch (data[0]) {
			case "INSERT":
				queue.add(data[1]);
				break;
			case "REMOVE":
				queue.get();
				break;
			default:
				break;
			}

			System.out.println("Front: " + queue.front);
			System.out.println("Rear: " + queue.rear);

			words = scan.nextLine();
		}
		// queue.rear--;
		scan.close();
//		int length = queue.rear - queue.front;
//		for (int i = 0; i < length; i++) {
//			System.out.println(queue.get());
//		}

		int num = (queue.rear - queue.front + 1) / 2 + queue.front;
		System.out.println(queue.stringArray[num]);
	}

}

class Queue {
	public String[] stringArray;
	public int front = -1;
	public int rear = -1;

	Queue(int length) {
		stringArray = new String[length];
	}

	public int add(String data) {
		int dataVn = 0;
		for (int i = 0; i < data.length(); i++) {
			if (data.charAt(i) == 'a' || data.charAt(i) == 'e' || data.charAt(i) == 'i' || data.charAt(i) == 'o'
					|| data.charAt(i) == 'u') {
				dataVn++;
			}
		}
		for (int j = front + 1; j <= rear; j++) {
			int oldStringVn = 0;
			for (int i = 0; i < stringArray[j].length(); i++) {
				if (stringArray[j].charAt(i) == 'a' || stringArray[j].charAt(i) == 'e' || stringArray[j].charAt(i) == 'i' || stringArray[j].charAt(i) == 'o'
						|| stringArray[j].charAt(i) == 'u') {
					oldStringVn++;
				}
			}
			if(dataVn>oldStringVn) {
				for(int k = rear; k > stringArray[j].length(); k++) {
			}
			
		}
		if (!isFull()) {
			rear += 1;
			stringArray[rear] = data;
			return rear;
		}
		return -1;}return 1;
	}

	public String get() {
		if (!isEmpty()) {
			front += 1;
			return stringArray[front];
		}
		return null;
	}

	public boolean isFull() {
		return (rear == stringArray.length - 1);
	}

	public boolean isEmpty() {
		return (front == rear);
	}

}
