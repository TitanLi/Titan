package com.ch07;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class EchoServer {
	public static void main(String[] args) {
		try {
			ServerSocket server = new ServerSocket(3333);
			while (true) {
				System.out.println("接受連線中");
				Socket socket = server.accept();
				//交由後續設計的Echo處理執行緒
				EchoThread echo = new EchoThread(socket);
				echo.start();
			}
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println("伺服器窗口發生錯誤");
		}
	}
}
