package com.ch07;

public class Horse extends Thread{
	//覆寫Thread方法run()
	public void run(){
		//由1跑到5000
		int h = 0;
		for (int i=0; i<5000; i++){
			h++;
			System.out.println(getName()+":"+h);
		}
	}
}

