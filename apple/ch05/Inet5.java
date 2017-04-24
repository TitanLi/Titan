package com.ch05;

import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;

public class Inet5 {
	public static void main(String[] args) throws SocketException {
		Enumeration<NetworkInterface> ifs = NetworkInterface.getNetworkInterfaces();
		while (ifs.hasMoreElements()){
			NetworkInterface ni = ifs.nextElement();
			System.out.println(ni.getName());
			System.out.println(" ¬O§_¥¿±Ò¥Î:"+ni.isUp());
		}
			
//		NetworkInterface eth = NetworkInterface.getByName("eth3");
//		System.out.println(eth.getName());
//		System.out.println(eth.getDisplayName());
	}
}
