package com.ch06;

import java.io.IOException;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;

public class Tester {
	public static void main(String[] args) throws IOException {
//		ServerSocket ss = new ServerSocket(80,5, InetAddress.getByName("192.168.1.10"));
//		ServerSocket ss = new ServerSocket(8888,5, InetAddress.getByName("192.168.1.10"));
		ServerSocket ss = new ServerSocket(8888);
		System.out.println("開始傾聽...");
		Socket socket = ss.accept();
		System.out.println("已有客戶端連線...");
		
//		System.out.println("綁定IP:"+ss.getInetAddress().getHostAddress());
//		System.out.println("占用port:"+ss.getLocalPort());
		
	}
}
