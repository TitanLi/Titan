package com.ch05;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

public class SimpleURL {
  public static void main(String[] args)
      throws IOException {
    URL url = new URL("http", "snpy.org",
        "/java/index.html");
    System.out.println("url的協定:" + 
        url.getProtocol());
    System.out.println("url的主機:" + url.getHost());
    System.out.println("url的埠號:" + url.getPort());
    System.out.println("url的目錄:" + url.getPath());
    System.out.println("url的檔案:" + url.getFile());
  }
}
