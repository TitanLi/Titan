package com.ch04;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

public class SimpleFile47 {
  public static void main(String[] args)
      throws IOException {
    FileInputStream fis = new FileInputStream(
        "data.txt");
    InputStreamReader isr = 
        new InputStreamReader(fis);
    BufferedReader in = new BufferedReader(isr);
    String line = in.readLine();
    while (line != null) {
      System.out.println(line);
      line = in.readLine();
    }
  }
}
