package com.ch07;

public class HorseRunnable implements Runnable {
	public void run() {
		int h = 0;
		for (int i=0; i<5000; i++){
			h++;
			System.out.println(h);
		}
	}
}
