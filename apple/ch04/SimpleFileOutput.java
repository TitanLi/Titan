//package com.ch04;

import java.io.IOException;
import java.io.PrintStream;

public class SimpleFileOutput {
  public static void main(String[] args)
      throws IOException {
    PrintStream out = new PrintStream("data.txt");
    out.write(65);
    out.print("XYZ");
    out.flush();
    out.close();
  }
}
