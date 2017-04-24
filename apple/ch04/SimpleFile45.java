package com.ch04;

import java.io.FileNotFoundException;
import java.io.PrintWriter;

public class SimpleFile45 {
  public static void main(String[] args)
      throws FileNotFoundException {
    PrintWriter out = new PrintWriter("data.txt");
    out.println("測試資料第一行");
    out.println("測試資料第二行");
    out.println("測試資料第三行");
    out.println("測試資料第四行");
    out.println("測試資料第五行");
    out.flush();
    out.close();
  }
}
