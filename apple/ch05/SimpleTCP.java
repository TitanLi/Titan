//package com.ch05;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.net.UnknownHostException;

public class SimpleTCP {
	public static void main(String[] args) {
		try {
			Socket ptt = new Socket("ptt.cc",23);
			InputStream in = ptt.getInputStream();
			OutputStream out = ptt.getOutputStream();
			System.out.println("建立成功!");
		} catch (UnknownHostException e) {
			System.out.println("主機連線失敗");
		} catch (IOException e) {
			System.out.println("傳輸失敗");
		}
	}
}
