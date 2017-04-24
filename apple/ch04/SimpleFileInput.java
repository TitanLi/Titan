package com.ch04;

import java.io.FileInputStream;
import java.io.IOException;

public class SimpleFileInput {
  public static void main(String[] args)
      throws IOException {
    FileInputStream in = new FileInputStream(
        "data.txt");
    int n = in.read();
    System.out.println(n);
  }
}
