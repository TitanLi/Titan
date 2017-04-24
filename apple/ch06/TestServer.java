package com.ch06;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class TestServer {
  public static void main(String[] args)
      throws IOException {
    int port = 9970;
    // 準備接收訊息封包的socket與packet
    byte[] data = new byte[20];
    DatagramSocket rsocket = 
        new DatagramSocket(port);
    DatagramPacket rpacket = 
        new DatagramPacket(data, 20);
    // 使用迴圈while, 持續不斷傾聽外來封包
    while (true) {
      System.out.println("正等待查詢封包...");
      rsocket.receive(rpacket);
      // 檢查封包內容是否為"AYT"
      String rec = new String(data);
      if (rec.startsWith("AYT")) {
        // 由封包方法取得詢問端IP位址
        InetAddress client = rpacket.getAddress();
        System.out.println("收到詢問封包:" + rec);
        System.out.println("詢問封包來自:" + client);
        // 準備傳送封包
        String fine = "Everything is fine.";
        byte[] msg = fine.getBytes();
        DatagramPacket p = new DatagramPacket(msg,
            msg.length, client, 9971);
        rsocket.send(p);
        System.out.println("已送出回應封包");
      }
    }
  }
}