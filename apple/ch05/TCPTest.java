package com.ch05;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.net.UnknownHostException;

public class TCPTest {
	public static void main(String[] args) {
		try {
			Socket ptt = new Socket("ptt.cc",23);
			InputStream in = ptt.getInputStream();
			OutputStream out = ptt.getOutputStream();
			int data = 0;
			for (int i=0; i<10; i++){
				data = in.read();
				System.out.print(data + " ");
			}
			in.close();
			out.close();
			ptt.close();
		} catch (UnknownHostException e) {
			System.out.println("主機連線失敗");
		} catch (IOException e) {
			System.out.println("傳輸失敗");
		}
	}
}
