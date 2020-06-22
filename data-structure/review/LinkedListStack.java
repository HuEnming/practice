package pers.enming.cs210.review;

public class LinkedListStack {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}

class Stack {
	private LinkedList list;

	public Stack() { // constructor
		list = new LinkedList();
	}

	public void push(char data) { // put item on top of stack
		list.insertHead(data);
	}

	public char pop() { // take item from top of stack
		return list.removeHead().data;
	}
}

class LinkedList {
	private Link first; // ref to first link

	public LinkedList() { // constructor
		first = null; // no links on list yet
	}

	public boolean isEmpty() { // true if list is empty
		return (first == null);
	}

	public void insertHead(char data) { // make new link
		Link newLink = new Link(data);
		newLink.next = first; // newLink --> old first
		first = newLink; // first --> newLink
	}

	public Link removeHead() { // delete first item
// (assumes list not empty)
		Link temp = first; // save reference to link
		first = first.next; // delete it: first-->old next
		return temp; // return deleted link
	}
}

class Link {
	public char data; // data item
	public Link next; // next link in list

	public Link(char data) { // constructor
		this.data = data; // initialize data
	}
}
