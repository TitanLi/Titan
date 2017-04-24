package com.ch06;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class SampleServer613 {
	public static void main(String[] args) throws IOException {
		ServerSocket ss = new ServerSocket(8888);
		Socket socket = ss.accept();
		//連線後,取得輸出入串流
		OutputStream rawOut = socket.getOutputStream();
		InputStream rawIn = socket.getInputStream();
		PrintWriter out = new PrintWriter(rawOut);
		BufferedReader in = new BufferedReader(new InputStreamReader(rawIn));
	}
}
