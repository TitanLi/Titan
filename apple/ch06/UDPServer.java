package com.ch06;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;

public class UDPServer {
  public static void main(String[] args)
      throws IOException {
    byte[] buffer = new byte[10];
    DatagramPacket pkt =
      new DatagramPacket(buffer, 10);
    DatagramSocket ds = new DatagramSocket(9950);
    System.out.println("正在等待埠號:" + 
        ds.getLocalPort());
    ds.receive(pkt);
    System.out.println("已收到UDP封包,封包內容:"
        + ds.getLocalPort());
    for (int i = 0; i < buffer.length; i++)
      System.out.print(buffer[i]);
  }
}
