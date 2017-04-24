package com.ch04;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class SimpleFile46 {
  public static void main(String[] args)
      throws IOException {
    FileReader br = new FileReader("data.txt");
    BufferedReader in = new BufferedReader(br);
    String line = in.readLine();
    while (line != null) {
      System.out.println(line);
      line = in.readLine();
    }
  }
}
