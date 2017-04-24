package com.ch04;

import java.io.File;
import java.io.IOException;

public class SimpleFile49 {
  public static void main(String[] args)
      throws IOException {
    // 讀取已存在的data.txt檔
    File f = new File("data.txt");
    System.out.println("是否存在? " + f.exists());
    System.out.println("檔案的完整名稱(包括目錄)? "
        + f.getCanonicalPath());
    System.out.println("是否為一般檔案? " + f.isFile());
    System.out.println("檔案的大小 " + f.length());
    System.out.println("檔案名稱 " + f.getName());
  }
}
