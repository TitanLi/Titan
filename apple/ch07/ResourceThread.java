package com.ch07;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.channels.FileChannel;
import java.nio.channels.FileLock;

public class ResourceThread extends Thread {
	File f;

	public ResourceThread(File f) {
		this.f = f;
	}

	public void run() {
		try {
			sendFile(f);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static synchronized void sendFile(File f) throws IOException,
			InterruptedException {
		BufferedReader in = new BufferedReader(new FileReader(f));
		String s = in.readLine();
		while (s != null) {
			System.out.println(s);
			sleep(500);
			s = in.readLine();
		}
	}

	public static void main(String[] args) throws IOException {
		ResourceThread th = new ResourceThread(new File("C:\\net\\file2.txt"));
		th.start();
		ResourceThread th2 = new ResourceThread(new File("C:\\net\\file3.txt"));
		th2.start();
	}
}
