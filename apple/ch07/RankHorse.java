package com.ch07;
import java.util.Vector;

public class RankHorse extends Thread {
	Vector<RankHorse> rank ;
	
	public RankHorse(Vector<RankHorse> rank){
		this.rank = rank;
	}
	
	//覆寫Thread方法run()
	public void run(){
		try {
			sleep(2000);
			System.out.println(getName()+"到達終點");
			//放進rank集合中
			rank.add(this);
		} catch (InterruptedException e) {
			System.out.println(getName()+"被中斷了");
		}
	}
}
