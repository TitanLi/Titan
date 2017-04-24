package com.ch04;

import java.io.FileNotFoundException;
import java.io.FileReader;

public class ExceptionHandling411 {
  // 為main定義throws例外
  public static void main(String[] args)
      throws FileNotFoundException {
    FileReader br = new FileReader("data.txt");
  }
}
