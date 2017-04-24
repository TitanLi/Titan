package com.ch07;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class FileThread extends Thread{
	File file = new File("mc.txt");
	String s = null;
	public FileThread(String s){
		this.s = s;
	}
	public void run(){
//		write();
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
	public synchronized void write(){
		System.out.println(getName()+" writing");
		try {
			PrintWriter out = new PrintWriter(new FileWriter(file, true));
			out.println(s);
			out.println(s);
			out.println(s);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println(getName()+" end");
	}
	
	public static void main(String[] args) {
		FileThread thrA = new FileThread("a");
		FileThread thrB = new FileThread("b");
		FileThread thrC = new FileThread("c");
		Thread thr1 = new Thread(thrA);
		thr1.start();
		Thread thr2 = new Thread(thrB);
		thr2.start();
		Thread thr3 = new Thread(thrC);
		thr3.start();
	}
}
