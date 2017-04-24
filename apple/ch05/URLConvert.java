package com.ch05;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

public class URLConvert {
	public static void main(String[] args) throws UnsupportedEncodingException {
		String host = "http://java.sun.com";
		String path = "/Hello world/index.html";
		String after = URLEncoder.encode(path, "UTF-8");
		System.out.println(after);
	}
}
