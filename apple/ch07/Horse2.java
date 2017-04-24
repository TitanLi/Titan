package com.ch07;

public class Horse2 extends Thread {
	// 覆寫Thread方法run()
	public void run() {
		try {
			sleep(2000);
			System.out.println("到達終點");
		} catch (InterruptedException e) {
			System.out.println("被中斷了");
		}
	}
}
