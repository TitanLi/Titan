package com.ch06;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

public class CounterServer {
  public static int count = 0;

  public void startCount() {
    while (true) {
      try {
        ServerSocket ss = new ServerSocket(8884);
        Socket socket = ss.accept();
        count++;
        System.out.println("第" + count + 
            "個客戶連線成功");
        OutputStream rawOut = 
          socket.getOutputStream();
        PrintWriter out = new PrintWriter(rawOut);
        out.println("您是第" + count + "個客戶端");
        out.flush();
        out.close();
        socket.close();
        ss.close();
      } catch (IOException e) {
        System.out.println("輸出入錯誤");
      }
    }
  }

  public static void main(String[] args) {
    CounterServer cserver = new CounterServer();
    cserver.startCount();
  }
}
