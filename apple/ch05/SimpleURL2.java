package com.ch05;

import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

public class SimpleURL2 {
  public static void main(String[] args)
      throws IOException {
    URL url = new URL("http", "j.snpy.org",
        "/net/index.html");
    URLConnection conn = url.openConnection();
    conn.connect();
    String type = conn.getContentType();
    System.out.println("內文格式：" + type);
    String encoding = type.substring(type
        .lastIndexOf("=") + 1);
    System.out.println("內文編碼：" + encoding);
    // 將輸入資料流轉為Reader, 並指定來源編碼格式
    InputStreamReader in = new InputStreamReader(
        conn.getInputStream(), encoding);
    int data = in.read();
    while (data != -1) {
      System.out.print((char) data);
      data = in.read();
    }
    in.close();
  }
}
