package com.ch07;

public class Wizard_tmp extends Thread {
	public void run() {
		thunder();
	}
	
	public synchronized void thunder(){
		System.out.println("THUNDER!!");
		try {
			sleep(2000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		System.out.println("END");
	}
	
	public static void main(String[] args) {
//		Wizard wizard = new Wizard();
//		Thread thr1 = new Thread(wizard);
//		thr1.start();
//		Thread thr2 = new Thread(wizard);
//		thr2.start();
		Wizard_tmp wizard1 = new Wizard_tmp();
		Wizard_tmp wizard2 = new Wizard_tmp();
		wizard1.start();
		wizard2.start();
	}
}
