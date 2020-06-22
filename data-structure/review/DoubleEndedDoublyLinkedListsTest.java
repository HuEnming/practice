/*
 * package pers.enming.cs210.review;
 * 
 * public class DoubleEndedDoublyLinkedListsTest {
 * 
 * public static void main(String[] args) { // TODO Auto-generated method stub
 * 
 * }
 * 
 * }
 * 
 * class DoubleEndedDoublyLinkedLists { public Link first; public Link last;
 * public void insertHead(long data) { // insert at head Link newLink = new
 * Link(data); // make new link if (isEmpty()) { // if empty list, last =
 * newLink; // newLink <-- last } else { first.previous = newLink; // newLink
 * <-- old first } newLink.next = first; // newLink --> old first first =
 * newLink; // first --> newLink }
 * 
 * public void insertOrdered(long data) { // inserts data in order Link current
 * = first; // start at beginning while (current != null && data > current.data)
 * { current = current.next; // move to next link } Link newLink = new
 * Link(data); // make new link if (current == first) { // if insertion at head
 * insertHead(data); } else if (current == last) { // if insertion at tail
 * insertTail(data); } else { // somewhere in middle newLink.previous =
 * current.previous; // step 1 current.previous.next = newLink; // step 2
 * newLink.next = current; // step 3 current.previous = newLink; // step 4 } }
 * 
 * public Link delete(long key) { // delete item with given key Link current =
 * first; // start at beginning while (current.data != key) { // until match is
 * found current = current.next; // move to next link } if (current == null) {
 * return null; // didn't find it } if (current == first) { // found it; first
 * item? first = current.next; // first --> old next } else { // not first //
 * old previous --> old next current.previous.next = current.next; } if (current
 * == last) { // last item? last = current.previous; // old previous <-- last }
 * else { // not last item // old previous <-- old next current.next.previous =
 * current.previous; } return current; // return value } }
 * 
 * class Link { public long data; public Link next; public Link previous; }
 * 
 * class ListIterator { private Link current; // current link private Link
 * previous; // previous link private LinkList ourList; // our linked list
 * 
 * public ListIterator(LinkList list) // constructor { ourList = list; reset();
 * }
 * 
 * public void reset() // start at 'first' { current = ourList.getFirst();
 * previous = null; }
 * 
 * public void nextLink() { previous = current; // set previous to this current
 * = current.next; // set this to next } }
 */