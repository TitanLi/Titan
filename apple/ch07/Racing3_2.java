package com.ch07;

public class Racing3_2 {
	public static void main(String[] args) {
		Horse h1 = new Horse();
		Horse h2 = new Horse();
		Horse h3 = new Horse();
		h1.setName("h1");
		h2.setName("h2");
		h3.setName("h3");
		h1.start();
		h2.start();
		h3.start();
		try {
			h1.join();
			h2.join();
			h3.join();
		} catch (InterruptedException e) {
			System.out.println("執行緒被中斷");
		}
		System.out.println("main執行緒結束");
	}
}
