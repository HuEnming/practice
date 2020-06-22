/*
 * package pers.enming.cs210.review;
 * 
 * public class LinkedListTest {
 * 
 * }
 * 
 * class LinkedList { private Link first;
 * 
 * public LinkedList() { first = null; }
 * 
 * public boolean isEmpty() { return (first == null); }
 * 
 * public void insertHead(int number) { Link newLink = new Link(number);
 * newLink.next = first; first = newLink; }
 * 
 * public Link deleteHead() { Link temp = first; first = first.next; return
 * temp; }
 * 
 * public Link delete(int key) { // delete link with given key Link current =
 * first; // search for link Link previous = first; // put these equal to first
 * Link while (current.data != key) { if (current.next == null) { return null;
 * // didn't find it } else { previous = current; // go to next link current =
 * current.next; } } // found it if (current == first) { // if first link, first
 * = first.next; // change first } else { // otherwise, previous.next =
 * current.next; // bypass it } return current; }
 * 
 * public void display() { Link current = first; // start with first link while
 * (current != null) { current.displayLink(); // print out the link current =
 * current.next; // keep going until you come to the end } }
 * 
 * }
 * 
 * class Link { public int data; public Link next;
 * 
 * public Link(int datain) // constructor { data = datain; // initialize data //
 * 'next' is automatically set to null }
 * 
 * public void displayLink() { System.out.println(data); } }
 */