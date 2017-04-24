package com.ch06;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

public class EchoServer {
  public void echo() {
    try {
      ServerSocket ss = new ServerSocket(8885);
      Socket socket = ss.accept();
      // 連線後,取得輸出入串流
      OutputStream rawOut = socket.getOutputStream();
      InputStream rawIn = socket.getInputStream();
      PrintWriter out = new PrintWriter(rawOut);
      BufferedReader in = new BufferedReader(
          new InputStreamReader(rawIn));
      // 等待客戶端送來字串
      String data = in.readLine();
      System.out.println("收到:" + data);
      // 將傳來的資料回送給客戶端
      out.println(data);
      out.flush();
      System.out.println("送出:" + data);
      // 關閉連線資源
      in.close();
      out.close();
      socket.close();
      ss.close();
    } catch (IOException e) {
      System.out.println("輸出入錯誤");
    }
  }

  public static void main(String[] args) {
    EchoServer eserver = new EchoServer();
    eserver.echo();
  }
}
