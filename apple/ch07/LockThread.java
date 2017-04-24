package com.ch07;

public class LockThread implements Runnable{
	String title = "normal";
	public void run(){
//		count();
		upgrade();
	}
	public synchronized void count(){
		for (int i=0; i<10; i++){
			System.out.println(i);
			try {
				Thread.sleep(500);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	public void upgrade(){
		synchronized (title) {
			System.out.println(getClass().getName()+"Wizard become super mode");
			title = "super";
			try {
				Thread.sleep(2000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			title = "normal";
			System.out.println("Wizard become normal");
		}
	}
	public static void main(String[] args) {
		LockThread r = new LockThread();
		Thread th1 = new Thread(r, "w1");
		th1.start();
		Thread th2 = new Thread(r, "w2");
		th2.start();
	}

}
