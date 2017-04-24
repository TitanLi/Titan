package com.ch07;

import java.io.IOException;
import java.net.Socket;
import java.net.UnknownHostException;

public class CounterTester {
  public static void main(String[] args)
      throws UnknownHostException, IOException {
    for (int i = 0; i < 5; i++) {
      Socket socket = new Socket("localhost", 3335);
    }
  }
}
