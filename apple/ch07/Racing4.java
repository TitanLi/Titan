package com.ch07;

import java.util.Vector;

public class Racing4 {
	public static void main(String[] args) {
		Vector<RankHorse> rank = new Vector<RankHorse>();
		RankHorse h1 = new RankHorse(rank);
		RankHorse h2 = new RankHorse(rank);
		RankHorse h3 = new RankHorse(rank);
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
		System.out.println(rank);
		System.out.println("main執行緒結束");
	}
}
