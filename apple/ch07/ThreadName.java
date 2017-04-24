package com.ch07;

public class ThreadName {
	public static void main(String[] args) {
		Thread thr = Thread.currentThread();
		System.out.println("目前執行緒名稱:"+thr.getName());
		thr.setName("DEMO");
		System.out.println("更改後的名稱:"+thr.getName());
	}
}

