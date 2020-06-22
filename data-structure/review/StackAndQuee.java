/*
 * package pers.enming.cs210.review;
 * 
 * public class StackAndQuee {
 * 
 * public static void main(String[] args) { // TODO Auto-generated method stub
 * // Stack theStack = new Stack(10); // make new stack // theStack.push(20); //
 * push items onto stack // theStack.push(40); // theStack.push(60); //
 * theStack.push(80); // while (!theStack.isEmpty()) { //
 * System.out.println(theStack.pop()); // } // Queue theQueue = new Queue(50);
 * theQueue.insert(5); theQueue.insert(3); theQueue.remove();
 * theQueue.insert(7); theQueue.remove(); theQueue.peekFront();
 * theQueue.remove(); theQueue.remove(); theQueue.isEmpty(); theQueue.insert(9);
 * theQueue.insert(7); //theQueue.size(); theQueue.insert(3);
 * theQueue.insert(5); theQueue.remove(); while (!theQueue.isEmpty()) {
 * System.out.println(theQueue.remove()); }
 * 
 * // PriorityQueue thePQ = new PriorityQueue(10); // make new priority queue //
 * thePQ.insert(60); // slot items into queue // thePQ.insert(20); //
 * thePQ.insert(80); // thePQ.insert(40); // while (!thePQ.isEmpty()) { //
 * System.out.println(thePQ.remove()); // }
 * 
 * }
 * 
 * }
 * 
 * class Stack { private int maxSize; // size of stack array private long[]
 * stackArray; private int top; // top of stack
 * 
 * public Stack(int s) { // constructor maxSize = s; // set array size
 * stackArray = new long[maxSize]; // create array top = -1; // no items yet }
 * 
 * public void push(long j) { // put item on top of stack top++; stackArray[top]
 * = j; // increment top, insert item }
 * 
 * public long pop() { // take item from top of stack return stackArray[top--];
 * // access item, decrement top }
 * 
 * public long peek() { // peek at top of stack return stackArray[top]; }
 * 
 * public boolean isEmpty() { // true if stack is empty return (top == -1); }
 * 
 * public boolean isFull() { // true if stack is full return (top == maxSize -
 * 1); }
 * 
 * public void makeEmpty() { // empty stack top = -1; } }
 * 
 * class Queue { private int maxSize; private long[] queArray; private int
 * front; private int rear; private int nItems;
 * 
 * public Queue(int s) { // constructor maxSize = s; queArray = new
 * long[maxSize]; front = 0; rear = -1; nItems = 0; }
 * 
 * public boolean insert(long j) { // put item at rear of queue if (isFull())
 * return false; // don¡¯t remove if full if (rear == maxSize - 1) // deal with
 * wraparound rear = -1; rear++; queArray[rear] = j; // increment rear and
 * insert nItems++; // one more item return true; // successfully inserted }
 * 
 * public long remove() { // take item from front of queue if (isEmpty()) return
 * -1;// don¡¯t remove if empty long temp = queArray[front];// get value and incr
 * front front++; if (front == maxSize) // deal with wraparound front = 0;
 * nItems--; // one less item return temp; }
 * 
 * public long peekFront() { // peek at front of queue return queArray[front]; }
 * 
 * public boolean isEmpty() { // true if queue is empty return (nItems == 0); }
 * 
 * public boolean isFull() { // true if queue is full return (nItems ==
 * maxSize); }
 * 
 * public int size() { // number of items in queue return nItems; } }
 * 
 * class PriorityQueue { private int maxSize; private long[] queArray; private
 * int front; private int rear; private int nItems;
 * 
 * public PriorityQueue(int s) { // constructor maxSize = s; queArray = new
 * long[maxSize]; front = 0; rear = -1; nItems = 0; }
 * 
 * public void insert(long item) { // insert item
 * 
 * if (nItems == 0) { // if no items, queArray[0] = item; // insert at 0 } else
 * { // if some items, int j = nItems; // start at end
 * 
 * while (j > 0 && queArray[j - 1] > item) { // while new item larger
 * queArray[j] = queArray[j - 1]; // shift upward j--; // decrement j }
 * queArray[j] = item; // insert it } nItems++; // increase items }
 * 
 * public long remove() { long temp = queArray[0]; int i = 0; while (i < nItems)
 * { queArray[i] = queArray[i + 1]; i++; } nItems--; return temp; }
 * 
 * public boolean isEmpty() { return nItems == 0; }
 * 
 * }
 */