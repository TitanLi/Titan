package com.ch04;

import java.io.Console;

public class Console415 {
	public static void main(String[] args) {
		Console cs = System.console();
		System.out.println("請輸入帳號:");
		String id = cs.readLine();
		System.out.println("請輸入密碼:");
		String pw = new String(cs.readPassword());
		//顯示所輸入的資料
		System.out.println("帳號:"+id);
		System.out.println("密碼:"+pw);
	}
}
