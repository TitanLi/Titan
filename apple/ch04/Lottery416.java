package com.ch04;

import java.util.Scanner;

public class Lottery416 {
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		System.out.println("請輸入姓名:");
		String name = scanner.next();
		System.out.println("請輸入五個樂透數字(以空白為分隔):");
		int[] num = new int[5];
		for (int i=0; i<num.length; i++){
			num[i] = scanner.nextInt();
			System.out.println("你選了..."+num[i]);
		}
	}
}
