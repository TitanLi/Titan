package com.ch07;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;

public class EchoClient0 {
	public static void main(String[] args) {
		try {
			Socket s = new Socket("localhost", 3333);
			BufferedReader in = new BufferedReader(new 
					InputStreamReader(s.getInputStream()));
			PrintWriter out = new PrintWriter(
					new OutputStreamWriter(s.getOutputStream()));
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
