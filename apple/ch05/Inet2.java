//package com.ch05;

import java.net.InetAddress;
import java.net.UnknownHostException;

public class Inet2 {
	public static void main(String[] args) throws UnknownHostException {
		byte[] b = { 61 , 64 , 12 ,1 };
		InetAddress addr = InetAddress.getByAddress(b);
		System.out.println(addr);
	}
}
