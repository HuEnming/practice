package pers.enming.cs210.review;

import java.util.Arrays;

public class MergeSort {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int arr[] = { 8, 4, 5, 7, 1, 3, 6, 2 };
		int temp[] = new int[arr.length];
		// mergeSort(arr,0,arr.length-1,temp);
		mergeSort(arr, temp, 0, arr.length - 1);
		System.out.println("After sorting:" + Arrays.toString(arr));
	}

	public static void mergeSort(int[] arr, int left, int right, int[] temp) {
		if (left < right) {
			int mid = (left + right) / 2;
			mergeSort(arr, left, mid, temp);
			mergeSort(arr, mid + 1, right, temp);
			merge(arr, left, mid, right, temp);
		}
	}

	public static void merge(int[] arr, int left, int mid, int right, int[] temp) {
		int l = left;
		int r = mid + 1;
		int t = 0;
		while (l <= mid && r <= right) {
			if (arr[l] <= arr[r]) {
				temp[t] = arr[l];
				t++;
				l++;
			} else {
				temp[t] = arr[r];
				t++;
				r++;
			}
		}

		while (l <= mid) {
			temp[t] = arr[l];
			t++;
			l++;
		}

		while (r <= right) {
			temp[t] = arr[r];
			t++;
			r++;
		}

		t = 0;
		int tempLeft = left;
		while (tempLeft <= right) {
			arr[tempLeft] = temp[t];
			t++;
			tempLeft++;
		}

	}

	public static void mergeSort(int[] arr, int[] temp, int left, int right) {
		if (left == right)
			return;
		else {
			int middle = (left + right) / 2;
			mergeSort(arr, temp, left, middle);
			mergeSort(arr, temp, middle + 1, right);
			merge(arr, temp, left, right);
		}
	}

	public static void merge(int[] arr, int[] temp, int left, int right) {
		int middle = (left + right) / 2;
		int l = left;
		int r = middle + 1;
		int i = left;
		while (l <= middle && r <= right) {
			if (arr[l] > arr[r])
				temp[i++] = arr[r++];
			else
				temp[i++] = arr[l++];
		}

		while (l <= middle) {
			temp[i++] = arr[l++];
		}

		while (r <= right) {
			temp[i++] = arr[r++];
		}

		for (i = left; i <= right; i++) {
			arr[i] = temp[i];
		}

	}
}
