package com.ch07;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class CounterServer {
  String fileName = "counter.txt";

  public void listen() {
    File file = new File(fileName);
    checkFile(file);
    try {
      ServerSocket server = new ServerSocket(3335);
      while (true) {
        System.out.println("接受連線中");
        Socket socket = server.accept();
        // 交由後續設計的AddThread處理執行緒
        AddThread add = new AddThread(file);
        add.start();
      }
    } catch (IOException e) {
      e.printStackTrace();
      System.out.println("伺服器輸出入發生錯誤");
    }
  }

  public void checkFile(File file) {
    if (!file.exists()) {
      try {
        FileWriter out = new FileWriter(file, false);
        out.write("0\n");
        out.close();
      } catch (FileNotFoundException e) {
        e.printStackTrace();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }

  class AddThread extends Thread {
    File file;

    public AddThread(File file) {
      this.file = file;
    }

    public void run() {
      synchronized (file) {
        System.out.println(getName() + "存取檔案中");
        BufferedReader in = null;
        FileWriter out = null;
        try {
          in = new BufferedReader(
              new FileReader(file));
          int n = Integer.parseInt(in.readLine());
          in.close();
          n++;
          out = new FileWriter(file, false);
          out.write(String.valueOf(n) + "\n");
          out.flush();
          out.close();
        } catch (FileNotFoundException e) {
          e.printStackTrace();
        } catch (IOException e) {
          e.printStackTrace();
        }
        System.out.println(getName() + "結束存取");
      }
    }
  }

  public static void main(String[] args) {
    CounterServer counter = new CounterServer();
    counter.listen();
  }
}
