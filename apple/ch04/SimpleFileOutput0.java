package com.ch04;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintStream;

public class SimpleFileOutput0 {
  public static void main(String[] args)
      throws IOException {
    FileOutputStream out = 
      new FileOutputStream("data.txt");
    out.write(65);
    out.flush();
    out.close();
  }
}
