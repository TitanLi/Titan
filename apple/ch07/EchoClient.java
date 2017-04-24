package com.ch07;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;

public class EchoClient {
	public static void main(String[] args) {
		try {
			Socket s = new Socket("localhost", 3333);
			BufferedReader in = new BufferedReader(new 
					InputStreamReader(s.getInputStream()));
			PrintWriter out = new PrintWriter(
					new OutputStreamWriter(s.getOutputStream()));
			//送出"Hello"字串
			out.println("Hello");
			out.flush();
			System.out.println("已送出Hello");
			//停頓5秒,可依需求加長時間
			try {
				Thread.sleep(5000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			//讀取伺服器EchoServer送來的回音字串,並印出
			String rec = in.readLine();
			System.out.println("伺服器傳來:"+rec);
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
