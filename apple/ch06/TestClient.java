package com.ch06;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class TestClient {
  public static void main(String[] args)
      throws IOException {
    int port = 9971;
    InetAddress server = 
      InetAddress.getByName("192.168.1.10");
    // 準備接收訊息封包的socket與packet
    byte[] data = new byte[20];
    byte[] msg = "AYT".getBytes();
    DatagramSocket rsocket = 
      new DatagramSocket(port);
    DatagramPacket rpacket = 
      new DatagramPacket(data, 20);
    // 準備傳送封包
    DatagramPacket p = new DatagramPacket(msg,
        msg.length, server, 9970);
    rsocket.send(p);
    System.out.println("已送出查詢封包");
    // 準備接收Server傳來的封包
    rsocket.receive(rpacket);
    System.out.println("收到伺服器的回應封包:"
        + new String(data));
  }
}
