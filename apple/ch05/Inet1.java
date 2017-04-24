//package com.ch05;

import java.net.InetAddress;
import java.net.UnknownHostException;

public class Inet1 {
	public static void main(String[] args) throws UnknownHostException {
		InetAddress addr = InetAddress.getByName("csie.nutc.edu.tw");
		System.out.println(addr);
		InetAddress local = InetAddress.getLocalHost();
		System.out.println(local);
	}
}
