package com.ch07;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.Socket;

public class EchoThread extends Thread {
	BufferedReader in ;
	PrintWriter out ;
	public EchoThread(Socket ss) throws IOException{
		in = new BufferedReader(new 
				InputStreamReader(ss.getInputStream()));
		out = new PrintWriter(
				new OutputStreamWriter(ss.getOutputStream()));
	}
	public void run() {
		try {
			String str = in.readLine();
			System.out.println("EchoServer收到:"+str);
			str = "*"+str+"*";
			out.println(str);
			out.flush();
			out.close();
			in.close();
		} catch (IOException e) {
			System.out.println("發生傳輸例外");
		}
	}
}
